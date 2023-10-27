import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { UserComponent } from './user/user.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactUsComponent,canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent }, // Add a login component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
