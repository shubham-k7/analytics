import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AuthenticationService } from '../shared/guard/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    model: any  = {};
    error = '';
    // error: string;
    constructor(public router: Router,
                private authenticationService: AuthenticationService) { }

    ngOnInit() { this.error='';}

    login() {
        console.log(this.model.username);
        console.log(this.model.password);
        this.authenticationService.login(this.model.username,this.model.password)
            .subscribe(result => {
                    if(result===true){
                        console.log("Logged IN");
                        this.router.navigate(['/dashboard']);
                    }
                    else
                    {
                        console.log("Not valid authentication");
                        this.error="Invalid Credentials";
                        // console.log(this.error) 
                    }
                },
                 (err) => {
                    this.error="Invalid Credentials.";
                 });
        
        // localStorage.setItem('isLoggedin', 'true');
    }

}
