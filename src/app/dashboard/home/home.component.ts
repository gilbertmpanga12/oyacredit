import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MainService } from 'src/app/services/main.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
// Chart Configuration
transactionCount: AngularFirestoreDocument<any>;
transactionCount$: Observable<any>;
bulkSingleCount: AngularFirestoreDocument<any>;
bulkSingleCount$:  Observable<any>;
fundsCollectedCount: AngularFirestoreDocument<any>;
fundsCollectedCount$:  Observable<any>;
fundsAvailable: any;
dataSource = {
  chart: {
    caption: "Bulk Payments", //Set the chart caption
    // subCaption: "Monthly Recurring Revenue (MRR)", //Set the chart subcaption
    xAxisName: "Payments", //Set the x-axis name
    yAxisName: "Funds (UGX)", //Set the y-axis name
    numberSuffix: "K",
    theme: "fusion", //Set the theme for your chart,
    baseFont: "Poppins, sans-serif",
    paletteColors: "#ffeb3b"
  },
  // Chart Data - from step 2
  data: chartData
};
  constructor(private firestore: AngularFirestore, public service: MainService) { }

  ngOnInit(): void {
    this.transactionCount = this.firestore.doc('transactionCount/' + this.service.userId);
    this.transactionCount$ = this.transactionCount.valueChanges();

    this.bulkSingleCount = this.firestore.doc('singleBulkTransactionCount/' + this.service.userId);
    this.bulkSingleCount$ = this.transactionCount.valueChanges();

    this.fundsCollectedCount = this.firestore.doc('fundsCollectedCount/' + this.service.userId);
    this.fundsCollectedCount$ = this.transactionCount.valueChanges();

    this.service.getFundsAvailable().subscribe((data: any) => {
      this.fundsAvailable = data["totalBalance"];
    }, error => {
      console.log(error);
    })
  }

  numberTrimmer(amount:number): string{
    if(amount > 1000){
      return `${amount}`.substring(0,3) + 'k';
    }else if(amount > 990000){
      return `${amount}`.substring(0,3) + 'k';
    }else{
      return `${amount}`;
    }
  }

}



// Preparing the chart data
const chartData = [
  {
    label: "Jan",
    value: "290"
  },
  {
    label: "Feb",
    value: "260"
  },
  {
    label: "Mar",
    value: "180"
  },
  {
    label: "Apr",
    value: "140"
  },
  {
    label: "May",
    value: "115"
  },
  {
    label: "Jun",
    value: "100"
  },
  {
    label: "Jul",
    value: "30"
  },
  {
    label: "Aug",
    value: "23"
  },
  {
    label: "Oct",
    value: "63"
  },
  {
    label: "Nov",
    value: "43"
  },
  {
    label: "Dec",
    value: "13"
  }
];
