import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Document {
  id: number;
  nombre: string;
  tipo: string;
  expediente: string;
  titular: string;
  proyecto: string;
  fechaCreacion: string;
  paginas: number;
  tamaño: string;
  notas: string[];
  estado: 'indexed' | 'pending' | 'error';
}

@Component({
  selector: 'app-search',
  templateUrl: './search.html',  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  styleUrls: ['./search.css'],
})
export class SearchComponent {
  showFilters = false;

toggleFilters() {
  this.showFilters = !this.showFilters;
}

  filtersForm: FormGroup;
  hasSearched = false;
  viewMode: 'grid' | 'list' = 'grid';
  selectedDocument: Document | null = null;
  isViewerOpen = false;

  documents: Document[] = [
    {
      id: 1,
      nombre: 'Documento 1',
      tipo: 'PDF',
      expediente: 'EXP-001',
      titular: 'Juan Pérez',
      proyecto: 'Proyecto A',
      fechaCreacion: '2025-12-01',
      paginas: 10,
      tamaño: '1.2 MB',
      notas: ['Nota 1', 'Nota 2'],
      estado: 'indexed',
    },
    {
      id: 2,
      nombre: 'Documento 2',
      tipo: 'Word',
      expediente: 'EXP-002',
      titular: 'Ana Gómez',
      proyecto: 'Proyecto B',
      fechaCreacion: '2025-11-25',
      paginas: 5,
      tamaño: '500 KB',
      notas: [],
      estado: 'pending',
    },
  ];

  filteredDocuments: Document[] = [];

  constructor(private fb: FormBuilder) {
    this.filtersForm = this.fb.group({
      query: [''],
      tipoDocumento: [''],
      fechaDesde: [''],
      fechaHasta: [''],
      proyecto: [''],
      expediente: [''],
      titular: [''],
    });
  }

  search() {
    const filters = this.filtersForm.value;
    this.hasSearched = true;

    this.filteredDocuments = this.documents.filter((doc) => {
      const matchesQuery =
        !filters.query ||
        doc.nombre.toLowerCase().includes(filters.query.toLowerCase()) ||
        doc.expediente.toLowerCase().includes(filters.query.toLowerCase()) ||
        doc.titular.toLowerCase().includes(filters.query.toLowerCase());

      const matchesType = !filters.tipoDocumento || doc.tipo === filters.tipoDocumento;
      const matchesProject = !filters.proyecto || doc.proyecto === filters.proyecto;
      const matchesExpediente =
        !filters.expediente || doc.expediente.toLowerCase().includes(filters.expediente.toLowerCase());
      const matchesTitular =
        !filters.titular || doc.titular.toLowerCase().includes(filters.titular.toLowerCase());

      const matchesDateFrom = !filters.fechaDesde || doc.fechaCreacion >= filters.fechaDesde;
      const matchesDateTo = !filters.fechaHasta || doc.fechaCreacion <= filters.fechaHasta;

      return (
        matchesQuery &&
        matchesType &&
        matchesProject &&
        matchesExpediente &&
        matchesTitular &&
        matchesDateFrom &&
        matchesDateTo
      );
    });
  }

  clear() {
    this.filtersForm.reset();
    this.hasSearched = false;
    this.filteredDocuments = [];
  }

  viewDocument(doc: Document) {
    this.selectedDocument = doc;
    this.isViewerOpen = true;
  }

  closeViewer() {
    this.isViewerOpen = false;
  }

  downloadDocument(doc: Document) {
    alert(`Descargando: ${doc.nombre}`);
  }

  deleteDocument(doc: Document) {
    alert(`Documento eliminado: ${doc.nombre}`);
  }
}
