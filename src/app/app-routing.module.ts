import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from "./pages/search-page/search-page.component"
import { LoginComponent } from "./pages/auth/login/login.component"
import { SignupComponent } from "./pages/auth/signup/signup.component"
import { CompanyPageComponent } from "./pages/company-page/company-page.component"
import { JobDetailsComponent } from "./pages/job-details/job-details.component"

export const routes: Routes = [
  {
    path: "",
  component: SearchPageComponent
  },
  {
    path: "login",
    component:LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "company/:id",
    component: CompanyPageComponent
  },
  {
    path: "job/:id",
  component: JobDetailsComponent
  },
  {
    path: "**",
    redirectTo: "",
  },
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
