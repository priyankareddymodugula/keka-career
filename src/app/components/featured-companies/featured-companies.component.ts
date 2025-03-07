import { Component, Input } from "@angular/core"

@Component({
  selector: "app-featured-companies",
  template: `
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      <a
        *ngFor="let company of companies"
        [routerLink]="['/company', company.id]"
        class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
      >
        <img
          [src]="company.logo"
          [alt]="company.name"
          class="w-20 h-20 object-contain mb-4"
        />
        <h3 class="font-medium text-center">{{ company.name }}</h3>
        <p class="text-sm text-gray-500 text-center mt-1">{{ company.openJobs }} open jobs</p>
      </a>
    </div>
  `,
})
export class FeaturedCompaniesComponent {
  @Input() companies: any[] = []
}

