import { Component, Input } from "@angular/core"

@Component({
  selector: "app-footer",
  template:`
  <footer class="bg-gray-800 text-white py-10">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">Keka Career Portal</h3>
            <p class="text-gray-300">Find your dream job with top companies around the world.</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">For Job Seekers</h3>
            <ul class="space-y-2">
              <li><a routerLink="/jobs" class="text-gray-300 hover:text-white">Browse Jobs</a></li>
              <li><a routerLink="/companies" class="text-gray-300 hover:text-white">Browse Companies</a></li>
              <li><a routerLink="/career-advice" class="text-gray-300 hover:text-white">Career Advice</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">For Employers</h3>
            <ul class="space-y-2">
              <li><a routerLink="/post-job" class="text-gray-300 hover:text-white">Post a Job</a></li>
              <li><a routerLink="/employer-branding" class="text-gray-300 hover:text-white">Employer Branding</a></li>
              <li><a routerLink="/pricing" class="text-gray-300 hover:text-white">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Connect With Us</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-300 hover:text-white">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="text-gray-300 hover:text-white">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="text-gray-300 hover:text-white">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a href="#" class="text-gray-300 hover:text-white">
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  @Input() companies: any[] = []
}

