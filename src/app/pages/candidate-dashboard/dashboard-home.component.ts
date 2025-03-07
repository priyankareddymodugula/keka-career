import { Component, OnInit } from '@angular/core';
import { JobMatchService } from 'src/app/services/job-match.service';

@Component({
  selector: 'app-dashboard-home',
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">Profile Completion</h2>
          <span class="text-sm text-gray-500">{{ profileCompletion }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div
            class="bg-primary h-2.5 rounded-full"
            [style.width]="profileCompletion + '%'"
          ></div>
        </div>
        <div class="mt-4">
          <p class="text-sm text-gray-600 mb-2">
            Complete your profile to improve job matches and increase your chances of getting hired.
          </p>
          <a
            routerLink="/dashboard/profile"
            class="text-primary hover:text-primary-dark text-sm font-medium"
          >
            Complete Profile
          </a>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">Job Matches</h2>
          <span class="text-sm text-gray-500">{{ matchedJobs.length }} jobs</span>
        </div>
        <div class="space-y-4">
          <div *ngFor="let job of matchedJobs.slice(0, 3)" class="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <h3 class="font-medium">{{ job.title }}</h3>
            <p class="text-sm text-gray-600">{{ job.company.name }}</p>
            <div class="flex items-center mt-1">
              <div class="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                <div
                  class="bg-primary h-1.5 rounded-full"
                  [style.width]="job.matchScore + '%'"
                ></div>
              </div>
              <span class="text-xs font-medium">{{ job.matchScore }}%</span>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <a
            routerLink="/dashboard/opportunities"
            class="text-primary hover:text-primary-dark text-sm font-medium"
          >
            View All Matches
          </a>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">Applications</h2>
          <span class="text-sm text-gray-500">{{ applications.length }} total</span>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="bg-blue-50 rounded-lg p-4 text-center">
            <h3 class="text-2xl font-bold text-blue-600">{{ pendingApplications }}</h3>
            <p class="text-sm text-gray-600">Pending</p>
          </div>
          <div class="bg-green-50 rounded-lg p-4 text-center">
            <h3 class="text-2xl font-bold text-green-600">{{ interviewApplications }}</h3>
            <p class="text-sm text-gray-600">Interviews</p>
          </div>
        </div>
        <div class="mt-4">
          <a
            routerLink="/dashboard/applications"
            class="text-primary hover:text-primary-dark text-sm font-medium"
          >
            View Applications
          </a>
        </div>
      </div>
    </div>

    <div class="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold mb-4">Recent Job Matches</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Title
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Match Score
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Posted
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let job of matchedJobs.slice(0, 5)">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ job.title }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-8 w-8">
                    <img class="h-8 w-8 rounded-full" [src]="job.company.logo" [alt]="job.company.name">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ job.company.name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ job.location }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                    <div
                      class="bg-primary h-1.5 rounded-full"
                      [style.width]="job.matchScore + '%'"
                    ></div>
                  </div>
                  <span class="text-sm font-medium">{{ job.matchScore }}%</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ job.postedDate }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a [routerLink]="['/job', job.id]" class="text-primary hover:text-primary-dark">View</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-lg font-semibold mb-4">Profile Tips</h2>
        <ul class="space-y-3">
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm text-gray-600">Add a professional profile photo to increase profile views by 14x</span>
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm text-gray-600">List all relevant skills to improve job matching</span>
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm text-gray-600">Upload your latest resume to be discovered by recruiters</span>
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm text-gray-600">Add detailed descriptions of your work experience</span>
          </li>
        </ul>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-lg font-semibold mb-4">Upcoming Interviews</h2>
        <div *ngIf="upcomingInterviews.length > 0" class="space-y-4">
          <div *ngFor="let interview of upcomingInterviews" class="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <div class="flex justify-between">
              <div>
                <h3 class="font-medium">{{ interview.jobTitle }}</h3>
                <p class="text-sm text-gray-600">{{ interview.company }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium">{{ interview.date }}</p>
                <p class="text-sm text-gray-600">{{ interview.time }}</p>
              </div>
            </div>
          </div>
        </div>
        <div *ngIf="upcomingInterviews.length === 0" class="text-center py-8">
          <p class="text-gray-500">No upcoming interviews</p>
        </div>
      </div>
    </div>
  `,
})
export class DashboardHomeComponent implements OnInit {
  profileCompletion: number = 65;
  matchedJobs: any[] = [];
  applications: any[] = [];
  pendingApplications: number = 0;
  interviewApplications: number = 0;
  upcomingInterviews: any[] = [];

  constructor(
    private jobMatchingService: JobMatchService
  ) {}

  ngOnInit(): void {
    this.loadProfileCompletion();
    this.loadMatchedJobs();
    this.loadApplications();
    this.loadUpcomingInterviews();
  }

  loadProfileCompletion(): void {
    // this.profileService.getProfileCompletion().subscribe(completion => {
    //   this.profileCompletion = completion;
    // });
  }

  loadMatchedJobs(): void {
    // this.jobMatchingService.getMatchedJobs().subscribe(jobs => {
    //   this.matchedJobs = jobs;
    // });
  }

  loadApplications(): void {
    // this.profileService.getApplications().subscribe(applications => {
    //   this.applications = applications;
    //   this.pendingApplications = applications.filter((app: any) => app.status === 'pending').length;
    //   this.interviewApplications = applications.filter((app: any) => app.status === 'interview').length;
    // });
  }

  loadUpcomingInterviews(): void {
    // this.profileService.getUpcomingInterviews().subscribe(interviews => {
    //   this.upcomingInterviews = interviews;
    // });
  }
}
