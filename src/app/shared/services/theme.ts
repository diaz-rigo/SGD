import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private key = 'theme';
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  init() {
    if (!this.isBrowser) return;

    const saved = this.safeGet() as Theme | null;
    const prefersDark =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    const theme: Theme = saved ?? (prefersDark ? 'dark' : 'light');
    this.apply(theme);
  }

  toggle() {
    if (!this.isBrowser) return;
    const root = document.documentElement;
    const next: Theme = root.classList.contains('dark') ? 'light' : 'dark';
    this.apply(next);
  }
  apply(theme: Theme) {
    if (!this.isBrowser) return;
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.setAttribute('data-theme', theme);
    this.safeSet(theme);
  }

  private safeGet(): string | null {
    try { return localStorage.getItem(this.key); } catch { return null; }
  }

  private safeSet(value: string) {
    try { localStorage.setItem(this.key, value); } catch {}
  }
}
