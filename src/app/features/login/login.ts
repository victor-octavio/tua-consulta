import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  tipoUsuario: 'paciente' | 'funcionario' = 'paciente';
  identificacao: string = '';
  senha: string = '';

  constructor(private router: Router) {}

  login(event: Event) {
    event.preventDefault();

    // Mocked login - always allow access
    if (this.tipoUsuario === 'paciente') {
      this.router.navigate(['/paciente/agendar']);
    } else {
      this.router.navigate(['/funcionario/dashboard']);
    }
  }
}
