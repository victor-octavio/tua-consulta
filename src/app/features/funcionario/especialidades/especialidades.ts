import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Especialidade {
  id: number;
  nome: string;
  descricao: string;
  ativa: boolean;
  totalAgendamentos: number;
}

@Component({
  selector: 'app-especialidades',
  imports: [CommonModule, FormsModule],
  templateUrl: './especialidades.html',
  styleUrl: './especialidades.css'
})
export class Especialidades {
  especialidades: Especialidade[] = [
    { id: 1, nome: 'Clínica Geral', descricao: 'Consultas médicas gerais e acompanhamento de saúde', ativa: true, totalAgendamentos: 45 },
    { id: 2, nome: 'Pediatria', descricao: 'Atendimento médico para crianças e adolescentes', ativa: true, totalAgendamentos: 32 },
    { id: 3, nome: 'Ginecologia/Obstetrícia', descricao: 'Saúde da mulher, pré-natal e planejamento familiar', ativa: true, totalAgendamentos: 28 },
    { id: 4, nome: 'Vacinação', descricao: 'Aplicação de vacinas do calendário nacional', ativa: true, totalAgendamentos: 67 },
    { id: 5, nome: 'Curativos', descricao: 'Realização e troca de curativos', ativa: true, totalAgendamentos: 41 },
    { id: 6, nome: 'Coleta de Exames', descricao: 'Coleta de sangue e outros exames laboratoriais', ativa: true, totalAgendamentos: 53 }
  ];

  mostrarModal = false;
  modoEdicao = false;

  especialidadeSelecionada: Especialidade = {
    id: 0,
    nome: '',
    descricao: '',
    ativa: true,
    totalAgendamentos: 0
  };

  abrirModalNovo(): void {
    this.modoEdicao = false;
    this.especialidadeSelecionada = {
      id: 0,
      nome: '',
      descricao: '',
      ativa: true,
      totalAgendamentos: 0
    };
    this.mostrarModal = true;
  }

  abrirModalEditar(especialidade: Especialidade): void {
    this.modoEdicao = true;
    this.especialidadeSelecionada = { ...especialidade };
    this.mostrarModal = true;
  }

  fecharModal(): void {
    this.mostrarModal = false;
  }

  salvarEspecialidade(): void {
    if (this.modoEdicao) {
      const index = this.especialidades.findIndex(e => e.id === this.especialidadeSelecionada.id);
      if (index !== -1) {
        this.especialidades[index] = { ...this.especialidadeSelecionada };
      }
    } else {
      this.especialidadeSelecionada.id = this.especialidades.length + 1;
      this.especialidades.push({ ...this.especialidadeSelecionada });
    }
    this.fecharModal();
  }

  toggleStatus(especialidade: Especialidade): void {
    especialidade.ativa = !especialidade.ativa;
  }

  excluirEspecialidade(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta especialidade?')) {
      const index = this.especialidades.findIndex(e => e.id === id);
      if (index !== -1) {
        this.especialidades.splice(index, 1);
      }
    }
  }
}
