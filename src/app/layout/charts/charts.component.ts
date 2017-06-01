import { Component, OnInit } from '@angular/core';
import { ChartComponent } from 'angular2-highcharts';


// import { CHART_DIRECTIVES, Highcharts } from 'angular2-highcharts';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
declare var require: any;
var Highcharts = require('highcharts/highcharts');
var HighchartsMore = require('highcharts/highcharts-more');

HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);

// import { CHART_DIRECTIVES } from 'angular2-highcharts';
import { ChartDataService } from '../../shared/services/chart-data.service';

@Component({
    selector: 'app-charts',
    // directives: [CHART_DIRECTIVES],
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

    chart : any;
    options: any;

    constructor(private chartDataService: ChartDataService){  }

    // events
    onChartSelection(event:any){
        console.log(event);
    }

    public chartClicked(e: any): void {
        if(e.active[0]){
            console.log(e.active[0]._index);
            // this.getChartData(e.active[0]._index);
        }
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    getChartData(): void {
        this.chartDataService.getChartData().subscribe(chartOptions => {
            console.log("ChartDataService Works");
            this.options = chartOptions;
        },
            (err) => {
                console.log("ERROR occured");
            }
        );
    }

    ngOnInit() {
        console.log("React Charts here");
        this.getChartData();
     }
}
