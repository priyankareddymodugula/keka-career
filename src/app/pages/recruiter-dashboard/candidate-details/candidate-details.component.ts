import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  ActivatedRoute, RouterLink } from "@angular/router"
import  { RecruiterService } from "../../../services/recruiter.service"
import { MatchScoreComponent } from "../../../components/match-score/match-score.component"

@Component({
  selector: "app-candidate-details",
  template: `
    <div *ngIf="candidate" class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6 flex justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0 h-16 w-16">
            <img class="h-16 w-16 rounded-full" [src]="candidate.avatar || '/assets/default-avatar.png'" alt="">
          </div>
          <div class="ml-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900">{{candidate['Personal Details']['Name']}}</h3>
            <p class="text-sm text-gray-500">{{candidate['Personal Details']['Email']}}</p>
          </div>
        </div>
        <div class="flex items-center">
          <app-match-score [score]="candidate.matchScore"></app-match-score>
          <div class="ml-4 flex space-x-3">
            <button *ngIf="!candidate.shortlisted" (click)="shortlistCandidate()" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Shortlist
            </button>
            <button (click)="contactCandidate()" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Contact
            </button>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Personal Details</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span class="font-medium">Mobile:</span> {{candidate['Personal Details']['Mobile Phone']}}
                </div>
                <div>
                  <span class="font-medium">Address:</span> {{candidate['Personal Details']['Address']}}
                </div>
              </div>
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Current Role</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{candidate['Professional Details']['Current Role']}} at {{candidate['Professional Details']['Current Company']}}
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Experience & Location</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span class="font-medium">Experience:</span> {{candidate['Professional Details']['Experience']}}
                </div>
                <div>
                  <span class="font-medium">Current Location:</span> {{candidate['Professional Details']['Current Location']}}
                </div>
              </div>
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Compensation & Notice</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span class="font-medium">Current CTC:</span> {{candidate['Professional Details']['Current CTC']}}
                </div>
                <div>
                  <span class="font-medium">Notice Period:</span> {{candidate['Professional Details']['Current Notice Period']}}
                </div>
              </div>
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Industry & Education</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span class="font-medium">Current Industry:</span> {{candidate['Professional Details']['Current Industry']}}
                </div>
                <div>
                  <span class="font-medium">Education:</span> {{candidate['Professional Details']['Education Details']}}
                </div>
              </div>
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Skills</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let skill of candidate['Professional Details']['Skills']" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{skill}}
                </span>
              </div>
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Social Media</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <a href="https://{{candidate['Professional Details']['Social Media']}}" target="_blank" class="text-primary hover:underline">
                {{candidate['Professional Details']['Social Media']}}
              </a>
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Resume</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div class="border border-gray-200 rounded-md divide-y divide-gray-200">
                <div class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div class="w-0 flex-1 flex items-center">
                    <svg class="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 10-2 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
                    </svg>
                    <span class="ml-2 flex-1 w-0 truncate">
                      {{candidate.resume}}
                    </span>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <a href="#" class="font-medium text-primary hover:text-primary-dark">
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  `,
})
export class CandidateDetailsComponent implements OnInit {
  candidateId = ""
  candidate: any = null

  constructor(
    private route: ActivatedRoute,
    private recruiterService: RecruiterService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.candidateId = params.get("id") || ""
      this.loadCandidateDetails()
    })
  }

  loadCandidateDetails() {
    this.recruiterService.getCandidateById(this.candidateId).subscribe(
      (candidate) => {
        this.candidate = candidate
      },
      (error) => {
        console.error("Error loading candidate details:", error)
      },
    )
  }

  shortlistCandidate() {
    this.recruiterService.shortlistCandidate(this.candidate.jobId, this.candidateId).subscribe(
      (response) => {
        this.candidate.shortlisted = true
        console.log("Candidate shortlisted successfully")
      },
      (error) => {
        console.error("Error shortlisting candidate:", error)
      },
    )
  }

  contactCandidate() {
    // This could open a modal or navigate to a contact form
    console.log("Contact candidate:", this.candidate)
    window.location.href = `mailto:${this.candidate["Personal Details"]["Email"]}?subject=Regarding your application`
  }
}

