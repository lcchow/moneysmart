import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { HttpClient } from '@angular/common/http';
import { TrackerService } from './services/tracker.service';
import { Observable } from 'rxjs';

interface Transaction {
  date: number;
  type: string;
  category: string;
  description: string;
  amount: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ TrackerService ]
})

export class AppComponent implements OnInit {
  txnList: any[];
  title = 'expensetracker';
  username:any;

  transactions$: Observable<any> = new Observable();

  constructor(private http: HttpClient,private ts:TrackerService, public authService:AuthenticationService,
    private router:Router) {
    this.txnList = this.ts.getTxnList();
  }

  ngOnInit() {
    const auth = getAuth()
    onAuthStateChanged(auth,(user) => {
      if (user) {
        this.username = user.uid
        this.ts.setUser(this.username)
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
