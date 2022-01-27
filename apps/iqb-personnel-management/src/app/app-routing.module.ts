import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuardService } from './authentication/authentication-guard.service';
import { LoginComponent } from './authentication/login/login.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { UserComponent } from './user/user.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/personnel', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'personnel',
    component: PersonnelComponent,
    canActivate: [AuthenticationGuardService],
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [AuthenticationGuardService],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
