import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  // imports: [StatsComponent,PendientesAprobacion,PublicacionesRevision],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',

  standalone:true
})
export class Dashboard {
 dashboardStats = [
    { title: 'Vendedores Activos',  value: '156',   change: '+12',  icon: 'group',         color: 'text-blue-600' },
    { title: 'Publicaciones Totales', value: '2,847', change: '+89',  icon: 'inventory_2',   color: 'text-green-600' },
    { title: 'Pedidos del Mes',      value: '1,234', change: '+156', icon: 'shopping_cart', color: 'text-purple-600' },
    { title: 'Ingresos Estimados',   value: '$45,670', change: '+23%', icon: 'trending_up',  color: 'text-orange-600' },
  ];
}
