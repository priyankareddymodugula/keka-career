import { Component,  OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CompanyService } from "../../services/company.service"

@Component({
  selector: "app-company-page",
  template: `<div class="min-h-screen flex flex-col">
  <app-header></app-header>
  <main class="flex-grow">
   <router-outlet></router-outlet>
  </main>
  <app-footer></app-footer>
</div>`,
})

export class HomeComponent {

}
