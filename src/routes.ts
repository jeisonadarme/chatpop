import { Routes } from '@angular/router'
import { ChatroomComponent } from './app/chatroom/chatroom.component';
import { LoginFormComponent } from './app/login-form/login-form.component';
import { SigupFormComponent } from './app/sigup-form/sigup-form.component';

export const appRoutes : Routes = [
    { path: 'sigup', component: SigupFormComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'chat', component: ChatroomComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }    
];