import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { delay, Observable, of } from 'rxjs';
import { TrackerService } from './services/tracker.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionListResolver implements Resolve<any[]> {
  
  constructor(private ts:TrackerService) {}
  
  resolve(route:ActivatedRouteSnapshot) {
    this.ts.getTransactions((<string>route.paramMap.get('email')))
    return this.ts.getTransactionList()
  }
}
