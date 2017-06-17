import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/primeng';
import { AuthenticationService } from '../shared/guard/authentication.service';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    MessagesModule

  ],
  declarations: [LoginComponent],
  providers: [AuthenticationService]
})
export class LoginModule { }
