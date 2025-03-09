export function transformCandidateProfile(input: any): any {
  return {
    id: input.candidateProfile.id,
    resume: "resume.pdf",
    avatar: "https://avatar.iran.liara.run/public/40",
    "Personal Details": {
      "Name": input.candidateProfile.name,
      "Email": "candidate0@example.com", // Default value, as it's not in the input
      "Mobile Phone": "6543210987", // Default value, as it's not in the input
      "Address": input.candidateProfile.currentLocation,
    },
    "Professional Details": {
      "Current Location": input.candidateProfile.currentLocation,
      "Experience": input.candidateProfile.experience,
      "Current Role": input.candidateProfile.currentRole,
      "Current CTC": input.candidateProfile.currentCtc,
      "Current Company": input.candidateProfile.currentCompany,
      "Current Industry": input.candidateProfile.currentIndustry,
      "Education Details": input.candidateProfile.educationDetails,
      "Skills": input.candidateProfile.skills,
      "Current Notice Period": input.candidateProfile.currentNoticePeriod,
      "Social Media": "linkedin.com/in/sneha", // Default value, as it's not in the input
    },
    "Job Preference": {
      "Location": input.jobPreference.location,
      "Expected CTC": input.jobPreference.expectedCtc,
      "Role": input.jobPreference.role,
      "Industry": input.jobPreference.industry,
      "Work Mode": input.jobPreference.workMode,
      "Job Type": input.jobPreference.jobType,
    },
  };
}

export function transformCandidateData(input:any) {
  return {
      "Personal Details": {
          "Name": input.personalDetails.Name,
          "Email": input.personalDetails.Email,
          "Mobile Phone": input.personalDetails.MobilePhone,
          "Address": input.personalDetails.Address
      },
      "Professional Details": {
          "Current Location": input.professionalDetails.CurrentLocation,
          "Experience": input.professionalDetails.Experience,
          "Current Role": input.professionalDetails.CurrentRole,
          "Current CTC": input.professionalDetails.CurrentCTC,
          "Current Company": input.professionalDetails.CurrentCompany,
          "Current Industry": input.professionalDetails.CurrentIndustry,
          "Education Details": input.professionalDetails.EducationDetails,
          "Skills": input.professionalDetails.Skills.split(", ").map((skill:any) => skill.trim()), // Convert skills to an array
          "Current Notice Period": input.professionalDetails.CurrentNoticePeriod,
          "Social Media": input.professionalDetails.SocialMedia
      },
      "Job Preference": {
          "Location": input.jobPreference.Location,
          "Expected CTC": input.jobPreference.ExpectedCTC,
          "Role": input.jobPreference.Role,
          "Industry": input.jobPreference.Industry,
          "Work Mode": input.jobPreference.WorkMode,
          "Job Type": input.jobPreference.JobType
      }
  };
}


