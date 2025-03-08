import { Component, EventEmitter, Input, Output } from "@angular/core"

@Component({
  selector: "app-search-filters",
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold mb-4">Filters</h3>

      <!-- Experience -->
      <div class="mb-6">
        <h4 class="font-medium mb-2">Experience</h4>
        <div class="space-y-2">
          <div *ngFor="let exp of experiences">
            <label class="flex items-center">
              <input
                type="checkbox"
                [value]="exp"
                (change)="updateFilters()"
                [(ngModel)]="selectedExperiences[exp]"
                class="rounded text-primary focus:ring-primary"
              />
              <span class="ml-2">{{ exp }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div class="mb-6">
        <h4 class="font-medium mb-2">Skills</h4>
        <div class="space-y-2">
          <div *ngFor="let skill of skills">
            <label class="flex items-center">
              <input
                type="checkbox"
                [value]="skill"
                (change)="updateFilters()"
                [(ngModel)]="selectedSkills[skill]"
                class="rounded text-primary focus:ring-primary"
              />
              <span class="ml-2">{{ skill }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Industry -->
      <div class="mb-6">
        <h4 class="font-medium mb-2">Industry</h4>
        <div class="space-y-2">
          <div *ngFor="let industry of industries">
            <label class="flex items-center">
              <input
                type="checkbox"
                [value]="industry"
                (change)="updateFilters()"
                [(ngModel)]="selectedIndustries[industry]"
                class="rounded text-primary focus:ring-primary"
              />
              <span class="ml-2">{{ industry }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Location -->
      <div class="mb-6">
        <h4 class="font-medium mb-2">Location</h4>
        <div class="space-y-2">
          <div *ngFor="let location of locations">
            <label class="flex items-center">
              <input
                type="checkbox"
                [value]="location"
                (change)="updateFilters()"
                [(ngModel)]="selectedLocations[location]"
                class="rounded text-primary focus:ring-primary"
              />
              <span class="ml-2">{{ location }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Salary Range -->
      <div class="mb-6">
        <h4 class="font-medium mb-2">Salary Range</h4>
        <div class="flex items-center space-x-2">
          <input
            type="number"
            [(ngModel)]="minSalary"
            (change)="updateFilters()"
            placeholder="Min"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span>-</span>
          <input  
            type="number"
            [(ngModel)]="maxSalary"
            (change)="updateFilters()"
            placeholder="Max"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <!-- Job Type -->
      <div class="mb-6">
        <h4 class="font-medium mb-2">Job Type</h4>
        <div class="space-y-2">
          <label class="flex items-center">
            <input
              type="checkbox"
              (change)="updateFilters()"
              [(ngModel)]="jobTypes.fullTime"
              class="rounded text-primary focus:ring-primary"
            />
            <span class="ml-2">Full Time</span>
          </label>
          <label class="flex items-center">
            <input
              type="checkbox"
              (change)="updateFilters()"
              [(ngModel)]="jobTypes.partTime"
              class="rounded text-primary focus:ring-primary"
            />
            <span class="ml-2">Part Time</span>
          </label>
          <label class="flex items-center">
            <input
              type="checkbox"
              (change)="updateFilters()"
              [(ngModel)]="jobTypes.contract"
              class="rounded text-primary focus:ring-primary"
            />
            <span class="ml-2">Contract</span>
          </label>
          <label class="flex items-center">
            <input
              type="checkbox"
              (change)="updateFilters()"
              [(ngModel)]="jobTypes.internship"
              class="rounded text-primary focus:ring-primary"
            />
            <span class="ml-2">Internship</span>
          </label>
        </div>
      </div>

      <!-- Reset Filters -->
      <button
        (click)="resetFilters()"
        class="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 font-medium"
      >
        Reset Filters
      </button>
    </div>
  `,
})
export class SearchFiltersComponent {
  @Input() experiences: string[] = []
  @Input() skills: string[] = []
  @Input() industries: string[] = []
  @Input() locations: string[] = []
  @Output() filtersChanged = new EventEmitter<any>()

  selectedExperiences: { [key: string]: boolean } = {}
  selectedSkills: { [key: string]: boolean } = {}
  selectedIndustries: { [key: string]: boolean } = {}
  selectedLocations: { [key: string]: boolean } = {}

  minSalary: number | null = null
  maxSalary: number | null = null

  jobTypes = {
    fullTime: false,
    partTime: false,
    contract: false,
    internship: false,
  }

  updateFilters(): void {
    const filters = {
      experiences: Object.keys(this.selectedExperiences).filter((exp) => this.selectedExperiences[exp]),
      skills: Object.keys(this.selectedSkills).filter((skill) => this.selectedSkills[skill]),
      industries: Object.keys(this.selectedIndustries).filter((industry) => this.selectedIndustries[industry]),
      locations: Object.keys(this.selectedLocations).filter((location) => this.selectedLocations[location]),
      salary: {
        min: this.minSalary,
        max: this.maxSalary,
      },
      jobTypes: {
        fullTime: this.jobTypes.fullTime,
        partTime: this.jobTypes.partTime,
        contract: this.jobTypes.contract,
        internship: this.jobTypes.internship,
      },
    }

    this.filtersChanged.emit(filters)
  }

  resetFilters(): void {
    this.selectedExperiences = {}
    this.selectedSkills = {}
    this.selectedIndustries = {}
    this.selectedLocations = {}
    this.minSalary = null
    this.maxSalary = null
    this.jobTypes = {
      fullTime: false,
      partTime: false,
      contract: false,
      internship: false,
    }

    this.updateFilters()
  }
}

