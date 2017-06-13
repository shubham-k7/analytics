import { Component, OnInit } from '@angular/core';
import { ChartComponent } from 'angular2-highcharts';
import { Observable } from 'rxjs/Rx';

import { ChartDataService } from '../../shared/services/chart-data.service';

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
            var kpi_name = chartName.split('-')[0];
            var abc = chartName.split('-')[1];
            t = this.drilldowns[kpi_name][chartName].length;
            var temp = {name: event.point.id,
                        report_type: t+1,
                        chartName: chartName,
                        version_ids: [abc],
                        kpi_id: kpi_name};
            console.log(temp);
            this.chartDataService.getChartData(temp).subscribe(series => {
                    var chart;
                    chart = comp.kpilist[temp.kpi_id][chartName];
                    chart.hideLoading();
                    if(event.points)
                    {
                        chart.addSingleSeriesAsDrilldown(event.point,series[0]);
                        comp.drilldownsAdded++;
                        if(comp.drilldownsAdded===event.points.length) {
                            var n = temp.name.split('_');
                            comp.drilldownsAdded=0;
                            chart.applyDrilldown();
                            comp.drilldowns[temp.kpi_id][chartName].push(n[0]);
                        }
                    }
                    else{
                        chart.addSingleSeriesAsDrilldown(event.point,series[0]);
                        chart.applyDrilldown();
                        // //console.log(chartName);
                        //console.log(comp.drilldowns);
                        //console.log(event);
                        comp.drilldowns[temp.kpi_id][chartName].push(event.point.name);
                    }
            },
            (err) => {
                //console.log("ERROR occured");
                this.kpilist[temp.kpi_id][temp.chartName].hideLoading();
            }
        );
    }
    kpilist: Map<string,any> = new Map();
    charts: Map<string,any> = new Map();
    drilldowns: Map<string,any> = new Map();
    filter: Map<string,any> = new Map();
    chartInit(kpi_name: string,conf: any): string{
        var comp = this;
        var data = eval('(' + conf + ')')
        console.log(data);
        var chart = new Highcharts.Chart(data);
        this.kpilist[kpi_name][data.chart.name]=chart;
        return data.chart.name;
    }
    getChart(id: string) {
            this.chartDataService.getChart(id).subscribe(series => {
                    var kpi_name = id.split('-')[0];
                    var confs = this.kpilist[kpi_name][id].options;
                    this.chartInit(kpi_name,confs);
                    this.drilldowns[kpi_name][id]=[];
                    this.drilldowns[kpi_name][id].push("All");
                    for(var i =0; i <series.length;i++)
                        this.kpilist[kpi_name][id].addSeries(series[i]);
        });
    }
    getCharts(kpi: any) {
        this.chartDataService.getCharts(kpi).subscribe(data => {
            var chartid;
            for(var chart of data){
                chartid = this.chartInit(kpi.kpi_name,chart.conf);
                this.drilldowns[kpi.kpi_name][chartid]=[];
                this.drilldowns[kpi.kpi_name][chartid].push("All");
                this.filter[kpi.kpi_name][chartid] = '';
                for(var i =0; i<chart.data.length;i++){
                    console.log(chart.data[i]);
                    this.kpilist[kpi.kpi_name][chartid].addSeries(chart.data[i]);
                }
            }
            console.log(this.kpilist);
            console.log(this.drilldowns);
        });
    }
    
    getKPIs() {
        this.chartDataService.getKPIs().subscribe(res => {
            var kpis = res['data'],name;
            for(var kpi of kpis){
                name=kpi.kpi_name;
                this.kpilist[name] = kpi.versions;
                console.log(kpi);
                this.getCharts(kpi);
                this.kpilist[kpi.kpi_name] = new Map<string,any>();
                this.drilldowns[kpi.kpi_name] = new Map<string,string[]>();
                this.filter[kpi.kpi_name] = new Map<string,string>();
           }
           
        });
    }
    ngOnInit() {
        
        this.drilldownsAdded = 0;
        this.getKPIs();
        /*this.getChart("inscan");
        this.getChart("inscan_percent");
        this.getChart("inscan_booked_count");*/
}
}
