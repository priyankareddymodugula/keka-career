import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CompanyService } from "../../services/company.service";

@Component({
  selector: "app-companies",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.css"],
})
export class CompaniesComponent implements OnInit {
  companies: any[] = [];
  filteredCompanies: any[] = [];
  displayedCompanies: any[] = [];
  searchTerm = "";
  selectedIndustry = "";
  selectedSize = "";
  selectedLocation = "";

  industries: string[] = ["All Industries", "Technology", "Finance", "Healthcare", "Education", "Retail"];
  sizes: string[] = ["All Sizes", "1-50", "51-200", "201-500", "501-1000", "1000+"];
  locations: string[] = ["All Locations", "San Francisco", "New York", "London", "Berlin", "Tokyo", "Remote"];

  itemsPerPage = 8;
  currentPage = 1;
  totalPages = 1;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.selectedIndustry = "All Industries";
    this.selectedSize = "All Sizes";
    this.selectedLocation = "All Locations";
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe(
      (companies) => {
        this.companies = companies;
        this.applyFilters();
      },
      (error) => {
        console.error("Error fetching companies:", error);
      }
    );
  }

  applyFilters(): void {
    this.filteredCompanies = this.companies.filter((company) => {
      return (
        (this.searchTerm === "" || company.name.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
        (this.selectedIndustry === "" || this.selectedIndustry === "All Industries" || company.industry === this.selectedIndustry) &&
        (this.selectedSize === "" || this.selectedSize === "All Sizes" || this.isCompanyInSizeRange(company.size, this.selectedSize)) &&
        (this.selectedLocation === "" || this.selectedLocation === "All Locations" || company.locations.includes(this.selectedLocation))
      );
    });
    this.currentPage = 1;
    this.updatePagination();
  }

  isCompanyInSizeRange(companySize: string, selectedSize: string): boolean {
    const [min, max] = selectedSize.split("-").map(Number);
    const size = Number.parseInt(companySize);
    return size >= min && (max ? size <= max : true);
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredCompanies.length / this.itemsPerPage);
    this.displayedCompanies = this.filteredCompanies.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onIndustryChange(): void {
    this.applyFilters();
  }

  onSizeChange(): void {
    this.applyFilters();
  }

  onLocationChange(): void {
    this.applyFilters();
  }
}
