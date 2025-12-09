import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'neutral' | 'negative';
  icon: string; // Material icon name
}



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  pendingDocs = 0;
  errorDocs = 0;

  stats: StatCard[] = [
    {
      title: 'Total Documentos',
      value: '32,456',
      change: '+12%',
      changeType: 'positive',
      icon: 'description',
    },
    {
      title: 'Expedientes Activos',
      value: '30,892',
      change: '+5%',
      changeType: 'positive',
      icon: 'folder_open',
    },
    {
      title: 'Usuarios Activos',
      value: '24',
      change: '+2',
      changeType: 'positive',
      icon: 'group',
    },
    {
      title: 'Almacenamiento',
      value: '4.2 TB',
      change: '52%',
      changeType: 'neutral',
      icon: 'hard_drive',
    },
  ];

  recentActivity = [
    { action: 'Documento indexado', document: 'Contrato CNT-2024-089', time: 'Hace 5 min', status: 'success' },
    { action: 'Usuario creado', document: 'operador2@stch.gob.mx', time: 'Hace 15 min', status: 'success' },
    { action: 'Error de indexación', document: 'Licencia LIC-2024-045', time: 'Hace 30 min', status: 'error' },
    { action: 'Respaldo completado', document: 'Backup diario', time: 'Hace 1 hora', status: 'success' },
    { action: 'Documento descargado', document: 'Expediente EXP-2024-001', time: 'Hace 2 horas', status: 'success' },
  ];
  documents = [
    {
      id: 1,
      nombre: 'Contrato CNT-2024-089',
      expediente: 'CNT-2024-089',
      fechaCreacion: '2024-01-12',
      estado: 'indexed'
    },
    {
      id: 2,
      nombre: 'Usuario creado',
      expediente: 'operador2@stch.gob.mx',
      fechaCreacion: '2024-01-12',
      estado: 'indexed'
    },
    {
      id: 3,
      nombre: 'Licencia LIC-2024-045',
      expediente: 'LIC-2024-045',
      fechaCreacion: '2024-01-12',
      estado: 'error'
    },
    {
      id: 4,
      nombre: 'Backup diario',
      expediente: 'Respaldo',
      fechaCreacion: 'Hace 1 hora',
      estado: 'indexed'
    },
    {
      id: 5,
      nombre: 'Expediente EXP-2024-001',
      expediente: 'EXP-2024-001',
      fechaCreacion: 'Hace 2 horas',
      estado: 'indexed'
    }
  ];

  getEstadoTexto(estado: string) {
    if (estado === 'indexed') return 'Indexado';
    if (estado === 'pending') return 'Pendiente';
    return 'Error';
  }
}
