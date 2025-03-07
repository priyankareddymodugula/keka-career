import { Component, type OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { JobService } from "../../services/job.service"

@Component({
  selector: "app-job-details",
  template: `
    <div class="container mx-auto px-4 py-8">
      <div *ngIf="job" class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <div class="flex flex-col md:flex-row md:items-start">
            <img
              [src]="job.company.logo"
              [alt]="job.company.name"
              class="w-16 h-16 object-contain rounded-md border border-gray-200 mb-4 md:mb-0 md:mr-6"
            />
            <div class="flex-grow">
              <h1 class="text-2xl font-bold mb-2">{{ job.title }}</h1>
              <div class="flex items-center mb-4">
                <a [routerLink]="['/company', job.company.id]" class="text-primary hover:text-primary-dark">
                  {{ job.company.name }}
                </a>
                <span class="mx-2 text-gray-400">•</span>
                <span class="text-gray-600">{{ job.location }}</span>
              </div>
              <div class="flex flex-wrap gap-2 mb-6">
                <span *ngFor="let skill of job.skills" class="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm">
                  {{ skill }}
                </span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-6">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Experience: {{ job.experience }}</span>
                </div>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Salary: {{ job.salary }}</span>
                </div>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Job Type: {{ job.jobType }}</span>
                </div>
              </div>
              <div class="flex flex-col sm:flex-row gap-4">
                <button class="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark font-medium">
                  Apply Now
                </button>
                <button class="border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50 font-medium flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Save Job
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-xl font-bold mb-4">Job Description</h2>
          <div class="prose max-w-none">
            <p>
              We are looking for a talented {{ job.title }} to join our team at {{ job.company.name }}.
              This is an exciting opportunity to work on cutting-edge projects and make a significant impact.
            </p>
            <h3>Responsibilities:</h3>
            <ul>
              <li>Design, develop, and maintain high-quality applications</li>
              <li>Collaborate with cross-functional teams to define, design, and ship new features</li>
              <li>Identify and address performance bottlenecks</li>
              <li>Ensure the technical feasibility of UI/UX designs</li>
              <li>Optimize applications for maximum speed and scalability</li>
            </ul>
            <h3>Requirements:</h3>
            <ul>
              <li>{{ job.experience }} of professional experience</li>
              <li>Strong proficiency in {{ job.skills.join(', ') }}</li>
              <li>Excellent problem-solving skills</li>
              <li>Strong communication and teamwork skills</li>
              <li>Bachelor's degree in Computer Science or related field (or equivalent experience)</li>
            </ul>
            <h3>Benefits:</h3>
            <ul>
              <li>Competitive salary: {{ job.salary }}</li>
              <li>Flexible work arrangements</li>
              <li>Health, dental, and vision insurance</li>
              <li>401(k) matching</li>
              <li>Professional development opportunities</li>
              <li>Paid time off and holidays</li>
            </ul>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold mb-4">About {{ job.company.name }}</h2>
          <div class="flex items-center mb-4">
            <img
              [src]="job.company.logo"
              [alt]="job.company.name"
              class="w-12 h-12 object-contain rounded-md border border-gray-200 mr-4"
            />
            <div>
              <h3 class="font-medium">{{ job.company.name }}</h3>
              <p class="text-sm text-gray-500">{{ job.location }}</p>
            </div>
          </div>
          <p class="mb-4">
            {{ job.company.name }} is a leading company in the technology industry, focused on delivering innovative solutions to clients worldwide.
          </p>
          <a [routerLink]="['/company', job.company.id]" class="text-primary hover:text-primary-dark font-medium">
            View Company Profile
          </a>
        </div>
      </div>
    </div>
  `,
})
export class JobDetailsComponent implements OnInit {
  jobId = ""
  job: any = null

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.jobId = params.get("id") || ""
      this.loadJobDetails()
    })
  }

  loadJobDetails(): void {
    this.jobService.getJobById(this.jobId).subscribe((data) => {
      this.job = data
    })
  }
}

