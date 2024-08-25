"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import H1 from "@/components/ui/h1";
import { createAlumniSchema, CreateAlumniValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/LoadingButton";
import { createAlumni } from "./action";// Adjust the import to your actual path
import { branches } from "@/lib/branches";
import Select from "@/components/ui/select";

export default function NewAlumniForm() {
  const form = useForm<CreateAlumniValues>({
    resolver: zodResolver(createAlumniSchema),
    defaultValues: {
      graduationYear: undefined, // Ensure default values are correctly set
    }
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CreateAlumniValues) {
    const formData = new FormData();
  
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, String(value));
      }
    });
  
    try {
      await createAlumni(formData);
      alert("Alumni record created successfully!");
    } catch (error) {
      console.error("Error during form submission:", error); // Log the error
      alert("Something went wrong, please try again.");
    }
  }
  
  

  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      <div className="space-y-5 text-center">
        <H1>Add New Alumni</H1>
        <p className="text-muted-foreground">
          Fill in the details to add a new alumni record.
        </p>
      </div>
      <div className="space-y-6 rounded-lg border p-4">
        <div>
          <h2 className="font-semibold">Alumni Details</h2>
          <p className="text-muted-foreground">
            Provide all necessary details about the alumni.
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="e.g. john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="graduationYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graduation Year</FormLabel>
                  <FormControl>
                    <Input 
                      type="text" 
                      placeholder="e.g. 2023" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch</FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue="">
                      <option value="" disabled>Select a branch</option>
                      {branches.map((branch) => (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact (Optional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn URL</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="e.g. https://linkedin.com/in/johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="currentJobRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Job Role</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="currentCompany"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Company</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. TechCorp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="twitterUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter URL (Optional)</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="e.g. https://twitter.com/johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub URL (Optional)</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="e.g. https://github.com/johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={isSubmitting}>
              Submit
            </LoadingButton>
          </form>
        </Form>
      </div>
    </main>
  );
}
