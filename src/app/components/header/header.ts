import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  styleUrl: './header.scss'
})
export class HeaderComponent {
  menuItems = [
    { label: 'Star Wars', route: '/' },
    { label: 'Filme', route: '/film' },
    { label: 'Charaktere', route: '/character' },
    { label: 'Planeten', route: '/planet' }
  ];

  mobileOpen = false;

  toggleMenu() {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMenu() {
    this.mobileOpen = false;
  }
}
