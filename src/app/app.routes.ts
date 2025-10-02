import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Home } from './features/home/home';
import { Schedule } from './features/schedule/schedule';
import { UserProfile } from './features/user-profile/user-profile';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: Home, // contém a sidebar e o router-outlet
        children: [
            { path: 'agendar', component: Schedule },
            { path: 'perfil', component: UserProfile },
        ]
    },
    { 
        path: '**', 
        redirectTo: 'login' 
    }
];
