import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SideBar } from '../side-bar/side-bar';

interface Unity {
  id: number;
  nome: string;
  endereco: string;
  horario: string;
}

interface Specialty {
  id: number;
  nome: string;
  descricao: string;
}

@Component({
  selector: 'app-schedule',
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
  ],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css'
})
export class Schedule {
  isCompletedTab(arg0: number) {
    throw new Error('Method not implemented.');
  }
  currentStep = 0;
  steps = [
  { name: 'Unidade', shortName: 'Unid.' },
  { name: 'Especialidade', shortName: 'Espec.' },
  { name: 'Horários', shortName: 'Hora' },
  { name: 'Confirmação', shortName: 'Conf.' }
];

  // Dados selecionados
  selectedUnity: Unity | null = null;
  selectedSpecialty: Specialty | null = null;
  selectedDate: Date | null = new Date(2025, 0, 15); // 15 de Janeiro de 2025
  selectedTime: string | null = null;

  // Data mínima e máxima para o calendário
  minDate: Date = new Date(2025, 0, 1);
  maxDate: Date = new Date(2025, 11, 31);

  // Lista de unidades
  unities: Unity[] = [
    {
      id: 1,
      nome: 'Clínica da Família IAPI',
      endereco: `Rua Três de Abril, 90 - Passo d'Areia`,
      horario: 'Segunda a Sexta: 7h às 22h'
    },
    {
      id: 2,
      nome: 'UBS Jardim das Acácias',
      endereco: 'Av. Principal, 456 - Jardim das Acácias',
      horario: 'Segunda a Sexta: 7h às 19h'
    },
    {
      id: 3,
      nome: 'UBS Vila Nova',
      endereco: 'Rua dos Pinheiros, 789 - Vila Nova',
      horario: 'Segunda a Sexta: 8h às 16h'
    }
  ];

  // Lista de especialidades
  specialties: Specialty[] = [
    {
      id: 1,
      nome: 'Dentista',
      descricao: 'Recomendada para todos os adultos'
    },
    {
      id: 2,
      nome: 'Pediatra',
      descricao: 'Campanha anual de vacinação'
    },
    {
      id: 3,
      nome: 'Clinico Geral',
      descricao: 'Reforço a cada 10 anos'
    },
    {
      id: 4,
      nome: 'Enfermagem',
      descricao: 'Esquema de 3 doses'
    }
  ];

  // Horários disponíveis
  schedules: string[] = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  // Filtro de datas - desabilita fins de semana
  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    const day = date.getDay();
    // Desabilita domingos (0) e sábados (6)
    return day !== 0 && day !== 6;
  };

  // Métodos de seleção
  selectUnity(unity: Unity): void {
    console.log('Unity selected:', unity);
    this.selectedUnity = unity;
  }

  selectSpecialty(specialty: Specialty): void {
    console.log('Specialty selected:', specialty);
    this.selectedSpecialty = specialty;
  }

  onDateChange(date: Date | null): void {
    console.log('Date selected:', date);
    this.selectedDate = date;
    // Reseta o horário quando muda a data
    this.selectedTime = null;
  }

  selectTime(time: string): void {
    console.log('Time selected:', time);
    this.selectedTime = time;
  }

  // Verificações de seleção
  isUnitySelected(unity: Unity): boolean {
    return this.selectedUnity?.id === unity.id;
  }

  isSpecialtySelected(specialty: Specialty): boolean {
    return this.selectedSpecialty?.id === specialty.id;
  }

  isTimeSelected(time: string): boolean {
    return this.selectedTime === time;
  }

  // Navegação
  next(): void {
    console.log('Next - Current step:', this.currentStep);

    if (this.currentStep < 3) {
      this.currentStep++;
    } else {
      this.confirmAppointment();
    }
  }

  back(): void {
    console.log('Back - Current step:', this.currentStep);

    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  canNext(): boolean {
    switch (this.currentStep) {
      case 0:
        return this.selectedUnity !== null;
      case 1:
        return this.selectedSpecialty !== null;
      case 2:
        return this.selectedDate !== null && this.selectedTime !== null;
      case 3:
        return true;
      default:
        return false;
    }
  }

  getNextButtonText(): string {
    return this.currentStep === 3 ? 'Confirmar agendamento' : 'Avançar';
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
    const day = date.getDate();
    const month = date.toLocaleDateString('pt-BR', { month: 'long' });
    const year = date.getFullYear();
    return `${day} de ${month} de ${year}`;
  }

  confirmAppointment(): void {
    console.log('Agendamento confirmado:', {
      unity: this.selectedUnity,
      specialty: this.selectedSpecialty,
      date: this.selectedDate,
      time: this.selectedTime
    });

    alert(`✅ Agendamento confirmado!

Unity: ${this.selectedUnity?.nome}
Specialty: ${this.selectedSpecialty?.nome}
Date: ${this.formatDate(this.selectedDate!)} at ${this.selectedTime}`);
  }

  resetForm(): void {
    this.currentStep = 0;
    this.selectedUnity = null;
    this.selectedSpecialty = null;
    this.selectedDate = new Date(2025, 0, 15);
    this.selectedTime = null;
  }
}
