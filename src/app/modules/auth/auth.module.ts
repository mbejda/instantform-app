import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './pages/auth/auth.component';
import {CoreModule} from '../core/core.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ResetComponent } from './pages/reset/reset.component';
import { CodeComponent } from './pages/code/code.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AuthComponent, SigninComponent, SignupComponent, ResetComponent, CodeComponent],
  imports: [
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
