import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { AuthenticationService } from './authentication.service';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  user$ = this.authService.currentUser$

  app = initializeApp(environment.firebase)
  db = getFirestore(this.app)

  txnList = [
    {date: "dec 15, 2022",type:"expense",category:"food",desc:"restaurant",amount:100.54},
    {date: "dec 22, 2022",type:"expense",category:"car",desc:"gas",amount:60.83},
    {date: "nov 12, 2022",type:"expense",category:"education",desc:"tuition",amount:2536.43},
    {date: "oct 31, 2022",type:"expense",category:"house",desc:"mortgage",amount:3150},
    {date: "jan 25, 2022",type:"expense",category:"food",desc:"grocery store purchase",amount:120.96},
    {date: "mar 12, 2022",type:"expense",category:"gift",desc:"computer game",amount:48.50}
  ]

  categories = [
    "Food",
    "Housing",
    "Transportation",
    "Bills",
    "Beauty",
    "Health",
    "Subscriptions",
    "Education",
    "Entertainment",
    "Apparel",
    "Gift"
  ]

  constructor(private http:HttpClient, private authService:AuthenticationService,
    ) {
  }

  get CurrentUser$() {
    return this.authService.currentUser$.pipe(

    )
  }

  getTxnList() {
    return this.txnList
  }

  getCategories() {
    return this.categories
  }

  retrieveCategories() {
    this.http.get<Object>('https://expensetracker-17b08-default-rtdb.firebaseio.com/admin.json')
    .subscribe((data:any)=>{
      console.log(data.categories)
    })
    
  }

  test() {
    console.log(this.authService.currentUser)
  }

  async test2() {
    try {
      (await getDocs(collection(this.db, "User","leslie@test.com","Transactions"))).forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()["Amount"]}`);
      })
    }
    catch(error){
      console.log(error)
    }
  }


  // add() {
  //   this.http.post()
  // }
}
