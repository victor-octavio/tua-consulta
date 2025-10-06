import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  sidebarOpen = false;
  isEmployee = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkUserType();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkUserType();
    });
  }

  checkUserType() {
    this.isEmployee = this.router.url.includes('/employee');
  }
}
