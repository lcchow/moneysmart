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

@Injectable({
  providedIn: 'root'
})
export class TransactionListResolver implements Resolve<any[]> {
  username: any;

  constructor(private ts:TrackerService, private authService:AuthenticationService) {}
  
  ngOnInit() {
    
    const auth = getAuth()
    onAuthStateChanged(auth,async (user) => {
      if (user) {
        this.username = user
        console.log("tview",this.username);

      } else {
        console.log("Tview Not Logged In")
      }
    })
  }
  
  resolve(route:ActivatedRouteSnapshot) {
    this.ts.getTransactions(this.authService.currentUser)
    return this.ts.getTransactionList()
  }
}
