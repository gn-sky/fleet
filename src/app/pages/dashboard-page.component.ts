import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableModule, IconField, InputIcon, InputText, FormsModule, DialogModule, ButtonModule],
  template: `
    <section class="page-card hero-card">
      <p class="eyebrow">Dashboard</p>
      <h1>Active Fleet Overview</h1>
      <p class="lede">
        Real-time monitoring of your regional trucks and their current assignments.
      </p>
    </section>

    <div class="grid-container">
      <div class="card p-4">
        <h2 class="section-title">Sample Fleet</h2>
        
        <p-table
          #dt
          [value]="trucks()"
          [paginator]="true"
          [rows]="5"
          [rowsPerPageOptions]="[5, 10, 20]"
          [globalFilterFields]="['id', 'model', 'city', 'state', 'status']"
          [tableStyle]="{ 'min-width': '50rem' }"
          styleClass="p-datatable-sm"
        >
          <ng-template #caption>
            <div class="flex justify-end p-2 pb-0">
              <p-iconfield>
                <p-inputicon class="pi pi-search" />
                <input pInputText type="text" (input)="dt.filterGlobal($any($event.target).value, 'contains')" placeholder="Global Search..." />
              </p-iconfield>
            </div>
          </ng-template>

          <ng-template #header>
            <tr>
              <th pSortableColumn="id">ID <p-sortIcon field="id" /></th>
              <th pSortableColumn="model">Model <p-sortIcon field="model" /></th>
              <th pSortableColumn="city">City <p-sortIcon field="city" /></th>
              <th pSortableColumn="state">State <p-sortIcon field="state" /></th>
              <th pSortableColumn="status">Status <p-sortIcon field="status" /></th>
              <th style="width: 4rem"></th>
            </tr>
          </ng-template>

          <ng-template #body let-truck>
            <tr>
              <td class="font-semibold">{{ truck.id }}</td>
              <td>{{ truck.model }}</td>
              <td>{{ truck.city }}</td>
              <td>{{ truck.state }}</td>
              <td>
                <span class="status-badge" 
                      [class.status--active]="truck.status === 'In Transit'" 
                      [class.status--idle]="truck.status === 'Idle'"
                      [class.status--maint]="truck.status === 'Maintenance'">
                  {{ truck.status }}
                </span>
              </td>
              <td>
                <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="secondary" (onClick)="openEdit(truck)" />
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    </div>

    <!-- Edit Location Dialog -->
    <p-dialog 
      [header]="'Edit Location'" 
      [visible]="editDialogVisible()" 
      (visibleChange)="editDialogVisible.set($event)"
      [modal]="true" 
      [style]="{ width: '25rem' }">
      
      @if (editingTruck()) {
        <span class="p-text-secondary block mb-6">Update location for {{ editingTruck()?.id }}</span>
        
        <div class="flex flex-col gap-4 py-4">
          <div class="flex items-center gap-4">
            <label for="city" class="font-semibold w-16">City</label>
            <input pInputText id="city" [ngModel]="editCity()" (ngModelChange)="editCity.set($event)" class="flex-auto" autocomplete="off" />
          </div>
          <div class="flex items-center gap-4">
            <label for="state" class="font-semibold w-16">State</label>
            <input pInputText id="state" [ngModel]="editState()" (ngModelChange)="editState.set($event)" class="flex-auto" autocomplete="off" />
          </div>
        </div>
        
        <div class="flex justify-end gap-2 mt-4">
          <p-button label="Cancel" severity="secondary" [text]="true" (onClick)="editDialogVisible.set(false)" />
          <p-button label="Save" (onClick)="saveEdit()" />
        </div>
      }
    </p-dialog>
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

    .card {
        background: rgb(255 255 255 / 0.95);
        border: 1px solid var(--border);
        border-radius: 1rem;
        box-shadow: var(--shadow);
    }

    .flex { display: flex; }
    .flex-col { flex-direction: column; }
    .items-center { align-items: center; }
    .flex-auto { flex: 1 1 auto; width: 100%; }
    .justify-end { justify-content: flex-end; }
    .p-2 { padding: 0.5rem; }
    .pb-0 { padding-bottom: 0; }
    .p-4 { padding: 1.5rem; }
    .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
    .font-semibold { font-weight: 600; }
    .w-16 { width: 4rem; }
    .gap-2 { gap: 0.5rem; }
    .gap-4 { gap: 1rem; }
    .mt-4 { margin-top: 1rem; }
    .mb-6 { margin-bottom: 1.5rem; }
    .block { display: block; }
    .p-text-secondary { color: var(--text-muted); }

    .hero-card {
      min-height: 16rem;
      margin-bottom: 2rem;
      background:
        radial-gradient(circle at top right, rgb(15 118 110 / 0.18), transparent 24%),
        linear-gradient(180deg, rgb(255 255 255 / 0.88), rgb(255 255 255 / 0.72));
    }

    .eyebrow {
      margin: 0 0 0.75rem;
      color: var(--accent);
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
      color: var(--text-muted);
      font-size: 1.05rem;
      line-height: 1.6;
    }

    .section-title {
      font-size: 1.5rem;
      margin: 0 0 1rem;
      color: var(--text-strong);
    }

    .status-badge {
      display: inline-flex;
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .status--active { background: rgb(15 118 110 / 0.12); color: #0b5e58; }
    .status--idle { background: rgb(93 108 120 / 0.12); color: #3b464f; }
    .status--maint { background: rgb(220 38 38 / 0.12); color: #991b1b; }
  `
})
export default class DashboardPageComponent {
  readonly trucks = signal(
    Array.from({ length: 42 }).map((_, i) => {
      const locations = [
        { city: 'Dallas', state: 'TX' },
        { city: 'Atlanta', state: 'GA' },
        { city: 'Denver', state: 'CO' },
        { city: 'Chicago', state: 'IL' },
        { city: 'Phoenix', state: 'AZ' },
        { city: 'Charlotte', state: 'NC' }
      ];
      const loc = locations[Math.floor(Math.random() * locations.length)];
      
      return {
        id: `TRK-${1000 + i}`,
        model: ['Cascadia', 'VNL 860', 'T680', '579', 'Anthem'][Math.floor(Math.random() * 5)],
        city: loc.city,
        state: loc.state,
        status: ['In Transit', 'Idle', 'Maintenance', 'In Transit'][Math.floor(Math.random() * 4)]
      };
    })
  );

  readonly editDialogVisible = signal(false);
  readonly editingTruck = signal<any>(null);
  
  readonly editCity = signal('');
  readonly editState = signal('');

  openEdit(truck: any) {
    this.editingTruck.set(truck);
    this.editCity.set(truck.city);
    this.editState.set(truck.state);
    this.editDialogVisible.set(true);
  }

  saveEdit() {
    const active = this.editingTruck();
    if (active) {
      this.trucks.update(list => list.map(t => 
        t.id === active.id 
          ? { ...t, city: this.editCity(), state: this.editState() }
          : t
      ));
    }
    this.editDialogVisible.set(false);
  }
}

