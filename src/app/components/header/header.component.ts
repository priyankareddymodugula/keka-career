import { Component } from "@angular/core"

@Component({
  selector: "app-header",
  template: `
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center">
          <a routerLink="/home/search" class="flex items-center">
            <!-- <img src="https://cdn.kekastatic.net/shared/branding/logo/keka-logo-light.svg" alt="Keka" class="h-10 w-auto" /> -->
            <span class="ml-2 text-xl font-bold text-primary">Keka Career Portal</span>
          </a>
        </div>
        <nav class="hidden md:flex items-center space-x-6">
          <a routerLink="/home/search" class="text-gray-700 hover:text-primary font-medium">Jobs</a>
          <!-- <a routerLink="/jobs" class="text-gray-700 hover:text-primary font-medium">Jobs</a> -->
          <a routerLink="/home/companies" class="text-gray-700 hover:text-primary font-medium">Companies</a>
          <!-- <a routerLink="/about" class="text-gray-700 hover:text-primary font-medium">About</a> -->
        </nav>
        <div class="flex items-center space-x-4">
          <a routerLink="/home/login" class="text-primary hover:text-primary-dark font-medium">Login</a>
          <a routerLink="/home/signup" class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark font-medium">Sign Up</a>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {}

