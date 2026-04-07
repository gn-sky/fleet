import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-fleet-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-card">
      <p class="eyebrow">Fleet</p>
      <h1>Operational view</h1>
      <p>
        This route is reserved for vehicle, device, or asset inventory once the core domain model is in place.
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

    .eyebrow {
      margin: 0 0 0.75rem;
      color: #0f766e;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0;
      font-size: clamp(2rem, 4vw, 3rem);
    }

    p {
      max-width: 42rem;
      margin: 1rem 0 0;
      color: #5d6c78;
      line-height: 1.6;
    }
  `
})
export default class FleetPageComponent {}
