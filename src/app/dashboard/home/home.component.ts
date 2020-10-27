import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
// Chart Configuration
dataSource = {
  chart: {
    caption: "Bulk Payments", //Set the chart caption
    subCaption: "Monthly Recurring Revenue (MRR)", //Set the chart subcaption
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
  constructor() { }

  ngOnInit(): void {
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
