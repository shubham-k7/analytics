import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';
import { ChartModule} from 'angular2-highcharts';
import { ChartComponent} from 'angular2-highcharts';

declare var require: any;

// import {ChartModule} from "angular2-highcharts";

export function highchartsFactory() {
  return require('highcharts');
}
// import { HighCharts, CHART_DIRECTIVES } from 'angular2-highcharts';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { PageHeaderModule } from '../../shared';
import { ChartDataService } from '../../shared/services/chart-data.service';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
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
