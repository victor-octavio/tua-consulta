import { Routes } from '@angular/router';
import { Login } from './features/login/login';

export const routes: Routes = [
    {
        path: '**',
        redirectTo: 'login',
    },
    {
        path: 'login',
        component: Login
    }
];
