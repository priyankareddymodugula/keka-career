import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import  { RecruiterService } from "../../services/recruiter.service"

@Component({
  selector: "app-recruiter-dashboard",
  template: `
  <header class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center">
          <a routerLink="/recruiter" class="flex items-center">
            <!-- <img src="https://cdn.kekastatic.net/shared/branding/logo/keka-logo-light.svg" alt="Keka" class="h-10 w-auto" /> -->
            <span class="ml-2 text-xl font-bold text-primary">Keka Recruiter Dashboard</span>
          </a>
        </div>
        <nav class="hidden md:flex items-center space-x-6">
        <a routerLink="./jobs" routerLinkActive="border-primary text-gray-900"
                   class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  My Jobs
                </a>
                <a routerLink="./create-job" routerLinkActive="border-primary text-gray-900"
                   class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Create Job
                </a>
                <a routerLink="./shortlisted" routerLinkActive="border-primary text-gray-900"
                   class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Shortlisted Candidates
                </a>
        </nav>
        <div class="flex items-center space-x-4">
        <button (click)="logout()" class="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  Logout
                </button>
        </div>
      </div>
    </header>
     <div class="py-10">
        <main>
          <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
  `,
})
export class RecruiterDashboardComponent {
  constructor(private recruiterService: RecruiterService) {}

  logout() {
    this.recruiterService.logout()
  }
}

