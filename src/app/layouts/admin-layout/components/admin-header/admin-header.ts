import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { sidebarCollapsed, toggleSidebar } from '../sidebar.store';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface NotificationItem {
  title: string;
  body: string;
  date?: string;
}
@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-header.html',
  styleUrls: ['./admin-header.css'],
})
export class AdminHeader {
  @ViewChild('notifTrigger', { read: ElementRef }) notifTrigger?: ElementRef;
  @ViewChild('userTrigger', { read: ElementRef }) userTrigger?: ElementRef;
  @ViewChild('notifMenu', { read: ElementRef }) notifMenu?: ElementRef;
  @ViewChild('userMenu', { read: ElementRef }) userMenu?: ElementRef;

  notifications: NotificationItem[] = [
    {
      title: 'Nuevo documento indexado',
      body: 'Contrato de Servicio 2024-002 ha sido procesado',
    },
    {
      title: 'Error de indexación',
      body: 'El documento RUT-023 requiere revisión manual',
    },
    {
      title: 'Respaldo completado',
      body: 'Respaldo diario ejecutado correctamente',
    },
  ];

  notifOpen = false;
  userOpen = false;

  // Datos del usuario (ejemplo)
  user = {
    initials: 'AG',
    name: 'Admin General',
    role: 'Administrador',
  };

  constructor(private host: ElementRef, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  toggleNotif() {
    this.notifOpen = !this.notifOpen;
    if (this.notifOpen) this.userOpen = false;
  }

  toggleUser() {
    this.userOpen = !this.userOpen;
    if (this.userOpen) this.notifOpen = false;
  }

  // Cerrar al hacer click fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as Node;
    if (this.notifOpen) {
      if (
        this.notifTrigger &&
        this.notifMenu &&
        !this.notifTrigger.nativeElement.contains(target) &&
        !this.notifMenu.nativeElement.contains(target)
      ) {
        this.notifOpen = false;
      }
    }
    if (this.userOpen) {
      if (
        this.userTrigger &&
        this.userMenu &&
        !this.userTrigger.nativeElement.contains(target) &&
        !this.userMenu.nativeElement.contains(target)
      ) {
        this.userOpen = false;
      }
    }
  }

  // Acciones de ejemplo
  goToProfile() {
    this.userOpen = false;
    this.router.navigate(['/perfil']);
  }

  logout() {
    this.userOpen = false;
    // Lógica de cierre de sesión aquí
    console.log('Cerrar sesión');
  }
}
