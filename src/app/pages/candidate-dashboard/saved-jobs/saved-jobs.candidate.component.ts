import { Component } from '@angular/core';

@Component({
  selector: 'app-saved-jobs',
  template: `<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8">Saved Jobs</h1>
  <div class="space-y-6">
    <div *ngFor="let job of savedJobs" class="bg-white shadow-md rounded-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">{{ job.jobTitle }}</h2>
        <div class="flex space-x-4">
          <button (click)="applyToJob(job)" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Apply
          </button>
          <button (click)="deleteJob(job.id)" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
      <p class="text-gray-600 mb-2">{{ job.company }} - {{ job.location }}</p>
      <p class="text-gray-500">Saved on: {{ job.savedDate }}</p>
    </div>
  </div>
</div>`
})
export class SavedJobsComponent {
  savedJobs = [
    {
      id: 1,
      jobTitle: 'Software Engineer',
      company: 'Tech Corp',
      location: 'Remote',
      savedDate: '2023-10-01'
    },
    {
      id: 2,
      jobTitle: 'Data Scientist',
      company: 'Data Inc',
      location: 'New York, NY',
      savedDate: '2023-09-25'
    },
    {
      id: 3,
      jobTitle: 'Product Manager',
      company: 'Innovate LLC',
      location: 'San Francisco, CA',
      savedDate: '2023-09-20'
    }
  ];

  applyToJob(job: any) {
    // Here you can implement the logic to apply to the job
    console.log('Applying to job:', job);
    // For example, you can navigate to an application form or send an API request
    alert(`You have applied to ${job.jobTitle} at ${job.company}`);
  }

  deleteJob(jobId: number) {
    // Here you can implement the logic to delete the job
    this.savedJobs = this.savedJobs.filter(job => job.id !== jobId);
    console.log('Deleted job with id:', jobId);
  }
}
