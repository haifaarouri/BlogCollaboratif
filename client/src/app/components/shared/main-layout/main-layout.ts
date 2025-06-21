import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [CommonModule, RouterOutlet, Header, Footer],
  template: `
    <app-header></app-header>

    <main class="container my-4">
      <router-outlet></router-outlet>
    </main>

    <app-footer></app-footer>
  `,
})
export class MainLayout {}
