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
    
    drilldownsAdded = 0;
    public getChartData(event: any,chartName: string): void {
            var comp=this;
            var t;
            t = this.drilldowns[chartName].length;
            console.log(event.point);
            var temp = {name: event.point.id,
                        report_type: t+1,
                        chartName: chartName};
            console.log(temp);
            this.chartDataService.getChartData(temp).subscribe(series => {
                    var chart;
                    chart = comp.charts[chartName];
                    chart.hideLoading();
                    console.log(event);
                    if(event.points)
                    {
                        chart.addSingleSeriesAsDrilldown(event.point,series[0]);
                        comp.drilldownsAdded++;
                        if(comp.drilldownsAdded===event.points.length) {
                            var n = temp.name.split('_');
                            comp.drilldownsAdded=0;
                            chart.applyDrilldown();
                            comp.drilldowns[chartName].push(n[0]);
                        }
                    }
                    else{
                        chart.addSingleSeriesAsDrilldown(event.point,series[0]);
                        chart.applyDrilldown();
                        // console.log(chartName);
                        console.log(comp.drilldowns);
                        console.log(event);
                        comp.drilldowns[chartName].push(event.point.name);
                    }
            },
            (err) => {
                console.log("ERROR occured");
                this.charts[temp.chartName].hideLoading();
            }
        );
    }
    charts: Map<string,any> = new Map();
    drilldowns: Map<string,string[]> = new Map();
    chartInit(id: string) {
        var comp = this;
        var chart = new Highcharts.Chart({
                            chart: {
                                name: id,
                                type: 'column',
                                renderTo: id,
                                zoomType: 'x',
                                panning: true,
                                panKey: 'shift',
                                resetZoomButton: {
                                    position: {
                                            align: 'center', // by default
                                            verticalAlign: 'top', // by default
                                            x: -20,
                                            y: 10
                                        },
                                    relativeTo: 'chart',
                                    theme: {
                                        fill: 'white',
                                        stroke: 'silver',
                                        r: 0,
                                        states: {
                                            hover: {
                                            fill: '#41739D',
                                            style: {
                                                color: 'white'
                                                }
                                            } 
                                        }
                                    }    
                                },
                                events: {
                                    drilldown: function (e) {
                                        if (!e.seriesOptions) {
                                                var chart = this;
                                                chart.showLoading('Fetching Data ...');
                                                var chartid = this.pointer.options.chart.name;
                                                console.log(e.point.name);
                                                comp.getChartData(e,chartid);
                                        }
                                    },
                                    drillup: function(e) {
                                        console.log(e);
                                        if(e.target.options.chart.name==='inscan_booked_count'){
                                            comp.drilldownsAdded++;
                                            if(comp.drilldownsAdded===2){
                                                comp.drilldownsAdded=0;
                                                comp.drilldowns[this.options.chart.name].pop();
                                            }
                                        }
                                        else
                                            comp.drilldowns[this.options.chart.name].pop();                                            
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
                                enabled: true
                            },
                            plotOptions: {
                                series: {
                                    borderWidth: 0,
                                    dataLabels: {
                                        enabled: true,
                                        format: '{point.y}'
                                    }
                                },
                                column: {
                                    events: {
                                        legendItemClick: function () {
                                                        return false; 
                                                        }
                                    }
                                }
                            },
                            series: [],
                            drilldown: {
                                allowPointDrilldown: false,
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
                    if(id==='inscan'){
                        chart.yAxis[0].setTitle({text: "Time Difference(Mins)"});
                    }
                    else if(id==='inscan_percent'){

                        chart.options.plotOptions.series.dataLabels.format = '{point.y}%';
                        chart.yAxis[0].setTitle({text: "Percentage"});
                        chart.yAxis[0].min = 0;
                        chart.yAxis[0].max = 100;
                    }
                    else{
                        chart.yAxis[0].setTitle({text: "Count"});
                    }   
                    this.charts[id]=chart;
                    console.log(chart);
    }
    getChart(id: string) {
            this.chartDataService.getChart(id).subscribe(series => {
                    var titleName = series.name,index;
                    this.chartInit(id);
                    this.drilldowns[id]=[];
                    this.drilldowns[id].push("All");
                    for(var i =0; i <series.length;i++)
                        this.charts[id].addSeries(series[i]);
                        
        });
    }
    updateChart(id: string) {
        this.chartDataService.getChart(id).subscribe(series => {
            this.drilldowns[id]=[];
            var chart = this.charts[id];
            while(chart.series.length > 0)
                chart.series[0].remove(true);
            this.drilldowns[id].push("All");
            for(var i =0; i <series.length;i++)
                chart.addSeries(series[i]);
        });
    }
    ngOnInit() {
        this.drilldownsAdded = 0;
        this.getChart("inscan");
        this.getChart("inscan_percent");
        this.getChart("inscan_booked_count");
}
}
