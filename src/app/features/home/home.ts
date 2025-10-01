import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

interface Unidade {
  id: number;
  nome: string;
  endereco: string;
  horario: string;
}

interface Vacina {
  id: number;
  nome: string;
  descricao: string;
}


@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
 currentStep = 0;
  
  // Dados selecionados
  unidadeSelecionada: Unidade | null = null;
  vacinaSelecionada: Vacina | null = null;
  dataSelecionada: Date | null = new Date(2025, 0, 15); // 15 de Janeiro de 2025
  horarioSelecionado: string | null = null;

  // Data mínima e máxima para o calendário
  minDate: Date = new Date(2025, 0, 1);
  maxDate: Date = new Date(2025, 11, 31);

  // Lista de unidades
  unidades: Unidade[] = [
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

  // Lista de vacinas
  vacinas: Vacina[] = [
    {
      id: 1,
      nome: 'COVID-19 (Dose de Reforço)',
      descricao: 'Recomendada para todos os adultos'
    },
    {
      id: 2,
      nome: 'Influenza (Gripe)',
      descricao: 'Campanha anual de vacinação'
    },
    {
      id: 3,
      nome: 'Tétano e Difteria (dT)',
      descricao: 'Reforço a cada 10 anos'
    },
    {
      id: 4,
      nome: 'Hepatite B',
      descricao: 'Esquema de 3 doses'
    }
  ];

  // Horários disponíveis
  horarios: string[] = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  // Filtro de datas - desabilita fins de semana
  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    const day = date.getDay();
    // Desabilita domingos (0) e sábados (6)
    return day !== 0 && day !== 6;
  };

  // Métodos de seleção
  selecionarUnidade(unidade: Unidade): void {
    console.log('Unidade selecionada:', unidade);
    this.unidadeSelecionada = unidade;
  }

  selecionarVacina(vacina: Vacina): void {
    console.log('Vacina selecionada:', vacina);
    this.vacinaSelecionada = vacina;
  }

  onDateChange(date: Date | null): void {
    console.log('Data selecionada:', date);
    this.dataSelecionada = date;
    // Reseta o horário quando muda a data
    this.horarioSelecionado = null;
  }

  selecionarHorario(horario: string): void {
    console.log('Horário selecionado:', horario);
    this.horarioSelecionado = horario;
  }

  // Verificações de seleção
  isUnidadeSelecionada(unidade: Unidade): boolean {
    return this.unidadeSelecionada?.id === unidade.id;
  }

  isVacinaSelecionada(vacina: Vacina): boolean {
    return this.vacinaSelecionada?.id === vacina.id;
  }

  isHorarioSelecionado(horario: string): boolean {
    return this.horarioSelecionado === horario;
  }

  // Navegação
  avancar(): void {
    console.log('Avançar - Step atual:', this.currentStep);
    
    if (this.currentStep < 3) {
      this.currentStep++;
    } else {
      this.confirmarAgendamento();
    }
  }

  voltar(): void {
    console.log('Voltar - Step atual:', this.currentStep);
    
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  podeAvancar(): boolean {
    switch (this.currentStep) {
      case 0:
        return this.unidadeSelecionada !== null;
      case 1:
        return this.vacinaSelecionada !== null;
      case 2:
        return this.dataSelecionada !== null && this.horarioSelecionado !== null;
      case 3:
        return true;
      default:
        return false;
    }
  }

  getTextoBotaoAvancar(): string {
    return this.currentStep === 3 ? 'Confirmar Agendamento' : 'Avançar';
  }

  isTabAtiva(index: number): boolean {
    return this.currentStep === index;
  }

  isTabCompletada(index: number): boolean {
    return this.currentStep > index;
  }

  isTabFutura(index: number): boolean {
    return this.currentStep < index;
  }

  formatarData(date: Date): string {
    const dia = date.getDate();
    const mes = date.toLocaleDateString('pt-BR', { month: 'long' });
    const ano = date.getFullYear();
    return `${dia} de ${mes} de ${ano}`;
  }

  confirmarAgendamento(): void {
    console.log('Agendamento confirmado:', {
      unidade: this.unidadeSelecionada,
      vacina: this.vacinaSelecionada,
      data: this.dataSelecionada,
      horario: this.horarioSelecionado
    });

    alert(`✅ Agendamento confirmado!

Unidade: ${this.unidadeSelecionada?.nome}
Vacina: ${this.vacinaSelecionada?.nome}
Data: ${this.formatarData(this.dataSelecionada!)} às ${this.horarioSelecionado}`);
  }

  resetarFormulario(): void {
    this.currentStep = 0;
    this.unidadeSelecionada = null;
    this.vacinaSelecionada = null;
    this.dataSelecionada = new Date(2025, 0, 15);
    this.horarioSelecionado = null;
  }

}
