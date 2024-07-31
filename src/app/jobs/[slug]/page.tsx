import JobPage from "@/components/JobPage"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { cache } from "react"

interface PageProps {
    params: {slug: string}
}


const getJob = cache(async (slug: string) => {
    const job = await prisma.job.findUnique({
        where: {slug}
    })

    if(!job) notFound();
    
    return job;
})

export async function generateStaticParams(){
    //makes the page load faster and better SEO performance.
    const jobs = await prisma.job.findMany({
        where: {approved: true},
        select: {slug: true}
    })
    return jobs.map(({slug}) => slug);
    //made the slug fetch from dynamic to static so it doesnt take time to load the and fetch the info instead it fetches al the relevant slug at the time of build and then uses the cached slug.
    
    //This function fetches all approved job entries from the database and extracts their slugs to use them as static parameters, improving the performance of dynamic routes by pre-generating them at build time.
    
    //if a new job is added, it wont be shown in the site without recompiling the static site.So , Re-run the build process to regenerate the static paths with the updated data.
}

export async function generateMetadata({params: {slug},}:PageProps) : Promise<Metadata>{
    const job = await getJob(slug);
    return {
        title: job.title,
    };
}
export default async function Page({params: {slug}} : PageProps){
    const job = await getJob(slug);
    
    const {applicationUrl,applicationEmail} = job

    const applicationLink = applicationEmail
    ?`mailto: ${applicationEmail}` : applicationUrl;

    if(!applicationLink){
        console.log("Job has no application link or email");
        notFound();
    }

    return <main className="max-w-5xl px-3 m-auto my-10 flex flex-col md:flex-row items-center gap-5 md:items-start">
        <JobPage job={job}/>
        <aside>
            <Button asChild>
                <a href={applicationLink} className="ml-3 w-40 md:w-fit">
                    Apply Now
                </a>
            </Button>
            <Button asChild className="bg-red-500 hover:bg-red-800">
                <a href={`/admin/jobs/${job.slug}`} className="p-3 mt-2 ml-3 w-40 md:w-fit">
                    Delete
                </a>
            </Button>
        </aside>
    </main>
}