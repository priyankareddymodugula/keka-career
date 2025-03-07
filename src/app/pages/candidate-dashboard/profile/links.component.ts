import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-links',
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold mb-4">Social & Professional Links</h2>

      <div class="space-y-4">
        <div>
          <label for="linkedin" class="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
          <div class="flex">
            <div class="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 border-gray-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
            <input
              type="url"
              id="linkedin"
              [(ngModel)]="linksCopy.linkedin"
              (ngModelChange)="updateLinks()"
              class="flex-grow px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
        </div>

        <div>
          <label for="github" class="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
          <div class="flex">
            <div class="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 border-gray-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <input
              type="url"
              id="github"
              [(ngModel)]="linksCopy.github"
              (ngModelChange)="updateLinks()"
              class="flex-grow px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="https://github.com/yourusername"
            />
          </div>
        </div>

        <div>
          <label for="portfolio" class="block text-sm font-medium text-gray-700 mb-1">Portfolio/Website</label>
          <div class="flex">
            <div class="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 border-gray-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <input
              type="url"
              id="portfolio"
              [(ngModel)]="linksCopy.portfolio"
              (ngModelChange)="updateLinks()"
              class="flex-grow px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>

        <div>
          <label for="other" class="block text-sm font-medium text-gray-700 mb-1">Other</label>
          <div class="flex">
            <div class="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 border-gray-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <input
              type="url"
              id="other"
              [(ngModel)]="linksCopy.other"
              (ngModelChange)="updateLinks()"
              class="flex-grow px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="https://other-profile.com"
            />
          </div>
        </div>
      </div>

      <div class="mt-4">
        <p class="text-sm text-gray-600">
          Adding your professional links helps employers learn more about you and your work.
        </p>
      </div>
    </div>
  `,
})
export class LinksComponent {
  @Input() links: any = {
    linkedin: '',
    github: '',
    portfolio: '',
    other: ''
  };
  @Output() linksChange = new EventEmitter<any>();

  linksCopy: any = {
    linkedin: '',
    github: '',
    portfolio: '',
    other: ''
  };

  ngOnChanges(): void {
    this.linksCopy = { ...this.links };
  }

  updateLinks(): void {
    this.linksChange.emit(this.linksCopy);
  }
}
