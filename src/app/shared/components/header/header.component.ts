import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { AuthenticationService } from '../../guard/authentication.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    user: any;
    first_name: String;
    constructor(public router: Router,private translate: TranslateService,
                private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.user = sessionStorage.getItem('currentUser');
        var obj = JSON.parse(this.user);
        this.first_name = obj["data"]["first_name"];
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    logout() {
        this.authenticationService.logout();
        // this.router.navigate(['']);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
