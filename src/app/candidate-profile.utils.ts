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
