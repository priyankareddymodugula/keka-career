import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  template: `
  <div class="min-h-screen flex flex-col">

  <app-dashboard-navbar></app-dashboard-navbar>
  <div class="py-10">
        <main>
          <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>

  <app-footer></app-footer>
</div>



  `,
})
export class DashboardLayoutComponent {}
