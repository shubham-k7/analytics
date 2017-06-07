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
            let chart = this.charts[0];
            if(name!=="inscan")
                name = name.name;
            this.chartDataService.getChartData(name).subscribe(series => {
                // console.log(this.charts[0]);
                // series.data;
                // console.log(series);
                if(name==="inscan"){  // New Chart Request
                    // this.charts[0].series[0].remove(true);
                    // console.log(series.name);
                    var titleName = series.name,
                        index = this.chartInit(name,titleName);
                    this.charts[index].setTitle({text: series.name});
                    this.charts[index].addSeries(series);
                }

                else{                   // Drilldown Request

                    chart.hideLoading();
                    // console.log(chart.title.text);

                    // console.log(name);
                    // this.charts[0].
                    // console.log()
                    // chart.setTitle({text: newTitle});
                    
                    chart.addSeriesAsDrilldown(arg,series);
                    
                }
                // console.log(this.charts[0].addSeries(series));
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
    chartInit(name: string,titleName: string): number {
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
                                                // console.log(series);
                                                var parentTitle = this.title.textStr;
                                                // console.log();
                                                comp.drilldowns.push(e.point.name);
                                                var series=comp.getChartData(e.point);
                                                var newTitle = parentTitle + ' -> ' + e.point.name;
                                                chart.setTitle({text: newTitle});
                                                
                                                // this.chartName = this.chartName + '->' + name;
                                                // console.log(series);
                                                // chart.hideLoading();
                                                // chart.addSeriesAsDrilldown(e.point, series);
                                        }
                                    },
                                    drillup: function(e) {
                                        var parent = this.title.textStr;
                                        parent = parent.split(' -> ');
                                        parent.pop();
                                        console.log(parent);
                                        // this.drilldowns = parent;
                                        comp.drilldowns.pop();
                                        // for(var p in pare)
                                        console.log(this.title.textStr);
                                        var newTitle = e.seriesOptions.name;
                                        console.log(e.seriesOptions);
                                        this.setTitle({text: newTitle})
                                        // this.chartName = this.charts[0].options.
                                    }
                                }
                            },
                            title: {
                                text: titleName
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
                        // var s = [chart.title]
                        this.drilldowns.push(titleName);
                    return this.charts.push(chart)-1;
    }
    createChart(name: string){
        var series = this.getChartData(name);
        console.log(series);
    }
    options1: any;
    chartName: any;
    
    ngOnInit() {
        this.chartName = "inscan";
        this.createChart(this.chartName);
}
}
