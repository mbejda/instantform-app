import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {MaterialModule} from '../material/material.module';
import {CoreModule} from '../core/core.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LinkedComponent } from './pages/linked/linked.component';
import { WebhooksComponent } from './pages/webhooks/webhooks.component';
import { AddComponent } from './pages/linked/add/add.component';
import { BillingComponent } from './pages/billing/billing.component';
import { LogoutComponent } from './pages/logout/logout.component';


@NgModule({
  declarations: [ProfileComponent, DashboardComponent, CheckoutComponent, CheckoutComponent, LinkedComponent, WebhooksComponent, AddComponent, BillingComponent, LogoutComponent],
  imports: [
    FlexLayoutModule,
    CoreModule,
    MaterialModule,
    CommonModule,
    DashboardRoutingModule
  ],
  entryComponents: [AddComponent]

})
export class DashboardModule { }
