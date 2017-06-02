import { Component, OnInit } from '@angular/core';
import { ChartComponent } from 'angular2-highcharts';
import { Observable } from 'rxjs/Rx';

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
    // directives: [CHfART_DIRECTIVES],
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

    constructor(private chartDataService: ChartDataService){  }

    /*createChart(type :any[]): void {
        this.getChartData();
        var options = {
            chart: {
            type: 'pie'
        },
        title: {
            text: 'Browser market shares. January, 2015 to May, 2015'
        },
        subtitle: {
            text: 'Click the slices to view versions..'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.1f}%'
                }
        }},
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        }
        }
        return
    }*/
    
    
    
    // events
    onChartSelection(event:any){
        console.log(event);
        // event.
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
    /*chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            defaultSeriesType: 'spline',
            events: {
                load: this.getChartData
            }
        },
        title: {
            text: 'Live random data'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Value',
                margin: 80
            }
        },
        series: [{
            name: 'Random data',
            data: []
        }]
    });        */


    chart: any;
    option: any
    chart2: any;
    // options1: any[];// = {         chart: {            type: 'column'        },        title: {            text: 'Browser market shares. January, 2015 to May, 2015'        },        subtitle: {            text: 'Click the slices to view versions..'        },        plotOptions: {            bar: {                allowPointSelect: true,                cursor: 'pointer',                dataLabels: {                    enabled: true,                    format: '{point.name}: {point.y:.1f}%'                }            }        },        tooltip: {            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'        },        series: [{            name: 'Base',            colorByPoint: true,            data: [{                name: 'Microsoft Internet Explorer',                y: 56.33,                drilldown: 'Microsoft Internet Explorer'            }, {                name: 'Chrome',                y: 24.03,                drilldown: 'Chrome'            }, {                name: 'Firefox',                y: 10.38,                drilldown: 'Firefox'            }, {                name: 'Safari',                y: 4.77,                drilldown: 'Safari'            }, {                name: 'Opera',                y: 0.91,                drilldown: 'Opera'            }, {                name: 'Proprietary or Undetectable',                y: 0.2,                drilldown: null            }]        }],        drilldown: {                        series: [{                name: 'Microsoft Internet Explorer',                id: 'Microsoft Internet Explorer',                data: [                    ['v11.0', 24.13],                    ['v8.0', 17.2],                    ['v9.0', 8.11],                    ['v10.0', 5.33],                    ['v6.0', 1.06],                    ['v7.0', 0.5]                ]            }, {                name: 'Chrome',                id: 'Chrome',                data: [                    ['v40.0', 5],                    ['v41.0', 4.32],                    ['v42.0', 3.68],                    ['v39.0', 2.96],                    ['v36.0', 2.53],                    ['v43.0', 1.45],                    ['v31.0', 1.24],                    ['v35.0', 0.85],                    ['v38.0', 0.6],                    ['v32.0', 0.55],                    ['v37.0', 0.38],                    ['v33.0', 0.19],                    ['v34.0', 0.14],                    ['v30.0', 0.14]                ]            }, {                name: 'Firefox',                id: 'Firefox',                data: [                    ['v35', 2.76],                    ['v36', 2.32],                    ['v37', 2.31],                    ['v34', 1.27],                    ['v38', 1.02],                    ['v31', 0.33],                    ['v33', 0.22],                    ['v32', 0.15]                ]            }, {                name: 'Safari',                id: 'Safari',                data: [                    ['v8.0', 2.56],                    ['v7.1', 0.77],                    ['v5.1', 0.42],                    ['v5.0', 0.3],                    ['v6.1', 0.29],                    ['v7.0', 0.26],                    ['v6.2', 0.17]                ]            }, {                name: 'Opera',                id: 'Opera',                data: [                    ['v12.x', 0.34],                    ['v28', 0.24],                    ['v27', 0.17],                    ['v29', 0.16]                ]            }]        }};
    options2: any;
    // chartoptions: any;
    options1 = {        
    chart: {
            type: 'column'
        },
        title: {
            text: 'Browser market shares. January, 2015 to May, 2015'
        },
        subtitle: {
            text: 'Click the slices to view versions..'
        },
        plotOptions: {
            bar: {
                allowPointSelect: true,
                cursor: 'pointer',
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
            name: 'Base',
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
}
    getChartData(): void {
            this.chartDataService.getChartData().subscribe(chartOptions => {
            console.log("ChartDataService Works");
                // this.options1 = chartOptions[0];
                // this.options2 = chartOptions[1];
                // console.log(JSON.parse(chartOptions)._body);
                var temp = JSON.parse(chartOptions)._body;
                // this.options1 = temp;
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
