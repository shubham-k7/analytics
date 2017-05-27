import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class LoginAuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        // return true;
        // user: 
        if (localStorage.getItem('currentUser')) {
            return true;
        }

        this.router.navigate([' ']);
        return false;
    }
}
