import { Component, Input } from "@angular/core"

@Component({
  selector: "app-job-card",
  template: `
    <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div class="flex flex-col md:flex-row md:items-center">
        <div class="md:mr-6 mb-4 md:mb-0">
          <img
            [src]="job.company.logo"
            [alt]="job.company.name"
            class="w-16 h-16 object-contain rounded-md border border-gray-200"
          />
        </div>
        <div class="flex-grow">
          <h3 class="text-xl font-semibold mb-1">
            <a [routerLink]="['/job', job.id]" class="hover:text-primary">{{ job.title }}</a>
          </h3>
          <div class="flex items-center mb-2">
            <a [routerLink]="['/company', job.company.id]" class="text-gray-700 hover:text-primary">{{ job.company.name }}</a>
            <span class="mx-2 text-gray-400">•</span>
            <span class="text-gray-600">{{ job.location }}</span>
          </div>
          <div class="flex flex-wrap gap-2 mb-3">
            <span *ngFor="let skill of job.skills.slice(0, 3)" class="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm">
              {{ skill }}
            </span>
            <span *ngIf="job.skills.length > 3" class="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm">
              +{{ job.skills.length - 3 }} more
            </span>
          </div>
          <div class="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 gap-y-2">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {{ job.experience }}
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ job.salary }}
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ job.jobType }}
            </div>
          </div>
        </div>
        <div class="mt-4 md:mt-0 md:ml-4 flex flex-col items-end">
          <a
            [routerLink]="['/job', job.id]"
            class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark font-medium"
          >
            Apply Now
          </a>
          <span class="text-sm text-gray-500 mt-2">{{ job.postedDate }}</span>
        </div>
      </div>
    </div>
  `,
})
export class JobCardComponent {
  @Input() job: any = {
    id: "",
    title: "",
    company: {
      id: "",
      name: "",
      logo: "",
    },
    location: "",
    skills: [],
    experience: "",
    salary: "",
    jobType: "",
    postedDate: "",
  }
}

