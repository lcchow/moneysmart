import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { AuthenticationService } from './authentication.service';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';



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


  async getTransactions(username:string) {
    try {
      this.transactionList = [];
      console.log("get txn user",username)
      const query = await getDocs(collection(this.db, "User",username,"Transactions"));
      query.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        let txn = doc.data()
        txn['txnID'] = doc.id
        this.transactionList.push(txn)
      })
      console.log(this.transactionList)
      return this.transactionList
    }
    catch(error){
      console.log(error)
      return null
    }
  }

  // async getTransactions(username:string) {
  //   try {
  //     this.transactionList = [];
  //     (await getDocs(collection(this.db, "User",username,"Transactions"))).forEach((doc) => {
  //       console.log(`${doc.id} => ${doc.data()}`);
  //       //let transaction = {Amount:`${doc.data()["Amount"]}`}
  //       this.transactionList.push({
  //         Date:`${doc.data()["Date"]}`,
  //         Type:`${doc.data()["Type"]}`,
  //         Category:`${doc.data()["Category"]}`,
  //         Description:`${doc.data()["Description"]}`,
  //         Amount:`${doc.data()["Amount"]}`,
  //       })
  //     })
  //     console.log("get",this.transactionList)
  //     return this.transactionList
  //     //return this.transactionList
  //   }
  //   catch(error){
  //     console.log(error)
  //     return null
  //   }
  // }

  getTransactionList() {
    return this.transactionList
  }

  async addTransaction(email:string,date:number,type:string,category:string,desc:string,amount:number) {
    try {
      (await addDoc(collection(this.db,"User",email,"Transactions"), {
        Date: date,
        Type: type,
        Category: category,
        Description: desc,
        Amount: amount 
        }
      
      ))
      console.log("Adding for",email)
    } catch(error) {
      console.log(error)
    }

  }

  test() {
    console.log(this.authService.currentUser)
  }



}
