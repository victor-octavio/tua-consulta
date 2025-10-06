import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MOCK_APPOINTMENTS } from '../../shared/mocks/appointments.mock';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  todayAppointments = MOCK_APPOINTMENTS.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    return apt.date === today;
  });

  totalAppointments = MOCK_APPOINTMENTS.length;
  confirmedAppointments = MOCK_APPOINTMENTS.filter(apt => apt.status === 'confirmed').length;

  specialties = [
    { name: 'Clínico Geral', total: 15 },
    { name: 'Pediatria', total: 8 },
    { name: 'Ginecologia', total: 6 },
    { name: 'Enfermagem', total: 20 },
    { name: 'Saúde Bucal', total: 9 },
    { name: 'Saúde Mental', total: 5 }
  ];

  professionals = [
    { name: 'Dr. Carlos Eduardo Ferreira', specialty: 'Clínico Geral', status: 'available' },
    { name: 'Dra. Ana Paula Rodrigues', specialty: 'Pediatria', status: 'in service' },
    { name: 'Dra. Juliana Costa Lima', specialty: 'Ginecologia/Obstetrícia', status: 'available' },
    { name: 'Enfermeira Patrícia Mendes', specialty: 'Curativos', status: 'available' },
    { name: 'Dr. Fernando Silva Costa', specialty: 'Saúde Bucal', status: 'available' },
    { name: 'Psicóloga Marina Santos', specialty: 'Saúde Mental', status: 'available' }
  ];
}
