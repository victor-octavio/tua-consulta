import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { MOCK_AGENDAMENTOS } from '../side-bar/side-bar';

interface Especialidade {
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
  currentStep = 0;
  steps = [
    { name: 'Especialidade', shortName: 'Espec.' },
    { name: 'Data e Horário', shortName: 'Data' },
    { name: 'Confirmação', shortName: 'Conf.' }
  ];

  // Dados selecionados
  selectedEspecialidade: Especialidade | null = null;
  selectedDate: Date | null = null;
  selectedTime: string | null = null;

  // Data mínima e máxima para o calendário
  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().setMonth(new Date().getMonth() + 3));

  // Lista de especialidades disponíveis na UBS IAPI
  especialidades: Especialidade[] = [
    {
      id: 1,
      nome: 'Clínica Geral',
      descricao: 'Consultas médicas gerais e acompanhamento de saúde'
    },
    {
      id: 2,
      nome: 'Pediatria',
      descricao: 'Atendimento médico para crianças e adolescentes'
    },
    {
      id: 3,
      nome: 'Ginecologia/Obstetrícia',
      descricao: 'Saúde da mulher, pré-natal e planejamento familiar'
    },
    {
      id: 4,
      nome: 'Vacinação',
      descricao: 'Aplicação de vacinas do calendário nacional'
    },
    {
      id: 5,
      nome: 'Curativos',
      descricao: 'Realização e troca de curativos'
    },
    {
      id: 6,
      nome: 'Coleta de Exames',
      descricao: 'Coleta de sangue e outros exames laboratoriais'
    }
  ];

  // Horários por turno
  horariosManha: string[] = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
  horariosTarde: string[] = ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];
  horariosNoite: string[] = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];

  turnoSelecionado: 'manha' | 'tarde' | 'noite' = 'manha';

  constructor(private router: Router) {}

  get horariosDisponiveis(): string[] {
    switch (this.turnoSelecionado) {
      case 'manha': return this.horariosManha;
      case 'tarde': return this.horariosTarde;
      case 'noite': return this.horariosNoite;
      default: return [];
    }
  }

  // Filtro de datas - desabilita fins de semana
  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  // Métodos de seleção
  selectEspecialidade(especialidade: Especialidade): void {
    this.selectedEspecialidade = especialidade;
  }

  selecionarTurno(turno: 'manha' | 'tarde' | 'noite'): void {
    this.turnoSelecionado = turno;
    this.selectedTime = null;
  }

  onDateChange(date: Date | null): void {
    this.selectedDate = date;
    this.selectedTime = null;
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  // Verificações de seleção
  isEspecialidadeSelected(especialidade: Especialidade): boolean {
    return this.selectedEspecialidade?.id === especialidade.id;
  }

  isTimeSelected(time: string): boolean {
    return this.selectedTime === time;
  }

  // Navegação
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

  voltar(): void {
    this.router.navigate(['/paciente/meus-agendamentos']);
  }

  canNext(): boolean {
    switch (this.currentStep) {
      case 0:
        return this.selectedEspecialidade !== null;
      case 1:
        return this.selectedDate !== null && this.selectedTime !== null;
      case 2:
        return true;
      default:
        return false;
    }
  }

  getNextButtonText(): string {
    return this.currentStep === 2 ? 'Confirmar Agendamento' : 'Próximo Passo';
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
    const novoAgendamento = {
      id: MOCK_AGENDAMENTOS.length + 1,
      especialidade: this.selectedEspecialidade!.nome,
      data: this.formatDate(this.selectedDate!),
      hora: this.selectedTime!,
      profissional: this.getProfissionalAleatorio(),
      status: 'confirmado'
    };

    MOCK_AGENDAMENTOS.push(novoAgendamento);

    alert('Agendamento confirmado com sucesso! Você será redirecionado para seus agendamentos.');
    this.router.navigate(['/paciente/meus-agendamentos']);
  }

  getProfissionalAleatorio(): string {
    const profissionais = [
      'Dr. João Silva',
      'Dra. Maria Santos',
      'Dr. Pedro Oliveira',
      'Dra. Ana Costa',
      'Enf. Carlos Souza',
      'Enf. Julia Lima'
    ];
    return profissionais[Math.floor(Math.random() * profissionais.length)];
  }
}
