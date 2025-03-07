import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import  { JobMatchService } from "../../../services/job-match.service"
import  { AuthService } from "../../../services/auth.service"
import { MatchScoreComponent } from "../../../components/match-score/match-score.component"

@Component({
  selector: "app-opportunities",
  template: `
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Matched Opportunities</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Jobs that match your profile.</p>
      </div>
      <div class="border-t border-gray-200">
        <ul role="list" class="divide-y divide-gray-200">
          <li *ngFor="let job of matchedJobs" class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-primary truncate">{{job.title}}</p>
              <div class="ml-2 flex-shrink-0 flex">
                <app-match-score [score]="job.matchScore"></app-match-score>
              </div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <p class="flex items-center text-sm text-gray-500">
                  <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clip-rule="evenodd" />
                  </svg>
                  {{job.company}}
                </p>
                <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  {{job.location}}
                </p>
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                <p>
                  Posted on <time [dateTime]="job.postedDate">{{job.postedDate | date}}</time>
                </p>
              </div>
            </div>
            <div class="mt-4">
              <button (click)="applyForJob(job)" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Apply
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class OpportunitiesComponent implements OnInit {
  matchedJobs: any[] = []

  constructor(
    private jobMatchService: JobMatchService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.jobMatchService.getMatchedJobs(user).subscribe(
          (jobs) => {
            this.matchedJobs = jobs
          },
          (error) => {
            console.error("Error fetching matched jobs:", error)
          },
        )
      }
    })
  }

  applyForJob(job: any) {
    // Here you would typically send an application to your server
    console.log("Applying for job:", job)
    // You could also update the UI to show that the user has applied
    job.applied = true
  }
}

