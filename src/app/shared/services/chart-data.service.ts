import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
@Injectable()
export class ChartDataService {
    public chartData: any;
    constructor(private http: Http){   }
    
    getChartData(name: string): Observable<any> {
        var url = '../../../assets/files/' + name + '.json';
        return this.http.get(url).map((res: Response) => {
            // console.log(res.json());
            return res.json()
        });

      /*  return this.http.get("https://jsonplaceholder.typicode.com/posts").map((res: Response) => {
            // console.log("inside data service");
            // console.log(res.json());
            this.chartData = res.json();
            // console.log(this.chartData);
            return this.options;
        });*/
    }
}