import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { AuthService } from "../../../services/auth.service"
import { RecruiterService } from "src/app/services/recruiter.service"

@Component({
  selector: "app-saved-jobs",
  template: `
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Saved Jobs</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Jobs you've saved for later.</p>
      </div>
      <div class="border-t border-gray-200">
        <ul role="list" class="divide-y divide-gray-200">
          <li *ngFor="let job of savedJobs" class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-primary truncate">{{job.Name}}</p>
              <div class="ml-2 flex-shrink-0 flex">
                <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{job["Job Type"]}}
                </p>
              </div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <p class="flex items-center text-sm text-gray-500">
                  <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clip-rule="evenodd" />
                  </svg>
                  {{job.companyName}}
                </p>
                <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  {{job.Location}} ({{job["Work Mode"]}})
                </p>
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                <p>
                  Saved on <time [dateTime]="job.savedDate">{{job.savedDate | date}}</time>
                </p>
              </div>
            </div>
            <div class="mt-2">
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let skill of job['Candidate Preference']['Skill Set'].slice(0, 3)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {{skill}}
                </span>
                <span *ngIf="job['Candidate Preference']['Skill Set'].length > 3" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  +{{job['Candidate Preference']['Skill Set'].length - 3}} more
                </span>
              </div>
            </div>
            <div class="mt-2 text-sm text-gray-500">
              <span class="font-medium">Experience:</span> {{job['Candidate Preference'].Experience}} |
              <span class="font-medium">Salary:</span> {{job['Candidate Preference']['Salary Range']}}
            </div>
            <div class="mt-4 flex space-x-3">
              <a [routerLink]="['/job', job.id]" class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                View Job
              </a>
              <button (click)="applyForJob(job)" class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Apply
              </button>
              <button (click)="removeFromSaved(job)" class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Remove
              </button>
            </div>
          </li>
          <li *ngIf="savedJobs.length === 0" class="px-4 py-8 text-center">
            <p class="text-gray-500">You haven't saved any jobs yet.</p>
            <a routerLink="/dashboard/opportunities" class="mt-2 inline-block text-primary hover:text-primary-dark">Browse jobs</a>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class SavedJobsComponent implements OnInit {
  savedJobs: any[] = []

  constructor(private authService: AuthService,private recrutierService : RecruiterService) {}

  ngOnInit() {
   this.savedJobs = this.recrutierService.getAllTheSavedJobs()
  }

  applyForJob(job: any) {
    // In a real app, you would call a service to apply for the job
    console.log("Applying for job:", job.id)
    alert(`Application submitted for ${job.Name} at ${job.companyName}`)
    // After applying, you might want to remove the job from saved jobs
    job.applied = true;
    job.saved = false;
    this.savedJobs = this.recrutierService.getAllTheSavedJobs()
  }

  removeFromSaved(job: any) {
    // In a real app, you would call a service to remove the job from saved jobs
    console.log("Removing job from saved:", job.id)
    job.saved = false;
    this.recrutierService.removeSave(job)
      this.savedJobs = this.recrutierService.getAllTheSavedJobs()
  }
}

