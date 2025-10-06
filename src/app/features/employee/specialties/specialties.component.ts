import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Specialty {
  id: number;
  name: string;
  description: string;
  active: boolean;
  totalAppointments: number;
}

@Component({
  selector: 'app-specialties',
  imports: [CommonModule, FormsModule],
  templateUrl: './specialties.component.html',
  styleUrl: './specialties.component.css'
})
export class SpecialtiesComponent {
  specialties: Specialty[] = [
    { id: 1, name: 'Clínico Geral', description: 'Consultas médicas gerais e acompanhamento de saúde', active: true, totalAppointments: 45 },
    { id: 2, name: 'Pediatria', description: 'Atendimento para crianças e adolescentes', active: true, totalAppointments: 32 },
    { id: 3, name: 'Ginecologia', description: 'Saúde da mulher e pré-natal', active: true, totalAppointments: 28 },
    { id: 4, name: 'Enfermagem', description: 'Curativos, vacinação e procedimentos', active: true, totalAppointments: 67 },
    { id: 5, name: 'Saúde Bucal', description: 'Atendimento odontológico', active: true, totalAppointments: 38 },
    { id: 6, name: 'Saúde Mental', description: 'Atendimento psicológico', active: true, totalAppointments: 22 }
  ];

  showModal = false;
  editMode = false;

  selectedSpecialty: Specialty = {
    id: 0,
    name: '',
    description: '',
    active: true,
    totalAppointments: 0
  };

  openNewModal(): void {
    this.editMode = false;
    this.selectedSpecialty = {
      id: 0,
      name: '',
      description: '',
      active: true,
      totalAppointments: 0
    };
    this.showModal = true;
  }

  openEditModal(specialty: Specialty): void {
    this.editMode = true;
    this.selectedSpecialty = { ...specialty };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveSpecialty(): void {
    if (this.editMode) {
      const index = this.specialties.findIndex(e => e.id === this.selectedSpecialty.id);
      if (index !== -1) {
        this.specialties[index] = { ...this.selectedSpecialty };
      }
    } else {
      this.selectedSpecialty.id = this.specialties.length + 1;
      this.specialties.push({ ...this.selectedSpecialty });
    }
    this.closeModal();
  }

  toggleStatus(specialty: Specialty): void {
    specialty.active = !specialty.active;
  }

  deleteSpecialty(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta especialidade?')) {
      const index = this.specialties.findIndex(e => e.id === id);
      if (index !== -1) {
        this.specialties.splice(index, 1);
      }
    }
  }
}
