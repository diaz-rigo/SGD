// sidebar.store.ts
import { signal } from '@angular/core';

/**
 * Estado compartido del sidebar entre header y sidebar.
 * Usamos signals para simplicidad.
 */
export const sidebarCollapsed = signal(false);

export function toggleSidebar() {
  sidebarCollapsed.update(v => !v);
}

export function setSidebarCollapsed(value: boolean) {
  sidebarCollapsed.set(value);
}
