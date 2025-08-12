import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { routes } from './app.routes';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule ,MatToolbarModule, MatSidenavModule, MatIconModule , MatListModule, MatButtonModule], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor (private router: Router) {}
  goToRoute() {
    this.router.navigate(['/home']);
  }
  protected readonly title = signal('helpdesk');
}