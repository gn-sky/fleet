import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-card hero-card">
      <p class="eyebrow">Dashboard</p>
      <h1>Navigation foundation for a standards-first web app.</h1>
      <p class="lede">
        The shell is now routed, responsive, and ready for feature modules to grow behind the menu.
      </p>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .page-card {
      padding: 2rem;
      border: 1px solid rgb(19 32 43 / 0.1);
      border-radius: 2rem;
      background: rgb(255 255 255 / 0.72);
      box-shadow: 0 18px 40px rgb(19 32 43 / 0.08);
    }

    .hero-card {
      min-height: 22rem;
      background:
        radial-gradient(circle at top right, rgb(15 118 110 / 0.18), transparent 24%),
        linear-gradient(180deg, rgb(255 255 255 / 0.88), rgb(255 255 255 / 0.72));
    }

    .eyebrow {
      margin: 0 0 0.75rem;
      color: #0f766e;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    h1 {
      max-width: 12ch;
      margin: 0;
      font-size: clamp(2.4rem, 5vw, 4.8rem);
      line-height: 0.95;
    }

    .lede {
      max-width: 42rem;
      margin: 1rem 0 0;
      color: #5d6c78;
      font-size: 1.05rem;
      line-height: 1.6;
    }
  `
})
export default class DashboardPageComponent {}
