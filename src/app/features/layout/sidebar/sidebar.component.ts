import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MOCK_APPOINTMENTS } from '../../shared/mocks/appointments.mock';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isEmployee = false;
  @Output() closeSidebar = new EventEmitter<void>();

  appointments = MOCK_APPOINTMENTS;

  constructor(private router: Router) {}

  onMenuItemClick(): void {
    this.closeSidebar.emit();
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
