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

    public getChartData(arg: any): void {
            // var arg = name;
            let chart = this.charts[0];
            this.chartDataService.getChartData(arg.name).subscribe(series => {
                    chart.hideLoading();
                    chart.addSeriesAsDrilldown(arg,series);
            },
            (err) => {
                console.log("ERROR occured");
                this.charts[0].hideLoading();
            }
        );

    }
    // chart: any;
    charts = [];
    drilldowns = [];
    chartInit(name: string): number {
        var comp = this;
        var chart = new Highcharts.Chart({
                            chart: {
                                name: name,
                                type: 'column',
                                renderTo: name,
                                events: {
                                    drilldown: function (e) {
                                        if (!e.seriesOptions) {
                                                var chart = this;
                                                chart.showLoading('Fetching Data ...');
                                                comp.drilldowns.push(e.point.name);
                                                comp.getChartData(e.point);
                                        }
                                    },
                                    drillup: function(e) {
                                        // console.log(parent);
                                        comp.drilldowns.pop();
                                        // console.log(e.seriesOptions);
                                    }
                                }
                            },
                            title: {
                                text: null
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
                            },
                             responsive: {
                                rules: [{
                                    condition: {
                                        maxWidth: 500
                                    },
                                    chartOptions: {
                                        legend: {
                                            align: 'center',
                                            verticalAlign: 'bottom',
                                            layout: 'horizontal'
                                        },
                                        yAxis: {
                                            labels: {
                                                align: 'left',
                                                x: 0,
                                                y: -5
                                            },
                                            title: {
                                                text: null
                                            }
                                        },
                                        subtitle: {
                                            text: null
                                        },
                                        credits: {
                                            enabled: false
                                        }
                                    }
                                }]
                            }
                        });
                    return this.charts.push(chart)-1;
    }
    getChart(name: string) {
            var arg = name;
            let chart = this.charts[0];
            this.chartDataService.getChart(name).subscribe(series => {
                    var titleName = series.name,
                    index = this.chartInit(name);
                    this.drilldowns.push(series.name);
                    this.charts[index].addSeries(series);
                
        });
}
    createChart(name: string){
        this.getChart(name);
    }
    options1: any;
    chartName: any;
    
    ngOnInit() {
        this.chartName = "inscan";
        this.createChart(this.chartName);
}
}
