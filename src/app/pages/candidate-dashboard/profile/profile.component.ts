import { Component, type OnInit } from "@angular/core"
import  { AuthService } from "../../../services/auth.service"

@Component({
  selector: "app-profile",
  template: `
  <app-personal-info>  </app-personal-info>
  <app-skills></app-skills>
  <app-experience></app-experience>
  <app-education></app-education>

  <app-resume></app-resume>
  <app-links></app-links>



  `,
})
export class ProfileComponent implements OnInit {
  profile: any = {};
  editMode: { [key: string]: boolean } = {}; // Track edit mode for each field

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.profile = { ...user };
      }
    });
  }

  enableEdit(field: string) {
    this.editMode[field] = true;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]
    if (file) {
    // Here you would typically upload the file to your server
    console.log("File selected:", file.name)
    }
    }

  saveProfile(field: string) {
    this.editMode[field] = false;
    this.authService.updateProfile(this.profile).subscribe(
      (updatedUser) => {
        console.log("Profile updated successfully");
        this.authService.setCurrentUser(updatedUser);
      },
      (error) => {
        console.error("Error updating profile:", error);
      }
    );
  }
}

