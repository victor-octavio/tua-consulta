import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MOCK_APPOINTMENTS } from '../../shared/mocks/appointments.mock';
import { MOCK_SPECIALTIES, MOCK_PROFESSIONALS } from '../../shared/mocks/schedule.mock';

@Component({
  selector: 'app-employee-appointments',
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class EmployeeAppointmentsComponent {
  appointments = MOCK_APPOINTMENTS;
  showModal = false;
  editMode = false;

  selectedAppointment: any = {
    id: 0,
    specialty: '',
    date: '',
    time: '',
    professional: '',
    patient: '',
    cpf: '',
    status: 'confirmed'
  };

  specialties = MOCK_SPECIALTIES.map(s => s.name);
  professionals = MOCK_PROFESSIONALS;

  openNewModal(): void {
    this.editMode = false;
    this.selectedAppointment = {
      id: 0,
      specialty: '',
      date: '',
      time: '',
      professional: '',
      patient: '',
      cpf: '',
      status: 'confirmed'
    };
    this.showModal = true;
  }

  openEditModal(appointment: any): void {
    this.editMode = true;
    this.selectedAppointment = { ...appointment };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveAppointment(): void {
    if (this.editMode) {
      const index = this.appointments.findIndex(a => a.id === this.selectedAppointment.id);
      if (index !== -1) {
        this.appointments[index] = { ...this.selectedAppointment };
      }
    } else {
      this.selectedAppointment.id = this.appointments.length + 1;
      this.appointments.push({ ...this.selectedAppointment });
    }
    this.closeModal();
  }

  deleteAppointment(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta consulta?')) {
      const index = this.appointments.findIndex(a => a.id === id);
      if (index !== -1) {
        this.appointments.splice(index, 1);
      }
    }
  }

  formatDate(date: string): string {
    if (date.includes('/')) return date;
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }
}
