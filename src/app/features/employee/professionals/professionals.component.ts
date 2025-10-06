import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MOCK_SPECIALTIES } from '../../shared/mocks/schedule.mock';

interface Professional {
  id: number;
  name: string;
  specialty: string;
  cns: string;
  phone: string;
  status: 'available' | 'in service' | 'absent';
}

@Component({
  selector: 'app-professionals',
  imports: [CommonModule, FormsModule],
  templateUrl: './professionals.component.html',
  styleUrl: './professionals.component.css'
})
export class ProfessionalsComponent {
  professionals: Professional[] = [
    { id: 1, name: 'Dr. Carlos Eduardo Ferreira', specialty: 'Clínico Geral', cns: '123456789012345', phone: '(51) 99999-1111', status: 'available' },
    { id: 2, name: 'Dra. Ana Paula Rodrigues', specialty: 'Pediatria', cns: '123456789012346', phone: '(51) 99999-2222', status: 'in service' },
    { id: 3, name: 'Dra. Juliana Costa Lima', specialty: 'Ginecologia/Obstetrícia', cns: '123456789012347', phone: '(51) 99999-3333', status: 'available' },
    { id: 4, name: 'Dr. Roberto Alves Santos', specialty: 'Clínico Geral', cns: '123456789012348', phone: '(51) 99999-4444', status: 'available' },
    { id: 5, name: 'Enfermeira Patrícia Mendes', specialty: 'Curativos', cns: '123456789012349', phone: '(51) 99999-5555', status: 'available' },
    { id: 6, name: 'Enfermeira Márcia Oliveira', specialty: 'Vacinação', cns: '123456789012350', phone: '(51) 99999-6666', status: 'available' },
    { id: 7, name: 'Dra. Camila Ferreira Souza', specialty: 'Pré-natal', cns: '123456789012351', phone: '(51) 99999-7777', status: 'available' },
    { id: 8, name: 'Dr. Fernando Silva Costa', specialty: 'Saúde Bucal', cns: '123456789012352', phone: '(51) 99999-8888', status: 'available' },
    { id: 9, name: 'Dra. Luciana Rodrigues', specialty: 'Puericultura', cns: '123456789012353', phone: '(51) 99999-9999', status: 'available' },
    { id: 10, name: 'Dr. André Martins', specialty: 'Controle de Hipertensão e Diabetes', cns: '123456789012354', phone: '(51) 99999-0000', status: 'available' },
    { id: 11, name: 'Psicóloga Marina Santos', specialty: 'Saúde Mental', cns: '123456789012355', phone: '(51) 98888-1111', status: 'available' },
    { id: 12, name: 'Enfermeira Carolina Pereira', specialty: 'Planejamento Familiar', cns: '123456789012356', phone: '(51) 98888-2222', status: 'available' }
  ];

  showModal = false;
  editMode = false;

  selectedProfessional: Professional = {
    id: 0,
    name: '',
    specialty: '',
    cns: '',
    phone: '',
    status: 'available'
  };

  specialties = MOCK_SPECIALTIES.map(s => s.name);

  openNewModal(): void {
    this.editMode = false;
    this.selectedProfessional = {
      id: 0,
      name: '',
      specialty: '',
      cns: '',
      phone: '',
      status: 'available'
    };
    this.showModal = true;
  }

  openEditModal(professional: Professional): void {
    this.editMode = true;
    this.selectedProfessional = { ...professional };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveProfessional(): void {
    if (this.editMode) {
      const index = this.professionals.findIndex(p => p.id === this.selectedProfessional.id);
      if (index !== -1) {
        this.professionals[index] = { ...this.selectedProfessional };
      }
    } else {
      this.selectedProfessional.id = this.professionals.length + 1;
      this.professionals.push({ ...this.selectedProfessional });
    }
    this.closeModal();
  }

  deleteProfessional(id: number): void {
    if (confirm('Tem certeza que deseja excluir este profissional?')) {
      const index = this.professionals.findIndex(p => p.id === id);
      if (index !== -1) {
        this.professionals.splice(index, 1);
      }
    }
  }
}
