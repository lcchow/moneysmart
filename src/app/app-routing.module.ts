import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionViewComponent } from './transaction-view/transaction-view.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { LoginComponent } from './login/login.component';
import { TransactionListResolver } from './transaction-list.resolver';

const routes: Routes = [
  { path:"",component:LoginComponent },
  { path:"add",component:AddTransactionComponent },
  { path:"home",
    component:TransactionViewComponent,
    resolve: {message:TransactionListResolver}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
