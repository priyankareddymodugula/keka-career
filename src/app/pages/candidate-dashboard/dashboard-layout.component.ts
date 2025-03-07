import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  template: `
    <div class="min-h-screen flex flex-col">
      <app-header></app-header>
      <div class="flex-grow flex flex-col md:flex-row">
        <app-dashboard-sidebar></app-dashboard-sidebar>
        <main class="flex-grow p-4 md:p-8 bg-gray-50">
          <router-outlet></router-outlet>
        </main>
      </div>
      <app-footer></app-footer>
    </div>
  `,
})
export class DashboardLayoutComponent {}
