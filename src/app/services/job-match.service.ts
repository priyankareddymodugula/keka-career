import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import {  Observable, of } from "rxjs"
import { map } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class JobMatchService {
  private apiUrl = "api/job-matches"

  constructor() {}

  getMatchedJobs(user: any): Observable<any[]> {
    // In a real application, you would send the user's profile to the server
    // and receive matched jobs with scores. Here, we'll simulate this process.
    return this.simulateJobMatching(user)
  }

  private simulateJobMatching(user: any): Observable<any[]> {
    // This is a mock implementation. In a real app, this logic would be on the server.
    const mockJobs = [
      { postedDate: "2023-03-01",
        id: 1,
        "Job Profile": "UI/UX Designer",
        "Name": "Data Scientist - Level 3",
        "Description": "Job description placeholder.",
        "Role": "Data Analyst",
        "Location": "Pune, India",
        "Work Mode": "Remote",
        "No of openings": 6,
        "Job Type": "Full-time",
        "Department": "Design",
        "Candidate Preference": {
          "Skill Set": [
            "AWS",
            "Docker",
            "Kubernetes",
            "CI/CD"
          ],
          "Experience": "10+ years",
          "Education Details": "MBA or equivalent in Project Management",
          "Notice Period": "60 days",
          "Salary Range": "\u20b920,00,000 - \u20b930,00,000 per annum"
        }
      },
      {id: 2,
        postedDate: "2023-03-05",
        "Job Profile": "Software Engineer",
        "Name": "Software Engineer - Level 1",
        "Description": "Job description placeholder.",
        "Role": "Project Lead",
        "Location": "Delhi, India",
        "Work Mode": "On-site",
        "No of openings": 4,
        "Job Type": "Full-time",
        "Department": "Design",
        "Candidate Preference": {
          "Skill Set": [
            "Agile",
            "Scrum",
            "JIRA",
            "Risk Management"
          ],
          "Experience": "1-3 years",
          "Education Details": "Diploma in UI/UX Design",
          "Notice Period": "15 days",
          "Salary Range": "\u20b920,00,000 - \u20b930,00,000 per annum"
        }
      },
      {
        id:3,
        postedDate: "2023-03-10",
        "Job Profile": "Software Engineer",
        "Name": "UI/UX Designer - Level 3",
        "Description": "Job description placeholder.",
        "Role": "Infrastructure Engineer",
        "Location": "Pune, India",
        "Work Mode": "Hybrid",
        "No of openings": 1,
        "Job Type": "Contract",
        "Department": "Infrastructure",
        "Candidate Preference": {
          "Skill Set": [
            "JavaScript",
            "React",
            "Node.js",
            "MongoDB"
          ],
          "Experience": "10+ years",
          "Education Details": "Master's degree in Data Science",
          "Notice Period": "Immediate",
          "Salary Range": "\u20b912,00,000 - \u20b918,00,000 per annum"
        }
      },
      {
        id:4,
        postedDate: "2023-03-15",
        "Job Profile": "Software Engineer",
        "Name": "UI/UX Designer - Level 1",
        "Description": "Job description placeholder.",
        "Role": "Data Analyst",
        "Location": "Delhi, India",
        "Work Mode": "Remote",
        "No of openings": 8,
        "Job Type": "Full-time",
        "Department": "Infrastructure",
        "Candidate Preference": {
          "Skill Set": [
            "Figma",
            "Adobe XD",
            "Sketch",
            "User Research"
          ],
          "Experience": "8-10 years",
          "Education Details": "Master's degree in Data Science",
          "Notice Period": "15 days",
          "Salary Range": "\u20b95,00,000 - \u20b98,00,000 per annum"
        }
      },
    ]

    return of(mockJobs).pipe(
      map((jobs) =>
        jobs.map((job) => ({
          ...job,
          matchScore: this.calculateMatchScore(user, job),
        })),
      ),
    )
  }

  private calculateMatchScore(user: any, job: any): number {
    // This is a simplified scoring algorithm. In a real AI-based system,
    // this would be much more complex and would likely use machine learning.
    let score = 0

    // Simulate matching based on job title
    if (user.skills && user.skills.toLowerCase().includes(job.title.toLowerCase())) {
      score += 50
    }

    // Simulate matching based on experience
    if (user.experience) {
      score += Math.min(user.experience * 5, 30) // Max 30 points for experience
    }

    // Add some randomness to simulate other factors
    score += Math.random() * 20

    // Ensure the score is between 0 and 100
    return Math.min(Math.round(score), 100)
  }
}

