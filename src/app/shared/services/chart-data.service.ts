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
        return body || { };
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
        // var url = '../../../assets/files/' + name + '.json';
        let headers = new Headers({'content-type': 'application/json'});
        headers.append('Authorization', 'Token 6a408c2bc8db8c8dc151a6390ab631f3c1931f6f');
        let options = new RequestOptions({ headers: headers});
        return this.http.post('http://52.70.207.115:8087/api/v1/inscan/report/', JSON.stringify({ report_type: name}),options).map(this.extractData).catch(this.handleError);
    }

    getChartData(name: string): Observable<any> {
        var url = '../../../assets/files/' + name + '.json';
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

}
