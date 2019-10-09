import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './pages/profile/profile.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LinkedComponent} from './pages/linked/linked.component';
import {WebhooksComponent} from './pages/webhooks/webhooks.component';
import {BillingComponent} from './pages/billing/billing.component';
import {AuthGuard} from '../core/guards/auth.guard';
import {LogoutComponent} from './pages/logout/logout.component';

const routes: Routes = [
  { path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
  path: 'dashboard',
  component: DashboardComponent,
    canActivateChild: [AuthGuard],
  children: [
    {
      path: 'billing',
      component: BillingComponent,
      outlet: 'under'
    },    {
      path: 'linked',
      component: LinkedComponent,
      outlet: 'under'
    },{
      path: 'webhooks',
      component: WebhooksComponent,
      outlet: 'under'
    },{
      path: 'logout',
      component: LogoutComponent,
      outlet: 'under'
    }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
