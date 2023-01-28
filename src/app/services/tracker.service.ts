import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';
import { AuthenticationService } from './authentication.service';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { Subject } from 'rxjs';



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

  transactionList: any[]
  
  private url = "http://localhost:5000";
  private transactions$: Subject<any> = new Subject()
  uid: String;

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
      this.transactionList = []
      this.uid = ""
  }

  getTxnList() {
    return this.txnList
  }

  getCategories() {
    return this.categories
  }

  setUser(username:String) {
    this.uid = username;
    console.log("SERVICE",this.uid)
  }

  retrieveCategories() {
    this.http.get<Object>('https://expensetracker-17b08-default-rtdb.firebaseio.com/admin.json')
    .subscribe((data:any)=>{
      console.log(data.categories)
    }) 
  }

  // async getTransactions(username:string) {
  //   try {
  //     this.transactionList = [];
  //     console.log("get txn user",username)
  //     const query = await getDocs(collection(this.db, "User","leslie@test.com","Transactions"));
  //     query.forEach((doc) => {
  //       //console.log(doc.id, " => ", doc.data());
  //       let txn = doc.data()
  //       txn['txnID'] = doc.id
  //       this.transactionList.push(txn)
  //     })
  //     return query
  //   }
  //   catch(error){
  //     console.log(error)
  //     return null
  //   }
  // }




refreshTransactions() {
  this.http.get(`${this.url}/transactions`)
    .subscribe(transactions => {
      this.transactions$.next(transactions);
      console.log(transactions)
    })
}

getTransactions() {
  this.refreshTransactions();
  return this.transactions$
}

// getTransactionList() {
//   return this.transactionList
// }


addTransaction(email:string,date:number,type:string,category:string,desc:string,amount:number) {
  let transaction = {
    email: email,
    date: date,
    type: type,
    category: category,
    description: desc,
    amount: amount
  }
  return this.http.post(`${this.url}/${this.uid}transactions`,transaction,{ responseType: 'text'})
}

addTransaction2(email:string,date:number,type:string,category:string,desc:string,amount:number) {
  let transaction = {
    email: email,
    date: date,
    type: type,
    category: category,
    description: desc,
    amount: amount
  }
  return this.http.post(`${this.url}/${this.uid}/transactions`,transaction,{ responseType: 'text'})
}

  // async addTransaction(email:string,date:number,type:string,category:string,desc:string,amount:number) {
  //   try {
  //     (await addDoc(collection(this.db,"User",email,"Transactions"), {
  //       Date: date,
  //       Type: type,
  //       Category: category,
  //       Description: desc,
  //       Amount: amount 
  //       }
      
  //     ))
  //     console.log("Adding for",email)
  //   } catch(error) {
  //     console.log(error)
  //   }

  // }

deleteTransaction(txnId:string) {
  console.log(`${txnId}`)
  return this.http.delete(`${this.url}/transactions/delete/${txnId}`, { responseType: 'text' })
  }

  // async deleteTransaction(email:string,txnID:string) {
  //   try {
  //     console.log("deleting",email,txnID);
  //     (await deleteDoc(doc(this.db,"User",email,"Transactions",txnID)));
  //     //this.getTransactions(email)

  //   } catch(error) {
  //     console.log(error)
  //   }
  // }



  test() {
    console.log(this.authService.currentUser)
  }



}
