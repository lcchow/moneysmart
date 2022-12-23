import { Component } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup

  constructor(private authService:AuthenticationService, private router:Router) {
    
    let formControls = {
      username: new FormControl(""),
      password: new FormControl("")
    }

    this.form = new FormGroup(formControls)

  }

  onLogin(values:any) {
    const user = values.username
    const pass = values.password
    this.authService.login(user,pass)
    // this.authService.login(user,pass).subscribe(() => {
    //   this.router.navigate(['home']);
    // })
  }
}
