import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"
import { CompanyService } from "../../services/company.service"

@Component({
  selector: "app-companies",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.css"],
})
export class CompaniesComponent implements OnInit {
  companies: any[] = []
  filteredCompanies: any[] = []
  searchTerm = ""
  selectedIndustry = ""
  selectedSize = ""
  selectedLocation = ""

  industries: string[] = ["All Industries", "Technology", "Finance", "Healthcare", "Education", "Retail"]
  sizes: string[] = ["All Sizes", "1-50", "51-200", "201-500", "501-1000", "1000+"]
  locations: string[] = ["All Locations", "San Francisco", "New York", "London", "Berlin", "Tokyo", "Remote"]

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.selectedIndustry = "All Industries";
    this.selectedSize = "All Sizes";
    this.selectedLocation = "All Locations";
    this.loadCompanies()
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe(
      (companies) => {
        this.companies = companies
        this.applyFilters()
      },
      (error) => {
        console.error("Error fetching companies:", error)
      },
    )
  }

  applyFilters(): void {
    this.filteredCompanies = this.companies.filter((company) => {
      return (
        (this.searchTerm === "" || company.name.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
        (this.selectedIndustry === "" ||
          this.selectedIndustry === "All Industries" ||
          company.industry === this.selectedIndustry) &&
        (this.selectedSize === "" ||
          this.selectedSize === "All Sizes" ||
          this.isCompanyInSizeRange(company.size, this.selectedSize)) &&
        (this.selectedLocation === "" ||
          this.selectedLocation === "All Locations" ||
          company.locations.includes(this.selectedLocation))
      )
    })
  }

  isCompanyInSizeRange(companySize: string, selectedSize: string): boolean {
    const [min, max] = selectedSize.split("-").map(Number)
    const size = Number.parseInt(companySize)
    return size >= min && (max ? size <= max : true)
  }

  onSearchChange(): void {
    this.applyFilters()
  }

  onIndustryChange(): void {
    this.applyFilters()
  }

  onSizeChange(): void {
    this.applyFilters()
  }

  onLocationChange(): void {
    this.applyFilters()
  }
}

