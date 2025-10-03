import { Component, OnInit } from '@angular/core';
import { SideBar } from '../side-bar/side-bar';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterOutlet,
    SideBar
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  sidebarOpen = false;
  isFuncionario = false;

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
    this.isFuncionario = this.router.url.includes('/funcionario');
  }
}
