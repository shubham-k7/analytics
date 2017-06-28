import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';
import { ChartModule} from 'angular2-highcharts';
import { ChartComponent} from 'angular2-highcharts';
import * as highcharts from 'highcharts';

// import { CHART_DIRECTIVES } from 'angular2-highcharts';
declare var require: any;

export function highchartsFactory() {
    const hc = require('highcharts');
    const hcm = require('highcharts/highcharts-more');
    const dd = require('highcharts/modules/drilldown');
    const hce = require('highcharts/modules/exporting');
    const hced = require('highcharts/modules/export-data.src');
    hcm(hc);
    dd(hc);
    hce(hc);
    hced(hc);
    return hc;
}
// import {MultiSelectModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/components/autocomplete/autocomplete';
import { GrowlModule } from 'primeng/components/growl/growl';
import { BreadcrumbModule } from 'primeng/primeng';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { PageHeaderModule } from '../../shared';
import { ChartDataService } from '../../shared/services/chart-data.service';
import { MdSelectModule } from '@angular/material';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import {MdDatepickerModule,MdNativeDateModule, MdInputModule} from '@angular/material';
import { Md2Module } from 'md2';

@NgModule({
    imports: [
        CommonModule,
        ChartsRoutingModule,
        PageHeaderModule,
        FormsModule,
        ChartModule,
        AutoCompleteModule,
        GrowlModule,
        BreadcrumbModule,
        MdSelectModule,
        CalendarModule,
        MdDatepickerModule,
        MdNativeDateModule,
        MdInputModule,
        Md2Module,
    ],
    declarations: [ChartsComponent],
    providers: [ChartDataService,{
        provide: HighchartsStatic,
        useFactory: highchartsFactory
    }]
})
export class ChartsModule { }
