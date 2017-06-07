import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class ChartDataService {
    public chartData: any;
    constructor(private http: Http){   }
    
    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    getChart(name: string): Observable<any> {
        var url = '../../../assets/files/' + name + '.json';
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

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