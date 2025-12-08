import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { sidebarCollapsed, toggleSidebar } from '../sidebar.store';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.html',
  styleUrls: ['./admin-sidebar.css'],
})
export class AdminSidebar {
  collapsed = sidebarCollapsed;

  navItems = [
    { svg: this.iconDashboard, label: 'Dashboard', path: '/' },
    { svg: this.iconSearch, label: 'Búsqueda', path: '/busqueda' },
    { svg: this.iconExplorer, label: 'Explorador', path: '/explorador' },
    { svg: this.iconDocs, label: 'Documentos', path: '/documentos' },
    { svg: this.iconUsers, label: 'Usuarios', path: '/usuarios' },
    { svg: this.iconDatabase, label: 'Base de Datos', path: '/database' },
    { svg: this.iconSettings, label: 'Configuración', path: '/configuracion' },
  ];

  // Pequeñas funciones que devuelven SVG strings (se usan en el template via innerHTML)
  iconDashboard() {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z"/></svg>`;
  }

  iconSearch() {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/></svg>`;
  }

  iconExplorer() {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>`;
  }

  iconDocs() {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10M7 11h10M7 15h6M3 20h18V4H3v16z"/></svg>`;
  }

  iconUsers() {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m0-4a4 4 0 11-8 0 4 4 0 018 0zm8 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`;
  }

  iconDatabase() {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><ellipse cx="12" cy="6" rx="9" ry="3"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6v6c0 1.657 4.03 3 9 3s9-1.343 9-3V6M3 12v6c0 1.657 4.03 3 9 3s9-1.343 9-3v-6"/></svg>`;
  }

  iconSettings() {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.03 2.246c.3-.92 1.603-.92 1.902 0a1 1 0 00.95.69h.981c.99 0 1.447 1.27.707 1.903l-.708.567a1 1 0 00-.364 1.118l.309 1.02c.3.988-.523 1.92-1.48 1.555l-.987-.372a1 1 0 00-1.118.364l-.567.708c-.633.74-1.903.283-1.903-.707v-.981a1 1 0 00-.69-.95c-.92-.3-.92-1.603 0-1.902l1.02-.309a1 1 0 00.364-1.118L7.55 3.364C8.083 2.624 9.353 2.246 10.343 2.246h.687z"/></svg>`;
  }

  onToggle() {
    toggleSidebar();
  }
}
