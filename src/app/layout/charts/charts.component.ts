import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
// -----Providers-----
import { ChartDataService } from '../../shared/services/chart-data.service';
import { ChartFilterService } from './chart-filter.service';
// -----Highcharts Imports-----
declare var require: any;
import { ChartComponent } from 'angular2-highcharts';
var Highcharts = require('highcharts/highcharts');
var HighchartsMore = require('highcharts/highcharts-more');
var HighchartsDrilldown = require('highcharts/modules/drilldown');
var HighchartsExporting = require('highcharts/modules/exporting.src');
var HighchartsExportData = require('highcharts/modules/export-data.src');
HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);
// -----MaterialDesign Imports-----
import { DateAdapter } from '@angular/material';
import { DateLocale } from 'md2';
import { Month } from '../../../assets/i18n/month';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
 
    constructor(private chartDataService: ChartDataService, 
    private myDate: DateLocale,
    private chartFilterService: ChartFilterService){
        this.myDate.months = Month;
    }

    filterDivisions(event) {
        let query = event.query;
        console.log(query);
        let filtered : any[] = [];
        this.chartFilterService.getFilteredResults(query).subscribe(filtered => {
            this.filteredDivisions = filtered;
        },
        (err) => {
            alert(err);
        });
    }
    filteredDivisions: any;
    division = [{name: "India", type: "Country"},
                 {name: "East", type: "Zone"},
                 {name: "Assam", type: "State"},
                 {name: "Guwahati", type: "City"},
                 {name: "GUW", type: "DC"}]
    public getChartData(event: any,chartName: string): void {
            var comp=this,t;
            var x = chartName.split('-').slice(0,2);
            var kpi_name = x[0];
            var abc = x[1];
            t = this.drilldowns[kpi_name][chartName].length;
            var list = this.drilldowns[kpi_name][chartName].slice(1,t+1);
            list.push(event.point.name);
            // PAYLOAD for charts, name is a list of filters for charts
            var payload = {name: list,
                        series_name: event.point.series.name,
                        report_type: t.toString(),
                        chartName: chartName,
                        version_ids: [abc],
                        kpi_id: kpi_name};
            this.chartDataService.getChartData(payload).subscribe(series => {
                var chart;
                chart = comp.kpilist[payload.kpi_id][chartName];
                chart.hideLoading();
                if(event.points)
                {
                    chart.addSingleSeriesAsDrilldown(event.point,series[0]);
                    comp.drilldownsAdded++;
                    if(comp.drilldownsAdded===event.points.length) {
                        comp.drilldownsAdded=0;
                        chart.applyDrilldown();
                        if(chart.insertedTable)
                            chart.viewData();
                        comp.drilldowns[payload.kpi_id][chartName].push(payload.name.slice(-1)[0]);
                    }
                    console.log(comp.drilldowns);
                }
            },
            (err) => {
                alert(err);
                this.kpilist[payload.kpi_id][payload.chartName].hideLoading();
        }
        );
    }
    chartInit(kpi_name: string,conf: any): string{
        var comp = this;        // Do NOT REMOVE this. It's used inside chart confs
        var data = eval('(' + conf + ')')
        var chart = new Highcharts.Chart(data);
        this.kpilist[kpi_name][data.chart.name]=chart;
        chart.options.drilldown.activeDataLabelStyle = { "cursor": "pointer", "color": "#003399", "fontWeight": "bold", "textDecoration": "!none","text-transform": "uppercase" };
        chart.options.drilldown.activeAxisLabelStyle = { "cursor": "pointer", "color": "#003399", "fontWeight": "bold", "textDecoration": "!none","text-transform": "uppercase" };
        chart.options.drilldown.drillUpButton = {
                relativeTo: 'chart',
                position: {
                    align: "right",
                    y: 6,
                    x: -50
                },
                theme: {
                    fill: 'white',
                    'stroke-width': 1,
                    stroke: 'silver',
                    opacity: 0.5,
                    r: 0,
                    states: {
                        hover: {
                            fill: '#41739D',
                            style: {
                                color: "white"
                            },
                            opacity: 1
                        },
                        select: {
                            stroke: '#039',
                            fill: '#bada55'
                        }
                    }
                }
            };
        return data.chart.name;
    }
    update(event) {
        console.log(event);
        // getChart(event.id.split('-')[2]
    }
    setMaxDate() {
        var temp = new Date(this.sDate);
        temp.setDate(temp.getDate() + 31);
        this._maxDate = temp;
    }
    getChart(id: string) {
        var df;
        if(this.selectedvalue && this.selectedvalue.id===1){
            df = {dftype: this.selectedvalue.id,d1: new Date(this.mon).toLocaleDateString('en-IN').split('/').splice(1).toString()};
        }
        else if(this.selectedvalue && this.selectedvalue.id===2){
            var d1 = new Date(this.sDate).toLocaleDateString('en-IN');
            var d2 = new Date(this.eDate).toLocaleDateString('en-IN');
            df = {dftype: this.selectedvalue.id,d1: d1,d2: d2};
        }
        else df = null;
        var kpi_name = id.split('-')[0]; 
        var chart = this.kpilist[kpi_name][id]; 
        chart.showLoading("Fetching Data...")
        var check = null;
        if(chart.insertedTable && chart.insertedTableID)
            check = chart.insertedTableID;
        this.chartDataService.getChart(id,df).subscribe(data => {
            var kpi_name = id.split('-')[0];
            var series = data[0].data;
            var chartid = this.chartInit(kpi_name,data[0].conf);
            this.drilldowns[kpi_name][chartid]=[];
            this.drilldowns[kpi_name][chartid].push("All");
            var chart = this.kpilist[kpi_name][chartid];
            for(var i =0; i <series.length;i++)
                chart.addSeries(series[i]);
            if(check){
                chart.insertedTable=true;
                chart.insertedTableID = check;
                chart.hideData();
                chart.viewData();
            }
        },
        (err) => {
            alert(err);
        }
        );
    }
    
    getCharts(kpi: any) {
        this.chartDataService.getCharts(kpi).subscribe(data => {
            var chartid;
            // for each chart in data, Init chart, add Mappings to chart, add series to chart
            for(var chart of data){
                chartid = this.chartInit(kpi.kpi_name,chart.conf);
                this.drilldowns[kpi.kpi_name][chartid]=[];
                this.drilldowns[kpi.kpi_name][chartid].push("All");
                this.filter[kpi.kpi_name][chartid] = '';
                // this.mon.push(null);
                for(var i =0; i<chart.data.length;i++){
                    this.kpilist[kpi.kpi_name][chartid].addSeries(chart.data[i]);
                }
            }
            // console.log(this.kpilist);
            // console.log(this.drilldowns);
        },
        (err) => {
            alert(err);
        });
    }
    
    getKPIs() {
        this.chartDataService.getKPIs().subscribe(res => {
            var kpis = res['data'],name;
            this.kpis = kpis;
            console.log(kpis);
            // for each kpi, create kpilist map, getCharts for each KPI. filter charts on kpi.version(Chartlists)
            for(var kpi of kpis){
                name=kpi.kpi_name;
                this.getCharts(kpi);
                this.kpilist[kpi.kpi_name] = new Map<string,any>();
                this.drilldowns[kpi.kpi_name] = new Map<string,string[]>();
                this.filter[kpi.kpi_name] = new Map<string,string>();
           }
        },
        (err)=>{
            alert(err);
        });
    }
    selectedvalue: any;
    options = [
        {id: 0, value: 'Default'},
        {id: 1, value: 'Month'},
        {id: 2, value: 'Range'}
    ];
    picker: null;
    mon: Date;
    kpis: any;
    _maxDate: Date;
    sDate: Date;
    eDate: Date;
    drilldownsAdded = 0;
    kpilist: Map<string,any> = new Map();
    drilldowns: Map<string,any> = new Map();
    filter: Map<string,any> = new Map();

    selection(event,chartid: string) {
        if(event.id===0){
            delete this.mon;
            delete this.sDate;
            delete this.eDate;
            this.getChart(chartid);
        }
    }
    ngOnInit() {
        this.drilldownsAdded = 0;
        this.getKPIs();
    }
}
