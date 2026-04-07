import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

type NavigationItem = {
  readonly label: string;
  readonly route: string;
};

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = 'Fleet';
  protected readonly isMenuOpen = signal(false);
  protected readonly navigationItems: readonly NavigationItem[] = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Fleet', route: '/fleet' },
    { label: 'Reports', route: '/reports' },
    { label: 'Settings', route: '/settings' }
  ];

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
