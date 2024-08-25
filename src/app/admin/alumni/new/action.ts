"use server";

import { createAlumniSchema } from "@/lib/validation";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createAlumni(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  
  const {
    firstName,
    lastName,
    email,
    graduationYear,
    branch,
    phoneNumber,
    linkedinUrl,
    currentJobRole,
    currentCompany,
    twitterUrl,
    githubUrl
  } = createAlumniSchema.parse(values);

  await prisma.alumni.create({
    data: {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email?.trim() || "", // Ensure email is not undefined
      graduationYear : parseInt(graduationYear),
      branch: branch.trim(),
      contact: phoneNumber ? parseInt(phoneNumber) : undefined, // Convert phoneNumber if it exists
      linkedinUrl: linkedinUrl?.trim() || "", // Handle optional fields
      currentJobRole: currentJobRole?.trim() || "", // Handle optional fields
      currentCompany: currentCompany?.trim() || "", // Handle optional fields
      twitterUrl: twitterUrl?.trim() || "", // Handle optional fields
      githubUrl: githubUrl?.trim() || "", // Handle optional fields
    }
  });

  redirect("/alumni-submitted");
}
