import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    // hcm(hc);
    dd(hc);
    return hc;
}

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { PageHeaderModule } from '../../shared';
import { ChartDataService } from '../../shared/services/chart-data.service';

@NgModule({
    imports: [
        CommonModule,
        ChartsRoutingModule,
        PageHeaderModule,
        ChartModule
    ],
    declarations: [ChartsComponent],
    providers: [ChartDataService,{
        provide: HighchartsStatic,
        useFactory: highchartsFactory
    }]
})
export class ChartsModule { }
