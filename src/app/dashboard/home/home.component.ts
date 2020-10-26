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
    caption: "Last month\'s revenue", //Set the chart caption
    subCaption: "Monthly Recurring Revenue (MRR)", //Set the chart subcaption
    xAxisName: "Country", //Set the x-axis name
    yAxisName: "Reserves (MMbbl)", //Set the y-axis name
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
    label: "Uganda",
    value: "290"
  },
  {
    label: "Saudi",
    value: "260"
  },
  {
    label: "Canada",
    value: "180"
  },
  {
    label: "Iran",
    value: "140"
  },
  {
    label: "Russia",
    value: "115"
  },
  {
    label: "UAE",
    value: "100"
  },
  {
    label: "US",
    value: "30"
  },
  {
    label: "China",
    value: "30"
  }
];
