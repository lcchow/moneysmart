import { Component } from '@angular/core';
import { TrackerService } from './services/tracker.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  txnList: any[];
  title = 'expensetracker';

  constructor(private ts:TrackerService) {
    this.txnList = this.ts.getTxnList()
  }

}
