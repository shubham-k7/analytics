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

    public getChartData(arg: any,chartName: string): void {
            // var arg = name;
            // console.log(this.drilldowns.length);
            var comp=this;
            var t,co;
            if(chartName==='inscan'){
                co = this.charts[0];
                t = this.drilldowns.length;
            }
            else{
                co = this.charts[1];
                t=this.drilldowns2.length;
            }


            var temp = {name: arg.name,report_type: t}
            console.log(temp);
            // let chart = this.charts[0];
            this.chartDataService.getChartData(temp).subscribe(series => {
                    // console.log(series);
                    // console.log(temp);
                    var chart;
                    if(chartName==="inscan")
                        chart = comp.charts[0];
                    else
                        chart = comp.charts[1];
                    // console.log(chart);
                    // console.log(co);
                    chart.hideLoading();
                    // console.log(arg);
                    chart.addSeriesAsDrilldown(arg,series);
                    // chart.hideLoading();
                    // if(series.name!=="States")
                        // chart.addSeriesAsDrilldown(arg,series);
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
    drilldowns2 = [];
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
                                                var chartName = this.pointer.options.chart.name;
                                                // console.log(this.pointer.options.chart.name); 


                                                if(chartName==='inscan') 
                                                    comp.drilldowns.push(e.point.name);
                                                else
                                                    comp.drilldowns2.push(e.point.name);
                                                // comp.drilldowns.push(e.point.name);

                                                comp.getChartData(e.point,chartName);
                                        }
                                    },
                                    drillup: function(e) {
                                        // console.log(parent);
                                        var chartName = this.pointer.options.chart.name;
                                        console.log(chartName);
                                        if(chartName==='inscan')
                                            comp.drilldowns.pop();
                                        else
                                            comp.drilldowns2.pop();
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
    // chart2Init(name: string): 
    getChart(name: string) {
            var arg = name;
            var chart;
            if(name==="inscan_percent")
                chart = this.charts[1];
            else 
                chart = this.charts[0];
            this.chartDataService.getChart(name).subscribe(series => {
                    var titleName = series.name,index;
                    this.chartInit(name);
                        if(name==='inscan'){
                            index=0;
                            this.drilldowns.push(series.name);
                        }
                        else{
                            index=1;
                            this.drilldowns2.push(series.name);
                        }
                        // console.log()
                        this.charts[index].addSeries(series);
        });
}
    createChart(name: string){
        this.getChart(name);
    }
    options1: any;
    chartName: any;
    
    ngOnInit() {
        // this.chartName = "inscan";
        this.createChart("inscan");
        this.createChart("inscan_percent");
}
}
