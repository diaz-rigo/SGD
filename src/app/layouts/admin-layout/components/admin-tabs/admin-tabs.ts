// Quitar las importaciones innecesarias de AdminSidebar y AdminHeader
import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef,
  ElementRef,
  inject,
  signal,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

// Tab model
type Tab = {
  id: string; // url
  title: string;
  url: string;
  active: boolean;
  created?: boolean;
  compRef?: any;
};

@Component({
  selector: 'app-admin-tabs',
  standalone: true,
  imports: [CommonModule], // Solo CommonModule
  templateUrl: './admin-tabs.html',
})
export class AdminTabs implements OnInit, OnDestroy {
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  tabs = signal<Tab[]>([]);
  trackByUrl(index: number, item: Tab) {
    return item.url;
  }

  @ViewChildren('slot', { read: ViewContainerRef }) slots!: QueryList<ViewContainerRef>;
  private tabMap = new Map<string, Tab>();
  private sub: any;

  ngOnInit(): void {
    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((ev) => this.onNavigation(ev.urlAfterRedirects));
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
    for (const t of this.tabs()) {
      if (t.compRef) {
        try {
          t.compRef.destroy();
        } catch { }
      }
    }
    this.tabs.set([]);
    this.tabMap.clear();
  }

  private async onNavigation(url: string) {
    const simpleUrl = url.split('?')[0].split('#')[0];

    if (this.tabMap.has(simpleUrl)) {
      this.activate(simpleUrl);
      return;
    }

    const title = this.titleFromUrl(simpleUrl);
    const newTab: Tab = { id: simpleUrl, title, url: simpleUrl, active: true, created: false };
    const updated = this.tabs().map(t => ({ ...t, active: false }));
    updated.push(newTab);
    this.tabs.set(updated);
    this.tabMap.set(simpleUrl, newTab);

    await Promise.resolve();
    this.cdr.detectChanges();

    this.createComponentForTab(newTab);
  }

  private activate(url: string) {
    const tabs = this.tabs().map(t => ({ ...t, active: t.url === url }));
    this.tabs.set(tabs);
    this.cdr.detectChanges();
  }

  activateTab(index: number) {
    const t = this.tabs()[index];
    if (!t) return;
    this.router.navigateByUrl(t.url);
  }

  closeTab(index: number, event: Event) {
    event.stopPropagation();
    const existing = this.tabs();
    const t = existing[index];
    if (!t) return;

    if (t.compRef) {
      try {
        t.compRef.destroy();
      } catch { }
    }
    this.tabMap.delete(t.url);

    existing.splice(index, 1);

    if (t.active) {
      const newActive = existing[index - 1] ?? existing[index] ?? null;
      if (newActive) {
        this.router.navigateByUrl(newActive.url);
      } else {
        this.router.navigateByUrl('/admin');
      }
    } else {
      this.tabs.set(existing);
    }
  }

  private titleFromUrl(url: string) {
    if (url === '/admin' || url === '/admin/') return 'Dashboard';
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1].replace(/[-_]/g, ' ').replace(/\b\w/g, (s) => s.toUpperCase());
  }

  private async createComponentForTab(t: Tab) {
    const cfg = this.findRouteConfigForUrl(t.url);
    if (!cfg) {
      t.created = true;
      this.updateTab(t);
      return;
    }

    const compType = (cfg as any).component;
    if (!compType) {
      t.created = true;
      this.updateTab(t);
      return;
    }

    const slotsArray = this.slots?.toArray() ?? [];
    const slot = slotsArray.find((s, idx) => {
      const idxTab = this.tabs().findIndex(x => x.url === t.url);
      return idx === idxTab;
    }) ?? slotsArray[slotsArray.length - 1];

    if (!slot) {
      t.created = true;
      this.updateTab(t);
      return;
    }

    if (!t.compRef) {
      try {
        const compRef = slot.createComponent<any>(compType, { index: 0 });
        t.compRef = compRef;
        t.created = true;
        this.updateTab(t);
      } catch (err) {
        console.error('Error creando componente dinámico para tab', err);
        t.created = true;
        this.updateTab(t);
      }
    } else {
      t.created = true;
      this.updateTab(t);
    }
  }

  private findRouteConfigForUrl(url: string) {
    const cfg = this.router.config.find(r => {
      if (!r.path) return false;
      const full = '/' + r.path;
      if (url === full) return true;
      if (url.startsWith(full + '/')) return true;
      return false;
    });
    return cfg;
  }

  private updateTab(tab: Tab) {
    const arr = this.tabs().map(t => (t.url === tab.url ? tab : t));
    this.tabs.set(arr);
  }
}