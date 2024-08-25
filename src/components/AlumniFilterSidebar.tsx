import prisma from "@/lib/prisma";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import { Button } from "./ui/button";
import { AlumniFilterValues, alumniFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "./FormSubmitButton";
import { branches } from "@/lib/branches"; // Importing branches

async function filterAlumni(formData: FormData) {
    "use server";
  
    // Convert FormData to a plain object
    const values = Object.fromEntries(formData.entries()) as Record<string, string | undefined>;
  
    // Validate the converted values
    const { q, branch } = alumniFilterSchema.parse(values);
  
    // Create URLSearchParams with string values
    const searchParams = new URLSearchParams({
      ...(q && { q: q.trim() }),
      ...(branch && { branch }),
    });
  
    redirect(`/alumni/?${searchParams.toString()}`);
}

interface AlumniFilterSidebarProps {
  defaultValues: AlumniFilterValues;
}

export default async function AlumniFilterSidebar({ defaultValues }: AlumniFilterSidebarProps) {
  return (
    <aside className="roundedlg attack sticky top-0 mt-5 h-fit border bg-background p-4  md:w-[260px]">
      <form action={filterAlumni} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              placeholder="Name, company, etc."
              defaultValue={defaultValues.q}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="branch">Branch</Label>
            <Select id="branch" name="branch" defaultValue={defaultValues.branch || ""}>
              <option value="">All Branches</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </Select>
          </div>
          {/* Removed Graduation Year */}
          
          <FormSubmitButton className="w-full">Filter Alumni</FormSubmitButton>
        </div>
      </form>
    </aside>
  );
}
