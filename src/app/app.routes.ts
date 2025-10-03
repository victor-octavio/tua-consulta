import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Home } from './features/home/home';
import { Schedule } from './features/schedule/schedule';
import { UserProfile } from './features/user-profile/user-profile';
import { MeusAgendamentos } from './features/paciente/meus-agendamentos/meus-agendamentos';

// Importar componentes específicos do funcionário
import { Dashboard } from './features/funcionario/dashboard/dashboard';
import { Agendamentos } from './features/funcionario/agendamentos/agendamentos';
import { Profissionais } from './features/funcionario/profissionais/profissionais';
import { Especialidades } from './features/funcionario/especialidades/especialidades';

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
        path: 'paciente',
        component: Home,
        children: [
            { path: '', redirectTo: 'agendar', pathMatch: 'full' },
            { path: 'agendar', component: Schedule },
            { path: 'perfil', component: UserProfile },
            { path: 'meus-agendamentos', component: MeusAgendamentos },
        ]
    },
    {
        path: 'funcionario',
        component: Home,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard },
            { path: 'agendamentos', component: Agendamentos },
            { path: 'profissionais', component: Profissionais },
            { path: 'especialidades', component: Especialidades },
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
