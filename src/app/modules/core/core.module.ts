import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import {StripeService} from './services/stripe.service';
import {UserService} from './services/user.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './guards/auth.guard';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AmplifyAngularModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [AmplifyService, StripeService, UserService, AuthGuard],
  exports: [
    AmplifyAngularModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CoreModule {}
