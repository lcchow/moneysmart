import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrackerService } from '../services/tracker.service';
import { AuthenticationService } from '../services/authentication.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  form: FormGroup
  categories: any[];
  username:any

  constructor(private router:Router, private ts:TrackerService) {
    this.categories = this.ts.getCategories()

    let formControls = {
      date: new FormControl("",Validators.required),
      type: new FormControl("",Validators.required),
      category: new FormControl("Food",Validators.required),
      description: new FormControl("",Validators.required),
      amount: new FormControl("",Validators.required)
    }

    this.form = new FormGroup(formControls)
  }

  ngOnInit() {
    const auth = getAuth()
    onAuthStateChanged(auth,(user) => {
      if (user) {
        this.username = user
        console.log(this.username)
      } else {
        console.log("Init Not Logged In")
      }
    })
  }

  onCancel() {
    this.router.navigate(["/home"])
  }

  onAdd(values:any) {
    if(this.username) {
      console.log("add",this.username.email)
      this.ts.addTransaction(this.username.email,values.date,values.type,values.category,values.description,values.amount)
        .subscribe({
          next: () => {
            this.router.navigate(['/home']) 
          },
          error: (error) => {
            alert("Failed to add transaction")
            console.error(error)
          }
        });
    } else {
      console.log("Not logged in")
    }
    
  }

  // onAdd(values:any) {
  //   if(this.username) {
  //     console.log("add",this.username.email)
  //     this.ts.addTransaction(this.username.email,values.date,values.type,values.category,values.description,values.amount)
  //     this.router.navigate(['/home'])
  //   } else {
  //     console.log("Not logged in")
  //   }
    
  // }
  
}
