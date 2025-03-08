import { Injectable } from "@angular/core"
import  { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router"
import  { Observable } from "rxjs"
import  { RecruiterService } from "../services/recruiter.service"

@Injectable({
  providedIn: "root",
})
export class RecruiterAuthGuard implements CanActivate {
  constructor(
    private recruiterService: RecruiterService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.recruiterService.isLoggedIn()) {
      return true
    }

    // Redirect to the recruiter login page
    return this.router.createUrlTree(["/recruiter-login"], { queryParams: { returnUrl: state.url } })
  }
}

