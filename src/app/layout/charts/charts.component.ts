import { Component, OnInit } from '@angular/core';
// import { lineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend } from 'recharts';
// import { ReactTreeView } from './react-tree-view';

import { ChartComponent } from 'angular2-highcharts';

/*export class DynamicChartExample {
    constructor() {
        this.options = {
            title: { text : 'chart with dynamic data' },
            series: [{
                data: [2,3,5,8]
            }]
        }
    }
    chart : any;
    options: any;
    saveInstance(chartInstance) {
        this.chart = chartInstance;
    }
    addPoint() {
        this.chart.series[0].addPoint(Math.random() * 10);

        for (var series of this.chart.series) {
            console.log(series);
        }
    }
}

*/



import { ChartDataService } from '../../shared/services/chart-data.service';


@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

    constructor(private chartDataService: ChartDataService){
        this.options = {
  chart: {
            type: 'column'
        },
        title: {
            text: 'Browser market shares. January, 2015 to May, 2015'
        },
        subtitle: {
            text: 'Click the slices to view versions. Source: netmarketshare.com.'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Microsoft Internet Explorer',
                y: 56.33,
                drilldown: 'Microsoft Internet Explorer'
            }, {
                name: 'Chrome',
                y: 24.03,
                drilldown: 'Chrome'
            }, {
                name: 'Firefox',
                y: 10.38,
                drilldown: 'Firefox'
            }, {
                name: 'Safari',
                y: 4.77,
                drilldown: 'Safari'
            }, {
                name: 'Opera',
                y: 0.91,
                drilldown: 'Opera'
            }, {
                name: 'Proprietary or Undetectable',
                y: 0.2,
                drilldown: null
            }]
        }],
        drilldown: {
            series: [{
                name: 'Microsoft Internet Explorer',
                id: 'Microsoft Internet Explorer',
                data: [
                    ['v11.0', 24.13],
                    ['v8.0', 17.2],
                    ['v9.0', 8.11],
                    ['v10.0', 5.33],
                    ['v6.0', 1.06],
                    ['v7.0', 0.5]
                ]
            }, {
                name: 'Chrome',
                id: 'Chrome',
                data: [
                    ['v40.0', 5],
                    ['v41.0', 4.32],
                    ['v42.0', 3.68],
                    ['v39.0', 2.96],
                    ['v36.0', 2.53],
                    ['v43.0', 1.45],
                    ['v31.0', 1.24],
                    ['v35.0', 0.85],
                    ['v38.0', 0.6],
                    ['v32.0', 0.55],
                    ['v37.0', 0.38],
                    ['v33.0', 0.19],
                    ['v34.0', 0.14],
                    ['v30.0', 0.14]
                ]
            }, {
                name: 'Firefox',
                id: 'Firefox',
                data: [
                    ['v35', 2.76],
                    ['v36', 2.32],
                    ['v37', 2.31],
                    ['v34', 1.27],
                    ['v38', 1.02],
                    ['v31', 0.33],
                    ['v33', 0.22],
                    ['v32', 0.15]
                ]
            }, {
                name: 'Safari',
                id: 'Safari',
                data: [
                    ['v8.0', 2.56],
                    ['v7.1', 0.77],
                    ['v5.1', 0.42],
                    ['v5.0', 0.3],
                    ['v6.1', 0.29],
                    ['v7.0', 0.26],
                    ['v6.2', 0.17]
                ]
            }, {
                name: 'Opera',
                id: 'Opera',
                data: [
                    ['v12.x', 0.34],
                    ['v28', 0.24],
                    ['v27', 0.17],
                    ['v29', 0.16]
                ]
            }]
        }
    };
    }
    chart : any;
    options: any;
    /*saveInstance(chartInstance) {
        this.chart = chartInstance;
    }
    addPoint() {
        this.chart.series[0].addPoint(Math.random() * 10);

        for (var series of this.chart.series) {
            console.log(series);
        }
    }*/

onChartSelection(event:any){
      alert(123);
      console.log(event);
    }

    barChartOptions: any;
    barChartLabels: string[];// = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    barChartType: string;// = 'bar';
    barChartLegend: boolean;// = true;

    
    barChartData: any[];/* = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
    ];
    // Doughnut
    public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType: string = 'doughnut';
    // Radar
    public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
    public radarChartData: any = [
        {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
    ];
    public radarChartType: string = 'radar';
    // Pie
    public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    public pieChartData:number[] = [300, 500, 100];
    public pieChartType:string = 'pie';
    // PolarArea
    public polarAreaChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
    public polarAreaChartData:number[] = [300, 500, 100, 40, 120];
    public polarAreaLegend:boolean = true;

    public polarAreaChartType:string = 'polarArea';
    // lineChart
    public lineChartData: Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];
    public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
    { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';*/

    // events
    public chartClicked(e: any): void {
        if(e.active[0]){
            console.log(e.active[0]._index);
            // this.getChartData(e.active[0]._index);
        }
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    public randomize(): void {
        // Only Change 3 values
        console.log(this.barChartData);
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            (Math.random() * 100),
            56,
            (Math.random() * 100),
            40
        ];
        /*const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;*/
        /**
        * (My guess), for Angular to recognize the change in the dataset
        * it has to change the dataset variable directly,
        * so one way around it, is to clone the data, change it and then
        * assign it;
        */
    }
    // constructor() { }
    getChartData(): void {
        
        this.chartDataService.getChartData().subscribe(chartData => {
                // const clone = JSON.parse(JSON.stringify(this.barChartData));
                // console.log(chartData);
                 this.barChartOptions = {
                scaleShowVerticalLines: false,
                responsive: true
    };
    this.barChartLabels= ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    this.barChartType= 'bar';
    this.barChartLegend= true;
                // this.barChartData =    ;
    this.barChartData = [
        {data: [10, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [10, 59, 80, 81, 56, 55, 40], label: 'Series B'}
    ];
               /* clone[0].data = chartData;
                this.barChartData = clone;
                console.log("DATA: ");
                console.log(this.barChartData);*/
            },
            (err) => {
                console.log("ERROR occured");
            }
        );
    }

    ngOnInit() {
        console.log("React Charts here");
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
            };
        this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this. barChartType = 'bar';
        this.barChartLegend= true;
        this.barChartData = [
            {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
            {data: [60, 10, 20, 10, 80, 10, 20], label: 'Series B'}
        ];
        this.getChartData();
        // ReactTreeView.initialize('Locations');
     }
}
