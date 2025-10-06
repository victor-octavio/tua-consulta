import { Routes } from '@angular/router';
import { LoginComponent } from './features/layout/login/login.component';
import { HomeComponent } from './features/layout/home/home.component';
import { ScheduleComponent } from './features/patient/schedule/schedule.component';
import { ProfileComponent } from './features/patient/profile/profile.component';
import { AppointmentsComponent } from './features/patient/appointments/appointments.component';
import { AboutComponent } from './features/patient/about/about.component';

// Import employee components
import { DashboardComponent } from './features/employee/dashboard/dashboard.component';
import { EmployeeAppointmentsComponent } from './features/employee/appointments/appointments.component';
import { ProfessionalsComponent } from './features/employee/professionals/professionals.component';
import { SpecialtiesComponent } from './features/employee/specialties/specialties.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'patient',
        component: HomeComponent,
        children: [
            { path: '', redirectTo: 'schedule', pathMatch: 'full' },
            { path: 'schedule', component: ScheduleComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'appointments', component: AppointmentsComponent },
            { path: 'about', component: AboutComponent },
        ]
    },
    {
        path: 'employee',
        component: HomeComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'appointments', component: EmployeeAppointmentsComponent },
            { path: 'professionals', component: ProfessionalsComponent },
            { path: 'specialties', component: SpecialtiesComponent },
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
