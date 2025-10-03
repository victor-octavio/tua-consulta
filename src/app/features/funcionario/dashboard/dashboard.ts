import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MOCK_AGENDAMENTOS } from '../../side-bar/side-bar';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  agendamentosHoje = MOCK_AGENDAMENTOS.filter(ag => {
    const hoje = new Date().toISOString().split('T')[0];
    return ag.data === hoje;
  });

  totalAgendamentos = MOCK_AGENDAMENTOS.length;
  agendamentosConfirmados = MOCK_AGENDAMENTOS.filter(ag => ag.status === 'confirmado').length;

  especialidades = [
    { nome: 'Clínica Geral', total: 15 },
    { nome: 'Pediatria', total: 8 },
    { nome: 'Ginecologia', total: 6 },
    { nome: 'Vacinação', total: 20 },
    { nome: 'Curativos', total: 12 },
    { nome: 'Coleta de Exames', total: 10 }
  ];

  profissionais = [
    { nome: 'Dr. João Silva', especialidade: 'Clínica Geral', status: 'disponível' },
    { nome: 'Dra. Maria Santos', especialidade: 'Pediatria', status: 'em atendimento' },
    { nome: 'Dr. Pedro Oliveira', especialidade: 'Ginecologia', status: 'disponível' },
    { nome: 'Enf. Carlos Souza', especialidade: 'Curativos', status: 'disponível' }
  ];
}
