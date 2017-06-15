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
        console.log(body);
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
    getKPIs(): Observable<any> {
        var url = 'http://52.70.207.115:8087/api/v1/kpi/';
        let headers = new Headers({'content-type': 'application/json'});
        headers.append('Authorization', 'Token 6a408c2bc8db8c8dc151a6390ab631f3c1931f6f');
        let options = new RequestOptions({ headers: headers});
        return this.http.get(url,options).map(this.extractData).catch(this.handleError);
    }
    getCharts(kpi: any): Observable<any> {
        var url = 'http://52.70.207.115:8087/api/v1/inscan/report/';
        let headers = new Headers({'content-type': 'application/json'});
        headers.append('Authorization', 'Token 6a408c2bc8db8c8dc151a6390ab631f3c1931f6f');
        let options = new RequestOptions({ headers: headers});
        var payload = JSON.stringify({kpi_id: kpi.kpi_name,version_ids: kpi.versions,report_type: "0",name: [],series_name: ""});
        console.log(payload);
        return this.http.post(url,payload,options).map(this.extractData).catch(this.handleError);
        
    }
    getChart(id: string): Observable<any> {
        var url = 'http://52.70.207.115:8087/api/v1/inscan/report/';
        let headers = new Headers({'content-type': 'application/json'});
        headers.append('Authorization', 'Token 6a408c2bc8db8c8dc151a6390ab631f3c1931f6f');
        let options = new RequestOptions({ headers: headers});
        var kpi_name = id.split('-')[0];
        var versions = id.split('-')[1];
        var payload = JSON.stringify({kpi_id: kpi_name,version_ids: [versions],report_type: "0",name: [],series_name: ""});
        return this.http.post(url,payload,options).map(this.extractData).catch(this.handleError);
    }

    getChartData(temp: any): Observable<any> {
        // console.log(temp);
        var url = 'http://52.70.207.115:8087/api/v1/inscan/report/';
        let headers = new Headers({'content-type': 'application/json'});
        headers.append('Authorization', 'Token 6a408c2bc8db8c8dc151a6390ab631f3c1931f6f');
        let options = new RequestOptions({ headers: headers});
        console.log(JSON.stringify(temp));
        return this.http.post(url, JSON.stringify(temp),options).map(this.extractData).catch(this.handleError);
    }

}
