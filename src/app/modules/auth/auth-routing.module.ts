import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './pages/auth/auth.component';
import {SignupComponent} from './pages/signup/signup.component';
import {CodeComponent} from './pages/code/code.component';
import {ResetComponent} from './pages/reset/reset.component';
import {SigninComponent} from './pages/signin/signin.component';


const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'code',
    component: CodeComponent
  },
  {
    path: 'reset',
    component: ResetComponent
  },
  { path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class AuthRoutingModule { }
