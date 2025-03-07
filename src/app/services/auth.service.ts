import { inject, Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, type Observable, of } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "api/auth"
  private currentUserSubject = new BehaviorSubject<any>(null)
  public currentUser$ = this.currentUserSubject.asObservable()

  constructor() {
    // Check if user is already logged in

    const user = localStorage.getItem("currentUser")
    if (user) {
      this.currentUserSubject.next(JSON.parse(user))
    }
  }

  login(email: string, password: string, rememberMe: boolean): Observable<any> {
    // In a real app, this would call the API
    // return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
    //   .pipe(
    //     tap(user => {
    //       if (rememberMe) {
    //         localStorage.setItem('currentUser', JSON.stringify(user));
    //       } else {
    //         sessionStorage.setItem('currentUser', JSON.stringify(user));
    //       }
    //       this.currentUserSubject.next(user);
    //     })
    //   );

    // For demonstration, simulate successful login
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
    return of(user)
  }

  signup(name: string, email: string, password: string): Observable<any> {
    // In a real app, this would call the API
    // return this.http.post<any>(`${this.apiUrl}/signup`, { name, email, password })
    //   .pipe(
    //     tap(user => {
    //       localStorage.setItem('currentUser', JSON.stringify(user));
    //       this.currentUserSubject.next(user);
    //     })
    //   );

    // For demonstration, simulate successful signup
    const user = {
      id: "1",
      name: name,
      email: email,
      token: "fake-jwt-token",
    }

    localStorage.setItem("currentUser", JSON.stringify(user))
    this.currentUserSubject.next(user)
    return of(user)
  }

  logout(): void {
    // Remove user from local storage
    localStorage.removeItem("currentUser")
    sessionStorage.removeItem("currentUser")
    this.currentUserSubject.next(null)
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue
  }
}

