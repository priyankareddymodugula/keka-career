import { Component, inject, type OnInit } from "@angular/core"
import { JobService } from "../../services/job.service"
import { CompanyService } from "../../services/company.service"

@Component({
  selector: "app-search-page",
  template: `
    <div class="bg-gradient-to-r from-indigo-500 to-purple-600 py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">Find Your Dream Job</h1>
          <p class="text-xl text-white/90 mb-8">Search through thousands of job listings from top companies</p>

          <div class="bg-white p-4 rounded-lg shadow-lg">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-grow">
                <input
                  type="text"
                  [(ngModel)]="searchQuery"
                  placeholder="Job title, skills, or company"
                  class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div class="flex-grow">
                <input
                  type="text"
                  [(ngModel)]="locationQuery"
                  placeholder="Location"
                  class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                (click)="searchJobs()"
                class="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark font-medium"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters -->
        <div class="lg:w-1/4">
          <app-search-filters
            [experiences]="experiences"
            [skills]="skills"
            [industries]="industries"
            [locations]="locations"
            (filtersChanged)="applyFilters($event)"
          ></app-search-filters>
        </div>

        <!-- Results -->
        <div class="lg:w-3/4">
          <div class="mb-6 flex justify-between items-center">
            <h2 class="text-2xl font-bold">{{ jobs.length }} Jobs Found</h2>
            <div class="flex items-center">
              <label class="mr-2">Sort by:</label>
              <select
                [(ngModel)]="sortBy"
                (change)="sortJobs()"
                class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="relevance">Relevance</option>
                <option value="date">Date</option>
                <option value="salary">Salary</option>
              </select>
            </div>
          </div>

          <div class="space-y-6">
            <app-job-card
              *ngFor="let job of jobs"
              [job]="job"
            ></app-job-card>

            <div *ngIf="jobs.length === 0" class="text-center py-12">
              <p class="text-xl text-gray-500">No jobs found matching your criteria.</p>
              <p class="mt-2 text-gray-500">Try adjusting your search filters.</p>
            </div>
          </div>

          <!-- Pagination -->
          <div *ngIf="jobs.length > 0" class="mt-8 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button
                [disabled]="currentPage === 1"
                (click)="changePage(currentPage - 1)"
                class="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <div *ngFor="let page of getPageNumbers()">
                <button
                  (click)="changePage(page)"
                  [class]="page === currentPage
                    ? 'px-3 py-1 rounded-md bg-primary text-white'
                    : 'px-3 py-1 rounded-md border border-gray-300'"
                >
                  {{ page }}
                </button>
              </div>
              <button
                [disabled]="currentPage === totalPages"
                (click)="changePage(currentPage + 1)"
                class="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>

      <!-- Featured Companies -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold mb-8 text-center">Featured Companies Hiring</h2>
        <app-featured-companies [companies]="featuredCompanies"></app-featured-companies>
      </div>
    </div>
  `,
})
export class SearchPageComponent implements OnInit {
  searchQuery = ""
  locationQuery = ""
  jobs: any[] = []
  featuredCompanies: any[] = []

  // Filter options
  experiences: string[] = ["0-1 years", "1-3 years", "3-5 years", "5-10 years", "10+ years"]
  skills: string[] = ["JavaScript", "Angular", "React", "Node.js", "Python", "Java", "C#", "PHP", "Ruby", "Swift"]
  industries: string[] = ["Technology", "Healthcare", "Finance", "Education", "Retail", "Manufacturing", "Media"]
  locations: string[] = ["Remote", "New York", "San Francisco", "London", "Berlin", "Tokyo", "Sydney", "Bangalore"]

  // Pagination
  currentPage = 1
  totalPages = 1
  itemsPerPage = 10

  // Sorting
  sortBy = "relevance"

  constructor(
    private jobService: JobService,
    private companyService: CompanyService,
  ) {
    jobService = inject(JobService);
    companyService = inject(CompanyService);
  }

  ngOnInit(): void {
    this.loadJobs()
    this.loadFeaturedCompanies()
  }

  loadJobs(): void {
    // In a real app, this would call the job service with proper parameters
    this.jobService.getJobs().subscribe((data) => {
      this.jobs = data
      this.totalPages = Math.ceil(this.jobs.length / this.itemsPerPage)
    })
  }

  loadFeaturedCompanies(): void {
    this.companyService.getFeaturedCompanies().subscribe((data) => {
      this.featuredCompanies = data
    })
  }

  searchJobs(): void {
    // In a real app, this would call the job service with search parameters
    this.jobService.searchJobs(this.searchQuery, this.locationQuery).subscribe((data) => {
      this.jobs = data
      this.totalPages = Math.ceil(this.jobs.length / this.itemsPerPage)
      this.currentPage = 1
    })
  }

  applyFilters(filters: any): void {
    // In a real app, this would call the job service with filter parameters
    this.jobService.filterJobs(filters).subscribe((data) => {
      this.jobs = data
      this.totalPages = Math.ceil(this.jobs.length / this.itemsPerPage)
      this.currentPage = 1
    })
  }

  sortJobs(): void {
    // In a real app, this would call the job service with sort parameters
    this.jobService.sortJobs(this.sortBy).subscribe((data) => {
      this.jobs = data
    })
  }

  changePage(page: number): void {
    this.currentPage = page
    // In a real app, this would call the job service with pagination parameters
    this.jobService.getJobsByPage(page, this.itemsPerPage).subscribe((data) => {
      this.jobs = data
    })
  }

  getPageNumbers(): number[] {
    const pages: number[] = []
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i)
    }
    return pages
  }
}

