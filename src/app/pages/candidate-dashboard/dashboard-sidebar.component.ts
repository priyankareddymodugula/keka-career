import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-navbar',
  template: `
  <header class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center">
          <a routerLink="/dashboard" class="flex items-center">
            <!-- <img src="https://cdn.kekastatic.net/shared/branding/logo/keka-logo-light.svg" alt="Keka" class="h-10 w-auto" /> -->
            <span class="ml-2 text-xl font-bold text-primary">Keka Career Portal</span>
          </a>
        </div>
        <nav class="hidden md:flex items-center space-x-6">
        <a
            routerLink="/dashboard"
            routerLinkActive="text-primary border-b-2 border-primary"
            class="py-2 px-3 hover:text-gray-700"
          >
            Dashboard
          </a>
          <a
            routerLink="/dashboard/profile"
            routerLinkActive="text-primary border-b-2 border-primary"
            class="py-2 px-3 hover:text-gray-700"
          >
            Profile
          </a>
          <a
            routerLink="/dashboard/opportunities"
            routerLinkActive="text-primary border-b-2 border-primary"
            class="py-2 px-3 hover:text-gray-700"
          >
            Opportunities
          </a>
          <a
            routerLink="/dashboard/applications"
            routerLinkActive="text-primary border-b-2 border-primary"
            class="py-2 px-3 hover:text-gray-700"
          >
            Applications
          </a>
          <a
            routerLink="/dashboard/saved-jobs"
            routerLinkActive="text-primary border-b-2 border-primary"
            class="py-2 px-3 hover:text-gray-700"
          >
            Saved Jobs
          </a>

        </nav>
        <div class="flex items-center space-x-4">
        <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
          {{ getInitials() }}
        </div>
        <button
          (click)="logout()"
          class="text-red-600 hover:text-red-800 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
        </div>
      </div>
    </header>

  `,
})
export class DashboardNavbarComponent {
  user: any;

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  getInitials(): string {
    if (!this.user || !this.user.name) return 'U';

    const names = this.user.name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();

    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}
