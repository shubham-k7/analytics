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
            var list = this.drilldowns[kpi_name][chartName].slice(1,t+1);
            list.push(event.point.name);
            // console.log(list);
            var temp = {name: list,
                        series_name: event.point.series.name,
                        report_type: t.toString(),
                        chartName: chartName,
                        version_ids: [abc],
                        kpi_id: kpi_name};
            // console.log(temp);
            this.chartDataService.getChartData(temp).subscribe(series => {
                    var chart;
                    chart = comp.kpilist[temp.kpi_id][chartName];
                    chart.hideLoading();
                    if(event.points)
                    {
                        chart.addSingleSeriesAsDrilldown(event.point,series[0]);
                        comp.drilldownsAdded++;
                        if(comp.drilldownsAdded===event.points.length) {
                            // var n = temp.name.split('_');
                            // console.log(temp.name);`
                            comp.drilldownsAdded=0;
                            chart.applyDrilldown();
                            comp.drilldowns[temp.kpi_id][chartName].push(temp.name.slice(-1)[0]);
                        }
                    }
                    else{
                        chart.addSingleSeriesAsDrilldown(event.point,series[0]);
                        chart.applyDrilldown();
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
        // console.log(data);
        var chart = new Highcharts.Chart(data);
        // chart.
        this.kpilist[kpi_name][data.chart.name]=chart;
        return data.chart.name;
    }
    getChart(id: string) {
            var kpi_name = id.split('-')[0]; 
            this.kpilist[kpi_name][id].showLoading("Fetching Data...")
            this.chartDataService.getChart(id).subscribe(data => {
                    var kpi_name = id.split('-')[0];
                    var series = data[0].data;
                    var chartid = this.chartInit(kpi_name,data[0].conf);
                    this.drilldowns[kpi_name][chartid]=[];
                    this.drilldowns[kpi_name][chartid].push("All");
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
                    this.kpilist[kpi.kpi_name][chartid].addSeries(chart.data[i]);
                }
            }
            // console.log(this.kpilist);
            // console.log(this.drilldowns);
        });
    }
    
    getKPIs() {
        this.chartDataService.getKPIs().subscribe(res => {
            var kpis = res['data'],name;
            for(var kpi of kpis){
                name=kpi.kpi_name;
                this.kpilist[name] = kpi.versions;
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
