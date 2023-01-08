import { Component, OnInit } from '@angular/core';
import { TrackerService } from './services/tracker.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  txnList: any[];
  title = 'expensetracker';
  username:any;

  constructor(private ts:TrackerService, public authService:AuthenticationService,
    private router:Router) {
    this.txnList = this.ts.getTxnList()
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
      console.log("here",this.username.email)
      this.router.navigate(['/home/']);
    } else {
      this.router.navigate(['/'])
    }

  }

}
