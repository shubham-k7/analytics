import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
// -----Providers-----
import { ChartDataService } from './chart-data.service';
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
	
	public getChartData(event: any,chartid: string): void {
		var comp=this,t;
		var x = chartid.split('-').slice(0,2);
		var kpi_name = x[0];
		var version_id = x[1];
		t = this.kpilist[kpi_name][chartid]._drilldowns.length;
		var list = this.kpilist[kpi_name][chartid]._drilldowns.slice(1,t+1);
		list.push(event.point.name);
		// PAYLOAD for charts, name is a list of filters for charts
		var payload = {name: list,
					series_name: event.point.series.name,
					report_type: t.toString(),
					chartName: chartid,
					version_ids: [version_id],
					kpi_id: kpi_name};
		this.chartDataService.getChartData(payload).subscribe(series => {
			var chart;
			chart = comp.kpilist[payload.kpi_id][chartid]._chart;
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
					comp.kpilist[payload.kpi_id][chartid]._drilldowns.push(payload.name.slice(-1)[0]);
				}
				// console.log(comp.drilldowns);
			}
		},
		(err) => {
			alert(err);
			this.kpilist[payload.kpi_id][payload.chartName]._chart.hideLoading();
		});
	}
	chartInit(kpi_name: string,conf: any): string{
		var comp = this;        // Do NOT REMOVE this. It's used inside chart confs
		var data = eval('(' + conf + ')')
		this.kpilist[kpi_name][data.chart.name] = {	_chart:  null,
													_drilldowns: ['All'],
													_selectedvalue: null,
													_maxDate: null,
													_mon: null,
													_sDate: null,
													_eDate: null,
													_divisions: null,
													_filteredDivisions: null
												}
		console.log(this.kpilist);
		var chart = new Highcharts.Chart(data);
		this.kpilist[kpi_name][data.chart.name]._chart = chart;
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
	
	getChart(id: string) {
		var df;
		var kpi_name = id.split('-')[0];
		if(this.kpilist[kpi_name][id]._selectedvalue && this.kpilist[kpi_name][id]._selectedvalue.id===1){
			df = {dftype: this.kpilist[kpi_name][id]._selectedvalue.id,d1: new Date(this.kpilist[kpi_name][id]._mon).toLocaleDateString('en-IN').split('/').splice(1).toString()};
		}
		else if(this.kpilist[kpi_name][id]._selectedvalue && this.kpilist[kpi_name][id]._selectedvalue.id===2){
			var d1 = new Date(this.kpilist[kpi_name][id]._sDate).toLocaleDateString('en-IN');
			var d2 = new Date(this.kpilist[kpi_name][id]._eDate).toLocaleDateString('en-IN');
			df = {dftype: this.kpilist[kpi_name][id]._selectedvalue.id,d1: d1,d2: d2};
		}
		else df = null;
		var chartConfigs = this.kpilist[kpi_name][id],
		chart = chartConfigs._chart;
		chart.showLoading("Fetching Data...");
		var check = null;
		if(chart.insertedTable && chart.insertedTableID)
			check = chart.insertedTableID;
		var payload;
		// var payload = {kpi_id: kpi_name,version_ids: [x[1]],report_type: "0",name: [],series_name: "",datef: (df)?df:null}
		this.chartDataService.getChart(payload).subscribe(data => {
			var kpi_name = id.split('-')[0];
			var series = data[0].data;
			var chartid = this.chartInit(kpi_name,data[0].conf);
			var chart = this.kpilist[kpi_name][chartid]._chart;
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
	check(event: any) {
		console.log(event);
	}
	getCharts(kpi: any) {
		this.chartDataService.getCharts(kpi).subscribe(data => {
			// for each chart in data, Init chart, add Mapping to chart, add series to chart
			for(var chart of data){
				var chartid = this.chartInit(kpi.kpi_name,chart.conf);
				for(var i =0; i<chart.data.length;i++){
					this.kpilist[kpi.kpi_name][chartid]._chart.addSeries(chart.data[i]);
				}
			}
			// console.log(this.kpilist);
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
			// for each kpi, create kpilist map, getCharts for each KPI. filter charts on kpi.version
			for(var kpi of kpis){
				this.getCharts(kpi);
				this.kpilist[kpi.kpi_name] = new Map<string,any>();
		   }
		},
		(err)=>{
			alert(err);
		});
	}
	
	filterDivisions(event,kpi_name: string,version: string) {
		var chartid = kpi_name+'-'+version,
			query = event.query,
			filtered : any[] = [];
		console.log(query);
		/*this.chartFilterService.getFilteredResults(query).subscribe(filtered => {
			this.filteredDivisions = filtered;
		},
		(err) => {
			alert(err);
		});*/
		for(let i = 0; i < this.division.length; i++) {
            let country = this.division[i];
            if(country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        this.kpilist[kpi_name][chartid]._filteredDivisions = filtered;
	}
	division = [{name: "India", type: "Country"},
				 {name: "East", type: "Zone"},
				 {name: "Assam", type: "State"},
				 {name: "Guwahati", type: "City"},
				 {name: "GUW", type: "DC"}]
	selection(event,chartid: string) {
		if(event.id===0){
			var kpi_name = chartid.split('-')[0];
			this.kpilist[kpi_name][chartid]._mon = null;
			this.kpilist[kpi_name][chartid]._sDate = null;
			this.kpilist[kpi_name][chartid]._eDate = null;
			this.kpilist[kpi_name][chartid]._maxDate = null;
			this.getChart(chartid);
		}
	}
	update(event,chartid: string) {
		console.log(event);
		this.getChart(chartid);
	}
	setMaxDate(id: string) {
		var kpi_name = id.split('-')[0];
		var temp_date = this.kpilist[kpi_name][id]._sDate;
		var temp = new Date(temp_date);
		temp.setDate(temp.getDate() + 31);
		this.kpilist[kpi_name][id]._maxDate = temp;
	}
	// getPayload(chartid)
	options = [
		{id: 0, value: 'Default'},
		{id: 1, value: 'Month'},
		{id: 2, value: 'Range'}
	];
	kpis: any;
	drilldownsAdded = 0;
	kpilist: Map<string,any> = new Map();
	ngOnInit() {
		this.drilldownsAdded = 0;
		this.getKPIs();
	}
}
