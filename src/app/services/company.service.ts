import { inject, Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { type Observable, of } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class CompanyService {
  private apiUrl = "api/companies"

  // Mock data for demonstration
  private mockCompanies = [
    {
      id: "1",
      name: "Tech Solutions Inc.",
      logo: "/assets/company-logos/tech-solutions.png",
      industry: "Technology",
      location: "San Francisco, CA",
      size: "1,000-5,000 employees",
      founded: "2005",
      headquarters: "San Francisco, CA",
      website: "https://techsolutions.example.com",
      linkedIn: "https://linkedin.com/company/techsolutions",
      description:
        "<p>Tech Solutions Inc. is a leading technology company specializing in software development, cloud computing, and digital transformation services. We help businesses of all sizes leverage technology to drive growth and innovation.</p><p>Our team of experts is dedicated to delivering high-quality solutions that meet the unique needs of our clients. We pride ourselves on our collaborative approach, technical excellence, and commitment to customer satisfaction.</p>",
      specialties: ["Software Development", "Cloud Computing", "Digital Transformation", "AI & Machine Learning"],
      openJobs: 15,
    },
    {
      id: "2",
      name: "Data Systems",
      logo: "/assets/company-logos/data-systems.png",
      industry: "Information Technology",
      location: "New York, NY",
      size: "500-1,000 employees",
      founded: "2010",
      headquarters: "New York, NY",
      website: "https://datasystems.example.com",
      linkedIn: "https://linkedin.com/company/datasystems",
      description:
        "<p>Data Systems is a data-driven technology company that specializes in big data analytics, data engineering, and business intelligence solutions. We help organizations harness the power of their data to make informed decisions and drive business growth.</p><p>Our team of data scientists, engineers, and analysts work together to deliver comprehensive data solutions that address complex business challenges.</p>",
      specialties: ["Big Data Analytics", "Data Engineering", "Business Intelligence", "Data Visualization"],
      openJobs: 8,
    },
    {
      id: "3",
      name: "Creative Minds",
      logo: "/assets/company-logos/creative-minds.png",
      industry: "Design",
      location: "Remote",
      size: "100-500 employees",
      founded: "2015",
      headquarters: "Los Angeles, CA",
      website: "https://creativeminds.example.com",
      linkedIn: "https://linkedin.com/company/creativeminds",
      description:
        "<p>Creative Minds is a design agency that specializes in user experience (UX) and user interface (UI) design. We help companies create beautiful, intuitive, and user-friendly digital products that delight customers and drive business results.</p><p>Our team of designers, researchers, and strategists work collaboratively to deliver exceptional design solutions that meet the unique needs of our clients.</p>",
      specialties: ["UX/UI Design", "Product Design", "Brand Identity", "User Research"],
      openJobs: 5,
    },
    {
      id: "4",
      name: "Cloud Systems",
      logo: "/assets/company-logos/cloud-systems.png",
      industry: "Cloud Computing",
      location: "Austin, TX",
      size: "500-1,000 employees",
      founded: "2012",
      headquarters: "Austin, TX",
      website: "https://cloudsystems.example.com",
      linkedIn: "https://linkedin.com/company/cloudsystems",
      description:
        "<p>Cloud Systems is a leading provider of cloud infrastructure and DevOps solutions. We help organizations migrate to the cloud, optimize their infrastructure, and implement modern DevOps practices to improve efficiency and agility.</p><p>Our team of cloud architects, DevOps engineers, and infrastructure specialists work together to deliver comprehensive cloud solutions that address complex business challenges.</p>",
      specialties: ["Cloud Infrastructure", "DevOps", "Containerization", "Infrastructure as Code"],
      openJobs: 12,
    },
    {
      id: "5",
      name: "Innovate Inc.",
      logo: "/assets/company-logos/innovate.png",
      industry: "Product Development",
      location: "Seattle, WA",
      size: "100-500 employees",
      founded: "2014",
      headquarters: "Seattle, WA",
      website: "https://innovate.example.com",
      linkedIn: "https://linkedin.com/company/innovate",
      description:
        "<p>Innovate Inc. is a product development company that specializes in bringing innovative ideas to life. We help startups and established companies alike develop and launch successful products that solve real-world problems.</p><p>Our team of product managers, designers, and engineers work collaboratively to deliver exceptional products that meet the unique needs of our clients and their customers.</p>",
      specialties: ["Product Management", "Product Strategy", "Market Research", "Product Development"],
      openJobs: 7,
    },
    {
      id: "6",
      name: "Global Tech",
      logo: "/assets/company-logos/global-tech.png",
      industry: "Technology",
      location: "Chicago, IL",
      size: "5,000-10,000 employees",
      founded: "2000",
      headquarters: "Chicago, IL",
      website: "https://globaltech.example.com",
      linkedIn: "https://linkedin.com/company/globaltech",
      description:
        "<p>Global Tech is a multinational technology company that provides a wide range of IT services and solutions to clients around the world. We help organizations leverage technology to drive digital transformation and achieve their business objectives.</p><p>Our team of experts is dedicated to delivering high-quality solutions that meet the unique needs of our clients. We pride ourselves on our global reach, technical excellence, and commitment to customer satisfaction.</p>",
      specialties: ["IT Services", "Digital Transformation", "Enterprise Solutions", "Managed Services"],
      openJobs: 20,
    },
  ]



  getCompanies(): Observable<any[]> {
    // In a real app, this would call the API
    // return this.http.get<any[]>(this.apiUrl);

    // For demonstration, return mock data
    return of(this.mockCompanies)
  }

  getCompanyById(id: string): Observable<any> {
    // In a real app, this would call the API
    // return this.http.get<any>(`${this.apiUrl}/${id}`);

    // For demonstration, return mock data
    const company = this.mockCompanies.find((company) => company.id === id)
    return of(company)
  }

  getFeaturedCompanies(): Observable<any[]> {
    // In a real app, this would call the API
    // return this.http.get<any[]>(`${this.apiUrl}/featured`);

    // For demonstration, return mock data
    return of(this.mockCompanies)
  }

  getCompanyJobs(companyId: string): Observable<any[]> {
    // In a real app, this would call the API
    // return this.http.get<any[]>(`${this.apiUrl}/${companyId}/jobs`);

    // For demonstration, return mock data
    // This would typically return jobs specific to the company
    return of([])
  }

  getSimilarCompanies(companyId: string): Observable<any[]> {
    // In a real app, this would call the API
    // return this.http.get<any[]>(`${this.apiUrl}/${companyId}/similar`);

    // For demonstration, return mock data
    // This would typically return companies similar to the specified company
    const company = this.mockCompanies.find((company) => company.id === companyId)

    if (company) {
      const similarCompanies = this.mockCompanies
        .filter((c) => c.id !== companyId && c.industry === company.industry)
        .slice(0, 3)

      return of(similarCompanies)
    }

    return of([])
  }
}

