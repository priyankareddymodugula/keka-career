import { Component } from '@angular/core';

@Component({
  selector: 'app-applications',
  template: `
  <div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8">My Applications</h1>
  <div class="space-y-6">
    <div *ngFor="let application of applications" class="bg-white shadow-md rounded-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">{{ application.jobTitle }}</h2>
        <span class="px-4 py-2 rounded-full text-sm font-medium"
              [ngClass]="{
                'bg-blue-100 text-blue-800': application.status === 'Under Review',
                'bg-green-100 text-green-800': application.status === 'Interview Scheduled',
                'bg-purple-100 text-purple-800': application.status === 'Offer Extended'
              }">
          {{ application.status }}
        </span>
      </div>
      <p class="text-gray-600 mb-2">{{ application.company }} - {{ application.location }}</p>
      <p class="text-gray-500">Applied on: {{ application.appliedDate }}</p>
    </div>
  </div>
</div>
`
})
export class ApplicationsComponent {
  applications = [
    {
      jobTitle: 'Software Engineer',
      company: 'Tech Corp',
      location: 'Remote',
      appliedDate: '2023-10-01',
      status: 'Under Review'
    },
    {
      jobTitle: 'Data Scientist',
      company: 'Data Inc',
      location: 'New York, NY',
      appliedDate: '2023-09-25',
      status: 'Interview Scheduled'
    },
    {
      jobTitle: 'Product Manager',
      company: 'Innovate LLC',
      location: 'San Francisco, CA',
      appliedDate: '2023-09-20',
      status: 'Offer Extended'
    }
  ];
}
