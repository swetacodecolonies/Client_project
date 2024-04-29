import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './shared/component/layout/content/content.component';
import { dashData } from './shared/routes/routes';
import { FullComponent } from './shared/component/layout/full/full.component';
import { fullRoutes } from './shared/routes/full-routes';
import { AdminGuard } from './shared/guard/admin.guard';
import { LoginComponent } from './auth/login/login.component';
import { TalentRegistrationComponent } from './auth/talent-registration/talent-registration.component';
import { VerifyAccountComponent } from './auth/verify-account/verify-account.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/default',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  
  {
    path: 'verify-account',
    component: VerifyAccountComponent
  },
  {
    path: 'auth/talent-registration',
    component: TalentRegistrationComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    component: ChangePasswordComponent
  },
  {
    path: '',
    component: ContentComponent,
    children: dashData,
    canActivate: [AdminGuard],
  },
  {
    path: '',
    component: FullComponent,
    children: fullRoutes,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
