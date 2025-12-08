import { Component } from '@angular/core';
import { AdminHeader } from './components/admin-header/admin-header';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AdminSidebar } from './components/admin-sidebar/admin-sidebar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true, // Añadir standalone
  imports: [AdminHeader, HttpClientModule, CommonModule, AdminSidebar, RouterModule],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css'],
})
export class AdminLayout {}
