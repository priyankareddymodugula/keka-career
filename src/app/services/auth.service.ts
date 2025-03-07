import { Injectable, NgZone } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import { BehaviorSubject, type Observable, of } from "rxjs"
import { tap } from "rxjs/operators"
import  { Router } from "@angular/router"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "api/auth"
  private currentUserSubject = new BehaviorSubject<any>(null)
  public currentUser$ = this.currentUserSubject.asObservable()

  constructor(
    private router: Router,
    private ngZone: NgZone
  ) {
    // Check if user is already logged in
    const user = localStorage.getItem("currentUser")
    if (user) {
      this.currentUserSubject.next(JSON.parse(user))
    }
  }

  login(email: string, password: string, rememberMe: boolean): Observable<any> {
    // Simulate API call
    const user = {
      id: "1",
      name: "John Doe",
      email: email,
      token: "fake-jwt-token",
    }

    if (rememberMe) {
      localStorage.setItem("currentUser", JSON.stringify(user))
    } else {
      sessionStorage.setItem("currentUser", JSON.stringify(user))
    }

    this.currentUserSubject.next(user)
    this.ngZone.run(() => this.router.navigate(["/dashboard"]));
    return of(user)
  }

  signup(name: string, email: string, password: string): Observable<any> {
    // Simulate API call
    const user = {
      id: "1",
      name: name,
      email: email,
      token: "fake-jwt-token",
    }

    localStorage.setItem("currentUser", JSON.stringify(user))
    this.currentUserSubject.next(user)
    this.router.navigate(["/dashboard"])
    return of(user)
  }

  logout(): void {
    localStorage.removeItem("currentUser")
    sessionStorage.removeItem("currentUser")
    this.currentUserSubject.next(null)
    this.router.navigate(["/"])
  }

  updateProfile(profile: any): Observable<any> {
    // In a real app, you would send this to your API
    return of(profile).pipe(
      tap((updatedProfile) => {
        const currentUser = this.currentUserValue
        const updatedUser = { ...currentUser, ...updatedProfile }
        localStorage.setItem("currentUser", JSON.stringify(updatedUser))
        this.currentUserSubject.next(updatedUser)
      }),
    )
  }

  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user)
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue
  }
}

