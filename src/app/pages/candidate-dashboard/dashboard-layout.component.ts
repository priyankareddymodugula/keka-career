import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  template: `

      <div class="flex-grow flex flex-col md:flex-row">
        <div>
        <app-dashboard-navbar></app-dashboard-navbar>
        <div class="mt-10">
        <router-outlet></router-outlet>

        </div>
        </div>

      <!--
      <app-candidate-dashboard></app-candidate-dashboard> -->

        <main class="flex-grow p-4 md:p-8 bg-gray-50">

        </main>
      </div>

  `,
})
export class DashboardLayoutComponent {}
