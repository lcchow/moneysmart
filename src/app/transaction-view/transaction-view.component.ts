import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TrackerService } from '../services/tracker.service';
import { AuthenticationService } from '../services/authentication.service';
import { getAuth, onAuthStateChanged, user } from '@angular/fire/auth';


@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent implements OnInit {
  //transactionList: any[] | null
  transactionList: any[]
  username: any
  //user$ = this.authService.currentUser$
  user= this.authService.currentUser
  auth = getAuth()

  constructor(private ts:TrackerService, private router:Router, 
    private authService:AuthenticationService, private route:ActivatedRoute) {
    this.transactionList = [];
  }

  ngOnInit() {
    
    
    onAuthStateChanged(this.auth,async (user) => {
      if (user) {
        this.username = user
        console.log("tview",this.username);

      } else {
        console.log("Tview Not Logged In")
      }
    })

    this.transactionList = this.ts.getTransactionList();
    console.log(this.route.snapshot.data);
    console.log("VIEW", this.transactionList)


    // await this.ts.getTransactions(this.username.email);
    // console.log(this.transactionList)
  }

  onAdd() {
    this.router.navigate(["/add"])
  }

  async test() {
    //console.log(this.username.email)
    //console.log(await this.ts.getTransactions(this.username.email))
    //console.log("LIST:",this.ts.getTransactionList())
  }

  onLogout() {
    this.transactionList=[]
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
  

}
