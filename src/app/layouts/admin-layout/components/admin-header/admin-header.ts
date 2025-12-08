import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { sidebarCollapsed, toggleSidebar } from '../sidebar.store';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-header.html',
  styleUrls: ['./admin-header.css'],
})
export class AdminHeader {
  collapsed = sidebarCollapsed;
  search = '';

  onToggleSidebar() {
    toggleSidebar();
  }
}
