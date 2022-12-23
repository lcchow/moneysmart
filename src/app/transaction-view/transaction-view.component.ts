import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TrackerService } from '../services/tracker.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent {
  txnList: any[]
  user$ = this.authService.currentUser$

  constructor(private ts:TrackerService, private router:Router, private authService:AuthenticationService) {
    this.txnList = this.ts.getTxnList();
  }

  onAdd() {
    this.router.navigate(["/add"])
  }

  test() {
    this.ts.retrieveCategories()
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
  

}
