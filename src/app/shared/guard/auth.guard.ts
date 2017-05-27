import { Injectable } from '@angular/core';
import { CanActivate,CanDeactivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanDeactivate<boolean>{

    constructor(private router: Router) { }

    canActivate() {
        // return true;
        // user: 
        if (localStorage.getItem('currentUser')) {
            return true;
        }

        this.router.navigate(['']);
        return false;
    }

    canDeactivate() {
        // console.log("reached CanDeactivate");
        if (localStorage.getItem('currentUser')) {
            this.router.navigate['/dashboard'];
            console.log("reached if");
            // this.router.navigate(['/dashboard']);
            return true;
        }
        console.log("reached false");
        return false;
    }
}
