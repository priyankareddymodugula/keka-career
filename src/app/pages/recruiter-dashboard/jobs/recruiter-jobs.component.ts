import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import  { RecruiterService } from "../../../services/recruiter.service"

@Component({
  selector: "app-recruiter-jobs",
  template: `
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">My Job Postings</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Manage your job listings and view candidates.</p>
        </div>
        <div>
          <a routerLink="../create-job" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Create New Job
          </a>
        </div>
      </div>
      <div class="border-t border-gray-200">
        <ul role="list" class="divide-y divide-gray-200">
          <li *ngFor="let job of displayJobs" class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-primary truncate">{{job.Name}}</p>
              <div class="ml-2 flex-shrink-0 flex">
                <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                   [ngClass]="{
                     'bg-green-100 text-green-800': job.status === 'Active',
                     'bg-yellow-100 text-yellow-800': job.status === 'Draft',
                     'bg-red-100 text-red-800': job.status === 'Closed'
                   }">
                  {{job.status}}
                </p>
              </div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <p class="flex items-center text-sm text-gray-500">
                  <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  {{job.Location}} ({{job['Work Mode']}})
                </p>
                <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                  </svg>
                  {{job['Candidate Preference']['Salary Range']}}
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
            <div class="mt-4 flex space-x-3">
              <a [routerLink]="['../matched-candidates', job.id]" class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                View Matched Candidates
              </a>
              <a  [routerLink]="['../create-job', job.id]" (click)="editJob(job)" class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Edit
              </a>
              <button (click)="toggleJobStatus(job)" class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                {{job.status === 'Active' ? 'Close' : 'Activate'}}
              </button>
            </div>
          </li>
        </ul>
        <div class="pagination">
    <button class="pagination-btn" (click)="goToPreviousPage()" [disabled]="currentPage === 1">Previous</button>
    <span class="page-number">Page {{ currentPage }} of {{ totalPages }}</span>
    <button class="pagination-btn" (click)="goToNextPage()" [disabled]="currentPage === totalPages">Next</button>
  </div>
      </div>
    </div>
  `,
})
export class RecruiterJobsComponent implements OnInit {
  jobs: any[] = [];
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 8;
  displayJobs : any[] = [];

  constructor(private recruiterService: RecruiterService) {}
  updatePagination(): void {
    this.totalPages = Math.ceil(this.jobs.length / this.itemsPerPage);
    this.displayJobs = this.jobs.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  ngOnInit() {
    this.recruiterService.getRecruiterJobs().subscribe(
      (jobs) => {
        this.jobs = jobs;
        this.updatePagination();
      },
      (error) => {
        console.error("Error fetching recruiter jobs:", error)
      },
    )
  }

  editJob(job: any) {
    // Navigate to edit job page or open modal
    console.log("Edit job:", job)
  }

  toggleJobStatus(job: any) {
    const newStatus = job.status === "Active" ? "Closed" : "Active"
    this.recruiterService.updateJobStatus(job.id, newStatus).subscribe(
      (updatedJob) => {
        job.status = updatedJob.status
      },
      (error) => {
        console.error("Error updating job status:", error)
      },
    )
  }
}

