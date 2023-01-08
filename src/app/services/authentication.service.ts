import { Injectable } from '@angular/core';
import { Auth,authState,getAuth,signInWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { browserSessionPersistence, onAuthStateChanged, setPersistence } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser: any
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
      setPersistence(this.auth,browserSessionPersistence)
        .then(() => {
          return signInWithEmailAndPassword(this.auth,username,password)
                .then((userCredential) => {
                  this.currentUser = userCredential.user.email
                  console.log("LOGIN",this.currentUser)
                  this.router.navigate(['/home'])
                })
                .catch ((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  alert(errorMessage)
                })
        })
    
  }

  logout() {
    return from(this.auth.signOut());
  }

  getCurrentUser() {
    try {
      onAuthStateChanged(this.auth, (user:any) => {
        if (user) {

          console.log("GET USER",user)
          this.currentUser = user;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
      return this.currentUser
      
    }
    catch(error){
      console.log(error)
      return null
    }
  }
}
