// explorer.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-explorer',
  imports: [CommonModule],
  templateUrl: './explorer.html',
  styleUrl: './explorer.css',
})
export class Explorer {
  // Contratos folders data
  contratosFolders = [
    { name: 'Contratos 2024', icon: 'folder' },
    { name: 'Contratos 2023', icon: 'folder' },
    { name: 'Contratos Históricos', icon: 'folder' },
    { name: 'Licencias', icon: 'folder' },
    { name: 'Expedientes Técnicos', icon: 'folder' },
    { name: 'Pólizas', icon: 'folder' },
    { name: 'Actas', icon: 'folder' },
    { name: 'Incidentes', icon: 'folder' }
  ];

  // Document data
  documentos = [
    {
      nombre: 'Contrato de Servicio 2024-001',
      expediente: 'EXP-2024-001',
      persona: 'Juan Pérez García',
      fecha: '2024-01-15',
      paginas: '12 páginas',
      tamaño: '2.4 MB',
      etiquetas: ['PDF', 'Indexado']
    }
  ];

  // Document count
  get documentoCount(): number {
    return this.documentos.length;
  }
}