import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TrackerService } from '../services/tracker.service';
import { AuthenticationService } from '../services/authentication.service';
import { getAuth, onAuthStateChanged, user } from '@angular/fire/auth';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent implements OnInit, AfterViewInit {
  //transactionList: any[] | null
  transactionList: any[]
  username: any
  //user$ = this.authService.currentUser$
  user= this.authService.currentUser
  auth = getAuth()
  chart:any

  constructor(private ts:TrackerService, private router:Router, 
    private authService:AuthenticationService, private route:ActivatedRoute) {
    this.transactionList = [];
  }

  ngOnInit() {
    

    let routerData = this.route.snapshot.data['message']
    this.transactionList = routerData
    console.log("TLIST",this.transactionList)
    
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  onAdd() {
    this.router.navigate(["/add"])
  }

  onDelete(event:any,id:any) {
    console.log(id)
    this.ts.deleteTransaction(id).subscribe({
      next: () => this.ts.getTransactions()
    })
    this.router.navigate(["/home"]).then(()=> {
      window.location.reload();
    })
  }

  // onDelete(event:any,txn:any) {
  //   console.log(event,txn,this.username.email)
  //   this.ts.deleteTransaction(this.username.email,txn.txnID)
  //   this.router.navigate(["/home"]).then(()=> {
  //     window.location.reload();
  //   })
  // }

  async test() {
    //console.log(this.username.email)
    //console.log(await this.ts.getTransactions(this.username.email))
    //console.log("LIST:",this.ts.getTransactionList())
  }

  onLogout() {
    this.transactionList=[]
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }

  renderChart() {
    console.log("RENDER",this.transactionList.length)
    let labelList = []

    // for (let i = 0; i<this.transactionList.length;i++) {
    //   let txn = this.transactionList[i];
    //   console.log("RENDER DATE",txn.Date)

    // }


    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          // {
          //   label: "Profit",
          //   data: ['542', '542', '536', '327', '17',
					// 				 '0.00', '538', '541'],
          //   backgroundColor: 'limegreen'
          // }  
        ]
      },
      options: {
        aspectRatio:5
      }
      
    });
  }
  

}
