import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userType: 'patient' | 'employee' = 'patient';
  identification: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login(event: Event) {
    event.preventDefault();

    // Mocked login - always allow access
    if (this.userType === 'patient') {
      this.router.navigate(['/patient/schedule']);
    } else {
      this.router.navigate(['/employee/dashboard']);
    }
  }
}
