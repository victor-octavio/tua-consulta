import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MOCK_APPOINTMENTS } from '../../shared/mocks/appointments.mock';

@Component({
  selector: 'app-appointments',
  imports: [CommonModule, RouterLink],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  appointments = MOCK_APPOINTMENTS;

  cancelAppointment(id: number): void {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      const index = this.appointments.findIndex(a => a.id === id);
      if (index !== -1) {
        this.appointments.splice(index, 1);
        alert('Appointment cancelled successfully!');
      }
    }
  }

  formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }
}
