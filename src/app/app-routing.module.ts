
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from "./pages/search-page/search-page.component"
import { LoginComponent } from "./pages/auth/login/login.component"
import { SignupComponent } from "./pages/auth/signup/signup.component"
import { CompanyPageComponent } from "./pages/company-page/company-page.component"
import { JobDetailsComponent } from "./pages/job-details/job-details.component"
import { CandidateDashboardComponent } from './pages/candidate-dashboard/candidate-dashboard.component';
import { OpportunitiesComponent } from './pages/candidate-dashboard/opportunities/opportunities.component';
import { ProfileComponent } from './pages/candidate-dashboard/profile/profile.component';
import { AuthGuard } from './guard/auth.guard';

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
    path: "dashboard",
    component: CandidateDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "profile",
        pathMatch: "full",
      },
      {
        path: "profile",
        component : ProfileComponent,
      },
      {
        path: "opportunities",
        component: OpportunitiesComponent,
      },
    ],
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
