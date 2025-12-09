import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface NavItem {
  icon: string;
  label: string;
  path: string;
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.html',
  styleUrls: ['./admin-sidebar.css'],
})
export class AdminSidebar {
  collapsed = false;

  navItems: NavItem[] = [
    { icon: 'space_dashboard', label: 'Dashboard', path: '/admin/dashboard' },
    { icon: 'search', label: 'Búsqueda', path: '/admin/busqueda' },
    { icon: 'folder_open', label: 'Explorador', path: '/admin/explorador' },
    { icon: 'description', label: 'Documentos', path: '/admin/documentos' },
    { icon: 'group', label: 'Usuarios', path: '/usuarios' },
    // { icon: 'database', label: 'Base de Datos', path: '/database' },
    { icon: 'settings', label: 'Configuración', path: '/configuracion' },
  ];

  constructor(public router: Router) {}

  toggle() {
    this.collapsed = !this.collapsed;
  }

  isActive(path: string) {
    return this.router.url === path;
  }
}
