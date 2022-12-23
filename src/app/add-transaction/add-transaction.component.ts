import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TrackerService } from '../services/tracker.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent {
  form: FormGroup
  categories: any[];


  constructor(private router:Router, private ts:TrackerService) {
    this.categories = this.ts.getCategories()

    let formControls = {
      date: new FormControl(""),
      type: new FormControl(""),
      category: new FormControl("Food"),
      description: new FormControl(""),
      amount: new FormControl("")
    }

    this.form = new FormGroup(formControls)
  }

  onCancel() {
    this.router.navigate(["/"])
  }

  onAdd() {

  }
  
}
