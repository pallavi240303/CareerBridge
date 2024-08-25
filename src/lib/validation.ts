import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";
import { branches } from "./branches";

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Must provide an application email or url",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    },
  );

export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      "Invalid job type",
    ),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(500).optional(),
    salary: numericRequiredString.max(
      9,
      "Number can't be longer than 9 digits",
    ),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type createJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;


export const alumniFilterSchema = z.object({
  q: z.string().optional(),
  branch: z.string().optional(),
});

export type AlumniFilterValues = z.infer<typeof alumniFilterSchema>;

export const createAlumniSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  graduationYear:numericRequiredString.max(
    4,
    "Number can't be longer than 4 digits",
  ),
  branch: z.string().min(1, "Branch is required").refine(value => branches.includes(value), "Invalid branch"),
  currentJobRole: z.string().max(100, "Current job role must be less than 100 characters"),
  currentCompany: z.string().max(100, "Current company must be less than 100 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number").optional(),
  linkedinUrl: z.string().url("Invalid URL"), 
  twitterUrl: z.string().url("Invalid URL").optional(),
  githubUrl: z.string().url("Invalid URL").optional(),
});

export type CreateAlumniValues = z.infer<typeof createAlumniSchema>;