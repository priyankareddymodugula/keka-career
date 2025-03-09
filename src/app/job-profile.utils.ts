export function transformJobProfile(input: any): any {
  return {
    id: input.jobProfile.id,
    "Job Profile": input.jobProfile.role,
    Name: `${input.jobProfile.role} - Level 2`, // Example name
    Description: `We are looking for a talented ${input.jobProfile.role} to join our team...`, // Example description
    Role: input.jobProfile.role,
    Location: input.jobProfile.location,
    "Work Mode": input.jobProfile.workMode,
    "No of openings": 3, // Default value, as it's not in the input
    "Job Type": input.jobProfile.jobType,
    Department: "Engineering", // Default value, as it's not in the input
    "Candidate Preference": {
      "Skill Set": input.jobProfile.skills,
      Experience: input.candidatePreferences.experience,
      "Education Details": input.candidatePreferences.education.join(', '),
      "Notice Period": input.candidatePreferences.noticePeriod,
      "Salary Range": input.jobProfile.salary,
    },
    status: "Active", // Default value, as it's not in the input
    postedDate: "2023-03-01", // Default value, as it's not in the input
    deadline: "2023-04-01", // Default value, as it's not in the input
    matchedCandidates: 2, // Default value, as it's not in the input
  };
}
