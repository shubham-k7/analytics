import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    constructor(public router: Router) { 
    }

    ngOnInit() {
        // console.log("hahah");
        if (this.router.url === '') {
            this.router.navigate(['/dashboard']);
        }
    }

}
