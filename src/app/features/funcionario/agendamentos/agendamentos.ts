import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MOCK_AGENDAMENTOS } from '../../side-bar/side-bar';

@Component({
  selector: 'app-agendamentos-funcionario',
  imports: [CommonModule, FormsModule],
  templateUrl: './agendamentos.html',
  styleUrl: './agendamentos.css'
})
export class Agendamentos {
  agendamentos = MOCK_AGENDAMENTOS;
  mostrarModal = false;
  modoEdicao = false;

  agendamentoSelecionado: any = {
    id: 0,
    especialidade: '',
    data: '',
    hora: '',
    profissional: '',
    paciente: '',
    cpf: '',
    status: 'confirmado'
  };

  especialidades = [
    'Clínica Geral',
    'Pediatria',
    'Ginecologia/Obstetrícia',
    'Vacinação',
    'Curativos',
    'Coleta de Exames'
  ];

  profissionais = [
    'Dr. João Silva',
    'Dra. Maria Santos',
    'Dr. Pedro Oliveira',
    'Dra. Ana Costa',
    'Enf. Carlos Souza',
    'Enf. Julia Lima'
  ];

  // ...existing code...
  abrirModalNovo(): void {
    this.modoEdicao = false;
    this.agendamentoSelecionado = {
      id: 0,
      especialidade: '',
      data: '',
      hora: '',
      profissional: '',
      paciente: '',
      cpf: '',
      status: 'confirmado'
    };
    this.mostrarModal = true;
  }

  abrirModalEditar(agendamento: any): void {
    this.modoEdicao = true;
    this.agendamentoSelecionado = { ...agendamento };
    this.mostrarModal = true;
  }

  fecharModal(): void {
    this.mostrarModal = false;
  }

  salvarAgendamento(): void {
    if (this.modoEdicao) {
      const index = this.agendamentos.findIndex(a => a.id === this.agendamentoSelecionado.id);
      if (index !== -1) {
        this.agendamentos[index] = { ...this.agendamentoSelecionado };
      }
    } else {
      this.agendamentoSelecionado.id = this.agendamentos.length + 1;
      this.agendamentos.push({ ...this.agendamentoSelecionado });
    }
    this.fecharModal();
  }

  excluirAgendamento(id: number): void {
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
      const index = this.agendamentos.findIndex(a => a.id === id);
      if (index !== -1) {
        this.agendamentos.splice(index, 1);
      }
    }
  }

  formatarData(data: string): string {
    if (data.includes('/')) return data;
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }
}
