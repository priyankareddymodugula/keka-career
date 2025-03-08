import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import  { RecruiterService } from "../../../services/recruiter.service"
import { MatchScoreComponent } from "../../../components/match-score/match-score.component"

@Component({
  selector: "app-shortlisted-candidates",
  template: `
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Shortlisted Candidates</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Candidates you've shortlisted for your job postings.</p>
      </div>
      <div class="border-t border-gray-200">
        <ul role="list" class="divide-y divide-gray-200">
          <li *ngFor="let candidate of shortlistedCandidates" class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-12 w-12">
                  <img class="h-12 w-12 rounded-full" [src]="candidate.avatar || '/assets/default-avatar.png'" alt="">
                </div>
                <div class="ml-4">
                  <a [routerLink]="['../candidate', candidate.id]" class="text-sm font-medium text-primary hover:underline">
                    {{candidate['Personal Details']['Name']}}
                  </a>
                  <p class="text-sm text-gray-500">{{candidate['Personal Details']['Email']}}</p>
                </div>
              </div>
              <div class="ml-2 flex-shrink-0 flex">
                <app-match-score [score]="candidate.matchScore"></app-match-score>
              </div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <p class="flex items-center text-sm text-gray-500">
                  <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                  {{candidate['Professional Details']['Current Company']}} | {{candidate['Professional Details']['Current Role']}}
                </p>
                <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  {{candidate['Professional Details']['Current Location']}}
                </p>
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clip-rule="evenodd" />
                </svg>
                <p>
                  For: <span class="font-medium">{{candidate.jobTitle}}</span>
                </p>
              </div>
            </div>
            <div class="mt-2">
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let skill of candidate['Professional Details']['Skills']" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{skill}}
                </span>
              </div>
            </div>
            <div class="mt-2 text-sm text-gray-500">
              <span class="font-medium">Notice Period:</span> {{candidate['Professional Details']['Current Notice Period']}} |
              <span class="font-medium">Current CTC:</span> {{candidate['Professional Details']['Current CTC']}}
            </div>
            <div class="mt-4 flex space-x-3">
              <button (click)="contactCandidate(candidate)" class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Contact
              </button>
              <a [routerLink]="['../candidate', candidate.id]" class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                View Profile
              </a>
              <button (click)="removeFromShortlist(candidate)" class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Remove
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class ShortlistedCandidatesComponent implements OnInit {
  shortlistedCandidates: any[] = []

  constructor(private recruiterService: RecruiterService) {}

  ngOnInit() {
    this.loadShortlistedCandidates()
  }

  loadShortlistedCandidates() {
    this.recruiterService.getShortlistedCandidates().subscribe(
      (candidates) => {
        this.shortlistedCandidates = candidates
      },
      (error) => {
        console.error("Error loading shortlisted candidates:", error)
      },
    )
  }

  contactCandidate(candidate: any) {
    // This could open a modal or navigate to a contact form
    console.log("Contact candidate:", candidate)
    window.location.href = `mailto:${candidate["Personal Details"]["Email"]}?subject=Regarding your application for ${candidate.jobTitle}`
  }

  removeFromShortlist(candidate: any) {
    this.recruiterService.removeFromShortlist(candidate.jobId, candidate.id).subscribe(
      (response) => {
        this.shortlistedCandidates = this.shortlistedCandidates.filter((c) => c.id !== candidate.id)
        console.log("Candidate removed from shortlist successfully")
      },
      (error) => {
        console.error("Error removing candidate from shortlist:", error)
      },
    )
  }
}

