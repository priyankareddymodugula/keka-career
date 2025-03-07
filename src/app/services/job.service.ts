import { inject, Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { type Observable, of } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class JobService {
  private apiUrl = "api/jobs"

  // Mock data for demonstration
  private mockJobs = [
    {
      id: "1",
      title: "Frontend Developer",
      company: {
        id: "1",
        name: "Tech Solutions Inc.",
        logo: "/assets/company-logos/tech-solutions.png",
      },
      location: "San Francisco, CA",
      skills: ["JavaScript", "React", "CSS", "HTML", "TypeScript"],
      experience: "2-4 years",
      salary: "$90,000 - $120,000",
      jobType: "Full Time",
      postedDate: "2 days ago",
    },
    {
      id: "2",
      title: "Backend Developer",
      company: {
        id: "2",
        name: "Data Systems",
        logo: "/assets/company-logos/data-systems.png",
      },
      location: "New York, NY",
      skills: ["Java", "Spring Boot", "MySQL", "AWS"],
      experience: "3-5 years",
      salary: "$100,000 - $130,000",
      jobType: "Full Time",
      postedDate: "1 week ago",
    },
    {
      id: "3",
      title: "UX/UI Designer",
      company: {
        id: "3",
        name: "Creative Minds",
        logo: "/assets/company-logos/creative-minds.png",
      },
      location: "Remote",
      skills: ["Figma", "Adobe XD", "Sketch", "User Research"],
      experience: "2-5 years",
      salary: "$85,000 - $110,000",
      jobType: "Full Time",
      postedDate: "3 days ago",
    },
    {
      id: "4",
      title: "DevOps Engineer",
      company: {
        id: "4",
        name: "Cloud Systems",
        logo: "/assets/company-logos/cloud-systems.png",
      },
      location: "Austin, TX",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
      experience: "4-6 years",
      salary: "$110,000 - $140,000",
      jobType: "Full Time",
      postedDate: "5 days ago",
    },
    {
      id: "5",
      title: "Product Manager",
      company: {
        id: "5",
        name: "Innovate Inc.",
        logo: "/assets/company-logos/innovate.png",
      },
      location: "Seattle, WA",
      skills: ["Product Strategy", "Agile", "User Stories", "Roadmapping"],
      experience: "5-7 years",
      salary: "$120,000 - $150,000",
      jobType: "Full Time",
      postedDate: "1 day ago",
    },
  ]


  getJobs(): Observable<any[]> {
    // In a real app, this would call the API
    // return this.http.get<any[]>(this.apiUrl);

    // For demonstration, return mock data
    return of(this.mockJobs)
  }

  getJobById(id: string): Observable<any> {
    // In a real app, this would call the API
    // return this.http.get<any>(`${this.apiUrl}/${id}`);

    // For demonstration, return mock data
    const job = this.mockJobs.find((job) => job.id === id)
    return of(job)
  }

  searchJobs(query: string, location: string): Observable<any[]> {
    // In a real app, this would call the API with search parameters
    // return this.http.get<any[]>(`${this.apiUrl}/search?q=${query}&location=${location}`);

    // For demonstration, filter mock data based on search query
    const filteredJobs = this.mockJobs.filter((job) => {
      const matchesQuery =
        !query ||
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.name.toLowerCase().includes(query.toLowerCase()) ||
        job.skills.some((skill) => skill.toLowerCase().includes(query.toLowerCase()))

      const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase())

      return matchesQuery && matchesLocation
    })

    return of(filteredJobs)
  }

  filterJobs(filters: any): Observable<any[]> {
    // In a real app, this would call the API with filter parameters
    // return this.http.get<any[]>(`${this.apiUrl}/filter`, { params: filters });

    // For demonstration, filter mock data based on filters
    let filteredJobs = [...this.mockJobs]

    if (filters.experiences && filters.experiences.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        filters.experiences.some((exp: string) => job.experience.includes(exp)),
      )
    }

    if (filters.skills && filters.skills.length > 0) {
      filteredJobs = filteredJobs.filter((job) => filters.skills.some((skill: string) => job.skills.includes(skill)))
    }

    if (filters.locations && filters.locations.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        filters.locations.some((location: string) => job.location.includes(location)),
      )
    }

    if (filters.salary && (filters.salary.min || filters.salary.max)) {
      filteredJobs = filteredJobs.filter((job) => {
        const salaryRange = job.salary.replace(/[^0-9,-]/g, "").split("-")
        const minSalary = Number.parseInt(salaryRange[0].replace(",", ""))
        const maxSalary = Number.parseInt(salaryRange[1].replace(",", ""))

        const meetsMinSalary = !filters.salary.min || minSalary >= filters.salary.min
        const meetsMaxSalary = !filters.salary.max || maxSalary <= filters.salary.max

        return meetsMinSalary && meetsMaxSalary
      })
    }

    if (filters.jobTypes) {
      const selectedJobTypes = Object.keys(filters.jobTypes).filter((type) => filters.jobTypes[type])

      if (selectedJobTypes.length > 0) {
        filteredJobs = filteredJobs.filter((job) => {
          const jobType = job.jobType.toLowerCase()
          return selectedJobTypes.some((type) => jobType.includes(type.toLowerCase()))
        })
      }
    }

    return of(filteredJobs)
  }

  sortJobs(sortBy: string): Observable<any[]> {
    // In a real app, this would call the API with sort parameters
    // return this.http.get<any[]>(`${this.apiUrl}/sort?by=${sortBy}`);

    // For demonstration, sort mock data
    const sortedJobs = [...this.mockJobs]

    switch (sortBy) {
      case "date":
        // Sort by posted date (newest first)
        sortedJobs.sort((a, b) => {
          const dateA = this.parseDateString(a.postedDate)
          const dateB = this.parseDateString(b.postedDate)
          return dateA - dateB
        })
        break
      case "salary":
        // Sort by salary (highest first)
        sortedJobs.sort((a, b) => {
          const salaryRangeA = a.salary.replace(/[^0-9,-]/g, "").split("-")
          const salaryRangeB = b.salary.replace(/[^0-9,-]/g, "").split("-")

          const maxSalaryA = Number.parseInt(salaryRangeA[1].replace(",", ""))
          const maxSalaryB = Number.parseInt(salaryRangeB[1].replace(",", ""))

          return maxSalaryB - maxSalaryA
        })
        break
      case "relevance":
      default:
        // Default sorting (by relevance)
        break
    }

    return of(sortedJobs)
  }

  getJobsByPage(page: number, itemsPerPage: number): Observable<any[]> {
    // In a real app, this would call the API with pagination parameters
    // return this.http.get<any[]>(`${this.apiUrl}?page=${page}&limit=${itemsPerPage}`);

    // For demonstration, paginate mock data
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedJobs = this.mockJobs.slice(startIndex, endIndex)

    return of(paginatedJobs)
  }

  private parseDateString(dateString: string): number {
    // Convert date strings like "2 days ago" to timestamps for sorting
    const now = new Date().getTime()
    const day = 24 * 60 * 60 * 1000
    const week = 7 * day
    const month = 30 * day

    if (dateString.includes("day")) {
      const days = Number.parseInt(dateString.split(" ")[0])
      return now - days * day
    } else if (dateString.includes("week")) {
      const weeks = Number.parseInt(dateString.split(" ")[0])
      return now - weeks * week
    } else if (dateString.includes("month")) {
      const months = Number.parseInt(dateString.split(" ")[0])
      return now - months * month
    }

    return now
  }
}

