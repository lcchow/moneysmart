import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { delay, Observable, of } from 'rxjs';
import { TrackerService } from './services/tracker.service';
import { AuthenticationService } from './services/authentication.service';
import { TestBed } from '@angular/core/testing';
import { getDatabase } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class TransactionListResolver implements Resolve<any> {
  username: any;
  // transactions$;

  constructor(private ts:TrackerService, private authService:AuthenticationService) {
    // this.transactions$ = ts.getTransactions("leslie@test.com")
  }
  
  ngOnInit() {
    
  // const auth = getAuth()
  //   onAuthStateChanged(auth,async (user) => {
  //     if (user) {
  //       this.username = user
  //       console.log("tview router",this.username);

  //     } else {
  //       console.log("Tview Not Logged In")
  //     }
  //   })
  }


  
resolve(route:ActivatedRouteSnapshot): Observable<any>{
    //const auth = getAuth()
    
    // console.log("router",this.username);
    // console.log("router2",this.authService.currentUser$);
    // console.log("RESOLVE","leslie@test.com")
    // //console.log("RESOLVER TXNs",this.ts.getTransactionList())
    // //return this.transactions$
    return this.ts.getTransactions();
  }
}
