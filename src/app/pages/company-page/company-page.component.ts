import { Component, type OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CompanyService } from "../../services/company.service"
import { JobService } from "src/app/services/job.service";

@Component({
  selector: "app-company-page",
  template: `
    <div class="container mx-auto px-4 py-8">
      <div *ngIf="company" class="mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex flex-col md:flex-row items-center md:items-start">
            <img
              [src]="company.logo"
              [alt]="company.name"
              class="w-24 h-24 object-contain rounded-md border border-gray-200 mb-4 md:mb-0 md:mr-6"
            />
            <div class="flex-grow text-center md:text-left">
              <h1 class="text-3xl font-bold mb-2">{{ company.name }}</h1>
              <p class="text-gray-600 mb-4">{{ company.industry }} • {{ company.location }}</p>
              <div class="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <a [href]="company.website" target="_blank" class="text-primary hover:underline flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Website
                </a>
                <a [href]="company.linkedIn" target="_blank" class="text-primary hover:underline flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
              <div class="flex justify-center md:justify-start">
                <button class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark font-medium mr-4">
                  Follow Company
                </button>
                <button class="border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary/10 font-medium">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold mb-4">About {{ company?.name }}</h2>
            <div class="prose max-w-none" [innerHTML]="company?.description"></div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-6">Open Positions ({{ companyJobs.length }})</h2>
            <div class="space-y-6">
              <app-job-card
                *ngFor="let job of companyJobs"
                [job]="job"
              ></app-job-card>

              <div *ngIf="companyJobs.length === 0" class="text-center py-8">
                <p class="text-xl text-gray-500">No open positions at the moment.</p>
                <p class="mt-2 text-gray-500">Check back later or follow the company for updates.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-xl font-bold mb-4">Company Details</h2>
            <div class="space-y-4">
              <div>
                <h3 class="text-gray-500 text-sm">Industry</h3>
                <p>{{ company?.industry }}</p>
              </div>
              <div>
                <h3 class="text-gray-500 text-sm">Company Size</h3>
                <p>{{ company?.size }}</p>
              </div>
              <div>
                <h3 class="text-gray-500 text-sm">Founded</h3>
                <p>{{ company?.founded }}</p>
              </div>
              <div>
                <h3 class="text-gray-500 text-sm">Headquarters</h3>
                <p>{{ company?.headquarters }}</p>
              </div>
              <div>
                <h3 class="text-gray-500 text-sm">Specialties</h3>
                <div class="flex flex-wrap gap-2 mt-1">
                  <span *ngFor="let specialty of company?.specialties" class="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm">
                    {{ specialty }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-bold mb-4">Similar Companies</h2>
            <div class="space-y-4">
              <a
                *ngFor="let similarCompany of similarCompanies"
                [routerLink]="['/company', similarCompany.id]"
                class="flex items-center p-2 hover:bg-gray-50 rounded-md"
              >
                <img
                  [src]="similarCompany.logo"
                  [alt]="similarCompany.name"
                  class="w-10 h-10 object-contain rounded-md border border-gray-200 mr-3"
                />
                <div>
                  <h3 class="font-medium">{{ similarCompany.name }}</h3>
                  <p class="text-sm text-gray-500">{{ similarCompany.openJobs }} open jobs</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CompanyPageComponent implements OnInit {
  companyId = ""
  company: any = null
  companyJobs: any[] = []
  similarCompanies: any[] = []

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private jobService: JobService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.companyId = params.get("id") || ""
      this.loadCompanyDetails()
      this.loadCompanyJobs()
      this.loadSimilarCompanies()
    })
  }

  loadCompanyDetails(): void {
    this.companyService.getCompanyById(this.companyId).subscribe((data) => {
      this.company = data
    })
  }

  loadCompanyJobs(): void {
    this.jobService.getJobByCompany(this.companyId).subscribe((data) => {
      this.companyJobs = data
    })
  }

  loadSimilarCompanies(): void {
    this.companyService.getSimilarCompanies(this.companyId).subscribe((data) => {
      this.similarCompanies = data
    })
  }
}

