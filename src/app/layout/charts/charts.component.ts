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
            var arg = name;
            if(name!=="inscan")
                name = name.name;
            this.chartDataService.getChartData(name).subscribe(series => {
                // console.log(this.charts[0]);
                // series.data;
                // console.log(series);
                if(name==="inscan")
                    this.charts[0].addSeries(series);
                else{
                    this.charts[0].hideLoading();
                    this.charts[0].addSeriesAsDrilldown(arg,series);
                }
                // console.log(this.charts[0].addSeries(series));
                // this.createChart()
                // chart.set(chartOptions,true);
    },
            (err) => {
                console.log("ERROR occured");
                // return null;
            }
        );

    }
    // chart: any;
    charts = [];
    
    createChart(name: string){
        var comp = this;
        var series = this.getChartData(name);
        this.charts.push(new Highcharts.Chart({
                            chart: {
                                name: name,
                                type: 'column',
                                renderTo: name,
                                events: {
                                    drilldown: function (e) {
                                        if (!e.seriesOptions) {
                                        
                                                var chart = this;
                                                chart.showLoading('Fetching Data ...');
                                                var series=comp.getChartData(e.point);
                                                console.log(e.point);
                                                // console.log(series);
                                                // chart.hideLoading();
                                                // chart.addSeriesAsDrilldown(e.point, series);
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
                        }));
                        // chart.series[0].update(series);

    }
    options1: any;
    ngOnInit() {
        console.log("React Charts here");
        this.createChart("inscan");
}
}
