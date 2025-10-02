import { Component } from '@angular/core';
import { SideBar } from '../side-bar/side-bar';
import { Schedule } from '../schedule/schedule';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Unity {
  id: number;
  nome: string;
  endereco: string;
  horario: string;
}

interface Specialty {
  id: number;
  nome: string;
  descricao: string;
}

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
export class Home {
  sidebarOpen = false;
}
