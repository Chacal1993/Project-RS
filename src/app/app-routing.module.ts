import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditNewComponent } from './components/edit-new/edit-new.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

let routes: Routes;

if (JSON.parse(localStorage.getItem('user')) !== null) {
  routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent },
    { path: 'users/:user_id', component: DetailComponent },
    { path: 'users/:user_id/new', component: EditNewComponent },
    { path: 'users/:user_id/edit', component: EditNewComponent }
  ];
} else {
  routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', component: LoginComponent }
  ];
}

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
