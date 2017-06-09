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
    /*public addPoint() {
        this.zone.runOutsideAngular(() => {
        location.reload();
});

    
    }
*/
    drilldownsAdded = 0;
    public getChartData(event: any,chartName: string): void {
            // var arg = name;
            // console.log(this.drilldowns.length);
            var comp=this;
            var t,co;
            if(chartName==='inscan'){
                co = this.charts[0];
                t = this.drilldowns.length;
            }
            else if(chartName==='inscan_percent'){
                co = this.charts[1];
                t=this.drilldowns2.length;
            }
            else{
                co = this.charts[2];
                t = this.drilldowns3.length;
            }

            // console.log(arg);
            var temp = {name: event.point.id,report_type: t,chartName: chartName}
            console.log(temp);
            // let chart = this.charts[0];
            this.chartDataService.getChartData(temp).subscribe(series => {
                    // console.log(series);
                    // console.log(temp);
                    var chart;
                    if(chartName==="inscan"){
                        chart = comp.charts[0];
                        chart.hideLoading();                        
                        chart.addSeriesAsDrilldown(event.point,series);
                        // chart.hideLoading();
                    }
                    else if(chartName==='inscan_percent'){
                        chart = comp.charts[1];
                        chart.hideLoading();                                                
                        chart.addSeriesAsDrilldown(event.point,series);
                    }
                    else if(event.points){
                        chart = comp.charts[2];
                        chart.hideLoading();             
                        // console.log(arg.series.name);
                        console.log(series);
                        chart.addSingleSeriesAsDrilldown(event.point,series[0]);
                        comp.drilldownsAdded++;
                        if(comp.drilldownsAdded===event.points.length){
                            comp.drilldownsAdded=0;
                            chart.applyDrilldown();
                        }
                    }
                    else
                    {
                        console.log(event.point)
                        console.log(series[0]);
                        chart = comp.charts[2];
                        chart.hideLoading();                                                
                        chart.addSeriesAsDrilldown(event.point,series[0]);

                    }





                        // chart.redraw();
                        // if(chart.events.drilldownchart.applyDrilldown();
                        // if(chart.dri)
                        // chart.addSingleSeriesAsDrilldown(arg,series);                     
                        // chart.applyDrilldown();
                    // console.log(arg);
                    
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
    drilldowns3 = [];
    chartInit(name: string): number {
        var comp = this;
        console.log(name); 
        var chart = new Highcharts.Chart({
                            chart: {
                                name: name,
                                type: 'column',
                                renderTo: name,
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
                                }
                                ,
                                events: {
                                    drilldown: function (e) {
                                        if (!e.seriesOptions) {
                                                var chart = this;
                                                chart.showLoading('Fetching Data ...');
                                                var chartName = this.pointer.options.chart.name;
                                                // console.log(this.pointer.options.chart.name); 
                                                console.log(e);
                                                console.log(e.points);
                                                if(chartName==='inscan') 
                                                    comp.drilldowns.push(e.point.name);
                                                else if(chartName==='inscan_percent')
                                                    comp.drilldowns2.push(e.point.name);
                                                else if(e.points){
                                                    console.log(e.points[0].name);
                                                        if(comp.drilldowns3.indexOf(e.points[0].name)<0)
                                                            comp.drilldowns3.push(e.points[0].name);
                                                }
                                                else
                                                    comp.drilldowns3.push(e.point.name);
                                                comp.getChartData(e,chartName);

                                                    // if(e.points){
                                                        // comp.drilldowns3.pop();
                                                    // }
                                                // else
                                                    // comp.getChartData(e.point,chartName);
                                                // console.log(e.point);
                                        }
                                    },
                                    drillup: function(e) {
                                        console.log(e);
                                        var chartName = this.pointer.options.chart.name;
                                        console.log(chartName);
                                        if(chartName==='inscan')
                                            comp.drilldowns.pop();
                                        else if(chartName==='inscan_percent')
                                            comp.drilldowns2.pop();
                                        else{
                                            console.log(e.seriesOptions);
                                            // if(comp.drilldowns3.indexOf(e.series.option)>0)
                                                 comp.drilldowns3.pop();
                                                            // comp.drilldowns3.push(e.points[0].name);

                                        }
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
                                enabled: true
                            },
                            plotOptions: {
                                series: {
                                    borderWidth: 0,
                                    dataLabels: {
                                        enabled: true,
                                        format: '{point.y}'
                                    }
                                }
                            },
                            series: [],
                            drilldown: {
                                allowPointDrilldown: true,
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
                    if(name==='inscan'){
                        chart.yAxis[0].setTitle({text: "Time Difference(Mins)"});
                    }
                    else if(name==='inscan_percent'){
                        chart.options.plotOptions.series.dataLabels.format = '{point.y}%';
                        chart.yAxis[0].setTitle({text: "Percentage"});
                        // console.log(chart.yAxis[0]);
                        chart.yAxis[0].min = 0;
                        chart.yAxis[0].max = 100;
                    }
                    else{
                        chart.yAxis[0].setTitle({text: "Count"});
                        // chart.drilldown.allowPointDrilldown = false;
                    }

                        
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
                            this.drilldowns.push("All");
                            this.charts[index].addSeries(series);
                        }
                        else if(name==="inscan_percent"){
                            index=1;
                            this.drilldowns2.push("All");
                            this.charts[index].addSeries(series);                                
                        }
                        else{
                            index=2;
                            this.drilldowns3.push("All");
                            // this.charts[index].series[0].setData(series[0]);
                            // this.charts[index].series[0].setData(series[0]);
                            
                            this.charts[index].addSeries(series[0]);
                            this.charts[index].addSeries(series[1]);
                        }
                        // for(series.length){

                        // }
                        // this.charts[index].series[0].setData(series[0]);
                        
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
        this.createChart("inscan_booked_count");
}
}
