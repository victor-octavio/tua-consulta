import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { MOCK_APPOINTMENTS } from '../../shared/mocks/appointments.mock';
import { MOCK_SPECIALTIES, MOCK_TIME_SLOTS, MOCK_PROFESSIONALS } from '../../shared/mocks/schedule.mock';

interface Specialty {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-schedule',
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  currentStep = 0;
  steps = [
    { name: 'Especialidade', shortName: 'Esp.' },
    { name: 'Data e Horário', shortName: 'Data' },
    { name: 'Confirmação', shortName: 'Conf.' }
  ];

  // Selected data
  selectedSpecialty: Specialty | null = null;
  selectedDate: Date | null = null;
  selectedTime: string | null = null;

  // Min and max dates for calendar
  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().setMonth(new Date().getMonth() + 3));

  // Available specialties
  specialties: Specialty[] = MOCK_SPECIALTIES;

  // Time slots by shift
  morningSlots: string[] = MOCK_TIME_SLOTS.morning;
  afternoonSlots: string[] = MOCK_TIME_SLOTS.afternoon;
  eveningSlots: string[] = MOCK_TIME_SLOTS.evening;

  selectedShift: 'morning' | 'afternoon' | 'evening' = 'morning';

  constructor(private router: Router) {}

  get availableTimeSlots(): string[] {
    switch (this.selectedShift) {
      case 'morning': return this.morningSlots;
      case 'afternoon': return this.afternoonSlots;
      case 'evening': return this.eveningSlots;
      default: return [];
    }
  }

  // Date filter - disable weekends
  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  // Selection methods
  selectSpecialty(specialty: Specialty): void {
    this.selectedSpecialty = specialty;
  }

  selectShift(shift: 'morning' | 'afternoon' | 'evening'): void {
    this.selectedShift = shift;
    this.selectedTime = null;
  }

  onDateChange(date: Date | null): void {
    this.selectedDate = date;
    this.selectedTime = null;
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  // Selection checks
  isSpecialtySelected(specialty: Specialty): boolean {
    return this.selectedSpecialty?.id === specialty.id;
  }

  isTimeSelected(time: string): boolean {
    return this.selectedTime === time;
  }

  // Navigation
  next(): void {
    if (this.currentStep < 2) {
      this.currentStep++;
    } else {
      this.confirmAppointment();
    }
  }

  back(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  goBack(): void {
    this.router.navigate(['/patient/appointments']);
  }

  canNext(): boolean {
    switch (this.currentStep) {
      case 0:
        return this.selectedSpecialty !== null;
      case 1:
        return this.selectedDate !== null && this.selectedTime !== null;
      case 2:
        return true;
      default:
        return false;
    }
  }

  getNextButtonText(): string {
    return this.currentStep === 2 ? 'Confirmar Consulta' : 'Próxima Etapa';
  }

  isTabActive(index: number): boolean {
    return this.currentStep === index;
  }

  isTabCompleted(index: number): boolean {
    return this.currentStep > index;
  }

  isTabFuture(index: number): boolean {
    return this.currentStep < index;
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  formatDateFull(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleDateString('pt-BR', { month: 'long' });
    const year = date.getFullYear();
    const weekDay = date.toLocaleDateString('pt-BR', { weekday: 'long' });
    return `${weekDay}, ${day} de ${month} de ${year}`;
  }

  confirmAppointment(): void {
    const newAppointment = {
      id: MOCK_APPOINTMENTS.length + 1,
      specialty: this.selectedSpecialty!.name,
      date: this.formatDate(this.selectedDate!),
      time: this.selectedTime!,
      professional: this.getRandomProfessional(),
      patient: 'Current User',
      cpf: '000.000.000-00',
      status: 'confirmed'
    };

    MOCK_APPOINTMENTS.push(newAppointment);

    alert('Consulta confirmada com sucesso! Você será redirecionado para suas consultas.');
    this.router.navigate(['/patient/appointments']);
  }

  getRandomProfessional(): string {
    return MOCK_PROFESSIONALS[Math.floor(Math.random() * MOCK_PROFESSIONALS.length)];
  }
}
