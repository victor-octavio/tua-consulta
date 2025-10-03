import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Profissional {
  id: number;
  nome: string;
  especialidade: string;
  cns: string;
  telefone: string;
  status: 'disponível' | 'em atendimento' | 'ausente';
}

@Component({
  selector: 'app-profissionais',
  imports: [CommonModule, FormsModule],
  templateUrl: './profissionais.html',
  styleUrl: './profissionais.css'
})
export class Profissionais {
  profissionais: Profissional[] = [
    { id: 1, nome: 'Dr. João Silva', especialidade: 'Clínica Geral', cns: '123456789012345', telefone: '(51) 99999-1111', status: 'disponível' },
    { id: 2, nome: 'Dra. Maria Santos', especialidade: 'Pediatria', cns: '123456789012346', telefone: '(51) 99999-2222', status: 'em atendimento' },
    { id: 3, nome: 'Dr. Pedro Oliveira', especialidade: 'Ginecologia/Obstetrícia', cns: '123456789012347', telefone: '(51) 99999-3333', status: 'disponível' },
    { id: 4, nome: 'Dra. Ana Costa', especialidade: 'Clínica Geral', cns: '123456789012348', telefone: '(51) 99999-4444', status: 'disponível' },
    { id: 5, nome: 'Enf. Carlos Souza', especialidade: 'Curativos', cns: '123456789012349', telefone: '(51) 99999-5555', status: 'disponível' },
    { id: 6, nome: 'Enf. Julia Lima', especialidade: 'Vacinação', cns: '123456789012350', telefone: '(51) 99999-6666', status: 'disponível' }
  ];

  mostrarModal = false;
  modoEdicao = false;

  profissionalSelecionado: Profissional = {
    id: 0,
    nome: '',
    especialidade: '',
    cns: '',
    telefone: '',
    status: 'disponível'
  };

  especialidades = [
    'Clínica Geral',
    'Pediatria',
    'Ginecologia/Obstetrícia',
    'Vacinação',
    'Curativos',
    'Coleta de Exames'
  ];

  abrirModalNovo(): void {
    this.modoEdicao = false;
    this.profissionalSelecionado = {
      id: 0,
      nome: '',
      especialidade: '',
      cns: '',
      telefone: '',
      status: 'disponível'
    };
    this.mostrarModal = true;
  }

  abrirModalEditar(profissional: Profissional): void {
    this.modoEdicao = true;
    this.profissionalSelecionado = { ...profissional };
    this.mostrarModal = true;
  }

  fecharModal(): void {
    this.mostrarModal = false;
  }

  salvarProfissional(): void {
    if (this.modoEdicao) {
      const index = this.profissionais.findIndex(p => p.id === this.profissionalSelecionado.id);
      if (index !== -1) {
        this.profissionais[index] = { ...this.profissionalSelecionado };
      }
    } else {
      this.profissionalSelecionado.id = this.profissionais.length + 1;
      this.profissionais.push({ ...this.profissionalSelecionado });
    }
    this.fecharModal();
  }

  excluirProfissional(id: number): void {
    if (confirm('Tem certeza que deseja excluir este profissional?')) {
      const index = this.profissionais.findIndex(p => p.id === id);
      if (index !== -1) {
        this.profissionais.splice(index, 1);
      }
    }
  }
}
