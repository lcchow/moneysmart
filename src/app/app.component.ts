import { Component } from '@angular/core';
import { TrackerService } from './services/tracker.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  txnList: any[];
  title = 'expensetracker';

  constructor(private ts:TrackerService, public authService:AuthenticationService,
    private router:Router) {
    this.txnList = this.ts.getTxnList()
  }

  onLogin() {
    this.router.navigate(['/']);
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    })
  }

  onHome() {
    if (this.authService.currentUser$) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/'])
    }

  }

}
