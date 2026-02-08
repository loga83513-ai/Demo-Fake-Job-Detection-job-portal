export function aiVerifyJob(job) {
  let score = 0;
  let real = [];
  let fake = [];

  /* =====================
     BASIC CONTENT CHECK
  ====================== */
  if (job.company && job.company.length > 3) {
    score += 10;
    real.push("Company name looks valid");
  } else {
    fake.push("Company name missing or suspicious");
  }

  if (job.salary && job.salary.match(/[₹$]/)) {
    score += 10;
    real.push("Salary format looks realistic");
  } else {
    fake.push("Salary format unclear");
  }

  if (job.description && job.description.length > 50) {
    score += 15;
    real.push("Detailed job description provided");
  } else {
    fake.push("Job description too short");
  }

  /* =====================
     COMPANY IDENTITY CHECK
  ====================== */
  if (job.website && job.website.startsWith("http")) {
    score += 20;
    real.push("Official company website provided");
  } else {
    fake.push("No official company website");
  }

  if (
    job.email &&
    !job.email.includes("gmail") &&
    !job.email.includes("yahoo")
  ) {
    score += 15;
    real.push("Official company email domain used");
  } else {
    fake.push("Using free email provider");
  }

  if (job.linkedin && job.linkedin.includes("linkedin.com")) {
    score += 15;
    real.push("LinkedIn company profile available");
  } else {
    fake.push("No LinkedIn company profile");
  }

  /* =====================
     COMPANY AGE CHECK
  ====================== */
  if (job.companyAge && job.companyAge >= 2) {
    score += 15;
    real.push("Company has been operating for multiple years");
  } else {
    fake.push("Company age is very low or unknown");
  }

  /* =====================
     FINAL DECISION
  ====================== */
  let status = "FAKE JOB";

  if (score >= 70) status = "REAL JOB";
  else if (score >= 40) status = "SUSPICIOUS JOB";

  return {
    score,
    status,
    real,
    fake
  };
}
