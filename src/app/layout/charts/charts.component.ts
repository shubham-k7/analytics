import { Component, OnInit } from '@angular/core';
import { ChartComponent } from 'angular2-highcharts';
import { Observable } from 'rxjs/Rx';

import { ChartDataService } from '../../shared/services/chart-data.service';
// import HighchartsDrilldown from 'highcharts/modules/drilldown';

declare var require: any;
var Highcharts = require('highcharts/highcharts');
var HighchartsMore = require('highcharts/highcharts-more');
var HighchartsDrilldown = require('highcharts/modules/drilldown');
HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

    constructor(private chartDataService: ChartDataService){ }

    // Charts defination
    
        // events
    public chartClicked(e: any): void { }
    public chartHovered(e: any): void { }
    public saveInstance(chartInstance) { }

    public getChartData(name: any): void {
            this.chartDataService.getChartData(name).subscribe(series => {
                console.log(series);
                // series.data;
                // console.log(series);
                console.log(this.chart.addSeries(series));
                // this.createChart()
                // chart.set(chartOptions,true);
    },
            (err) => {
                console.log("ERROR occured");
                // return null;
            }
        );

    }
    chart: any;
    charts = [];
    createChart(name: string){
        var comp = this;
        var series = this.getChartData(name);

   /* var series = [{
	"name": "States",
	"colorByPoint": true,
	"data": [{
		"name": "Delhi",
		"y": 60.33,
		"drilldown": true
	}, {
		"name": "Haryana",
		"y": 24.03,
		"drilldown": true
	}, {
		"name": "Uttar Pradesh",
		"y": 10.38,
		"drilldown": true
	}, {
		"name": "Punjab",
		"y": 4.77,
		"drilldown": true
	}, {
		"name": "Uttarakhand",
		"y": 0.91,
		"drilldown": true
	}, {
		"name": "Rajasthan",
		"y": 0.2,
		"drilldown": true
	}]
}];*/
        this.chart = new Highcharts.Chart({
                            chart: {
                                name: name,
                                type: 'column',
                                renderTo: name,
                                events: {
                                    drilldown: function (e) {
                                        if (!e.seriesOptions) {
                                        
                                                var chart = this;
                                                chart.showLoading('Fetching Data ...');
                                                var series=comp.getChartData(e.point.name);
                                                console.log(e.point.name);
                                                chart.hideLoading();
                                                chart.addSeriesAsDrilldown(e.point, series);
                                        }
                                    
                                    }
                                }
                            },
                            title: {
                                text: name
                            },
                            xAxis: {
                                type: 'category'
                            },
                        
                            legend: {
                                enabled: false
                            },
                        
                            plotOptions: {
                                series: {
                                    borderWidth: 0,
                                    dataLabels: {
                                        enabled: true
                                    }
                                }
                            },
                        
                            series: [],
                            drilldown: {
                                series: []
                            }
                        });
                        // chart.series[0].update(series);

    }

    options1: any;
    ngOnInit() {
        console.log("React Charts here");
        // this.getChartData("inscan");
        this.createChart("inscan");
        // this.charts[0].update();
    // this.getChartData();
}
}
