import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrackerService } from '../services/tracker.service';
import { AuthenticationService } from '../services/authentication.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent implements OnInit {
  txnList: any[]
  //user$ = this.authService.currentUser$
  user= this.authService.currentUser

  constructor(private ts:TrackerService, private router:Router, 
    private authService:AuthenticationService) {
    this.txnList = this.ts.getTxnList();
  }

  ngOnInit() {
    this.ts.test2()
  }

  onAdd() {
    this.router.navigate(["/add"])
  }

  test() {
    //console.log(this.authService.currentUser)
    //this.ts.test();
    this.ts.test2();
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
  

}
