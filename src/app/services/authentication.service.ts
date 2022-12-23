import { Injectable } from '@angular/core';
import { Auth,authState,signInWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth);

  constructor(private auth:Auth, private router:Router) { }

  // login (username:string, password:string) {
  //   signInWithEmailAndPassword(this.auth,username,password)
  //     .then((userCredential) => {
  //       const user = userCredential.user
  //       console.log("VALID")
  //       this.router.navigate(["/home"])
        
  //     })
  //     .catch((error)=> {
  //       const errorCode=error.code;
  //       const errorMessage = error.message;
  //       alert(errorMessage)

  //       console.log(error)
  //     });
  // }

  login (username:string, password:string) {
    return from(signInWithEmailAndPassword(this.auth,username,password))
  }

  logout() {
    return from(this.auth.signOut());
  }
}
