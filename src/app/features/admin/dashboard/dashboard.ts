import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MockDocument {
  id: number;
  nombre: string;
  expediente: string;
  fechaCreacion: string;
  estado: 'indexed' | 'pending' | 'error';
}

// Datos de prueba
export const mockDocumentsData: MockDocument[] = [
  { id: 1, nombre: 'Contrato', expediente: 'CNT-1', fechaCreacion: '2024-08-01', estado: 'indexed' },
  { id: 2, nombre: 'Licencia', expediente: 'LIC-1', fechaCreacion: '2024-08-02', estado: 'pending' },
  { id: 3, nombre: 'Factura', expediente: 'FAC-22', fechaCreacion: '2024-08-03', estado: 'error' }
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  // 🔥 Ahora el arreglo tiene un nombre distinto y TS no se confunde
  private _docs = mockDocumentsData;

  // 🔥 Getter que *SIEMPRE* devuelve un array tipado
  get documents(): MockDocument[] {
    return [...this._docs]; // copia segura
  }

  pendingDocs = 0;
  errorDocs = 0;

  constructor() {}

  ngOnInit(): void {
    this.calculateCounts();
  }

  private calculateCounts(): void {
    // // 🔥 Como `documents` SIEMPRE es un arreglo, filter SIEMPRE existe
    // this.pendingDocs = this.documents.filter(d => d.estado === 'pending').length;
    // this.errorDocs  = this.documents.filter(d => d.estado === 'error').length;
  }

  statusLabel(estado: MockDocument['estado']): string {
    if (estado === 'indexed') return 'Indexado';
    if (estado === 'pending') return 'Pendiente';
    return 'Error';
  }

  statusBadgeClasses(estado: MockDocument['estado']): string {
    if (estado === 'indexed') return 'border-success text-success';
    if (estado === 'pending') return 'border-warning text-warning';
    return 'border-destructive text-destructive';
  }
}
