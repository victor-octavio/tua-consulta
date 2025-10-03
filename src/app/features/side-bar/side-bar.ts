import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

// Mock de agendamentos
export const MOCK_AGENDAMENTOS = [
  {
    id: 1,
    especialidade: 'Clínica Geral',
    data: '2025-10-10',
    hora: '09:00',
    profissional: 'Dr. João Silva',
    status: 'confirmado'
  },
  {
    id: 2,
    especialidade: 'Pediatria',
    data: '2025-10-15',
    hora: '14:00',
    profissional: 'Dra. Maria Santos',
    status: 'confirmado'
  }
];

@Component({
  selector: 'app-side-bar',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css'
})
export class SideBar {
  @Input() isFuncionario = false;
  @Output() closeSidebar = new EventEmitter<void>();

  agendamentos = MOCK_AGENDAMENTOS;

  constructor(private router: Router) {}

  onMenuItemClick(): void {
    this.closeSidebar.emit();
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
