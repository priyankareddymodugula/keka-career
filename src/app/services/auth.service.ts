import { Injectable, NgZone } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import { BehaviorSubject,  Observable, of } from "rxjs"
import { tap } from "rxjs/operators"
import  { Router } from "@angular/router"
import { transformCandidateProfile } from "../candidate-profile.utils"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "api/auth"
  private currentUserSubject = new BehaviorSubject<any>(null)
  public currentUser$ = this.currentUserSubject.asObservable()
  private mockCandidates:any[] =[];

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient,
  ) {
    // Check if user is already logged in
    const user = localStorage.getItem("currentUser")
    if (user) {
      this.currentUserSubject.next(JSON.parse(user))
    }
    this.loadMockCandidates();
  }
  private loadMockCandidates(){
    this.http.get<any[]>('../assets/JSON/candidates.json').subscribe(data=>{
      let temp:any = [];
      data.forEach((d:any) => {
        temp.push(transformCandidateProfile(d))
      })
      this.mockCandidates = temp;
    });
  }

  login(email: string, password: string, rememberMe: boolean): Observable<any> {
    // Simulate API call
    const u ={
      "candidateProfile": {
          "currentLocation": "Bangalore, India",
          "experience": "18 years",
          "currentRole": "Software Developer",
          "currentCtc": "₹1,658,089 per annum",
          "currentCompany": "Google",
          "currentIndustry": "Healthcare",
          "educationDetails": "B.Tech",
          "skills": [
              "Java",
              "C#",
              "React",
              "Node.js"
          ],
          "currentNoticePeriod": "45 days",
          "id": "79a7c5c8-aa60-4f45-a67b-59eb813c987c",
          "name": "Candidate_1"
      },
      "jobPreference": {
          "location": "Bangalore, India",
          "expectedCtc": "₹2,959,333 per annum",
          "role": "Senior Software Developer",
          "industry": "IT Services",
          "workMode": "Hybrid",
          "jobType": "Full-time",
          "skills": [
              "Java",
              "C#",
              "React",
              "Node.js"
          ]
      }
  }
  let userString = email?.split('@')?.[0]?.toLowerCase()
let temp = this.mockCandidates.find((c:any)=> userString == c?.['Personal Details']?.['Name']?.toLowerCase())

  const user  = temp? temp : transformCandidateProfile(u);


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
    this.router.navigate(["/home/login"])
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

