import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MOCK_AGENDAMENTOS } from '../../side-bar/side-bar';

@Component({
  selector: 'app-meus-agendamentos',
  imports: [CommonModule, RouterLink],
  templateUrl: './meus-agendamentos.html',
  styleUrl: './meus-agendamentos.css'
})
export class MeusAgendamentos {
  agendamentos = MOCK_AGENDAMENTOS;

  cancelarAgendamento(id: number): void {
    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
      const index = this.agendamentos.findIndex(a => a.id === id);
      if (index !== -1) {
        this.agendamentos.splice(index, 1);
        alert('Agendamento cancelado com sucesso!');
      }
    }
  }

  formatarData(data: string): string {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }
}
