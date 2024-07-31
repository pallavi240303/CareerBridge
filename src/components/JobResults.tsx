import prisma from "@/lib/prisma";
import JobListItem from "./JobListItem";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface JobResultsProps {
    filterValues: JobFilterValues,
    page?: number;
}
export default async function JobResults({
    filterValues,
    page = 1,
}: JobResultsProps) {
    const  {q,type,location,remote} = filterValues
    const searchString = q?.split(" ").filter(word => word.length > 0).join(" & ");

    const jobsPerPage = 6;
    const skip = (page -1) * jobsPerPage;

    const searchFilter : Prisma.JobWhereInput = searchString ?{
        OR: [
            {title: {search: searchString}},
            {companyName: {search: searchString}},
            {type: {search: searchString}},
            {locationType: {search: searchString}},
            {location: {search: searchString}},
        ],
    }
    : {};

    const where: Prisma.JobWhereInput = {
        AND: [
            searchFilter,
            type? {type}: {},
            location? {location}: {},
            remote? {locationType: "Remote"}: {},
            {approved: true}
        ]
    }

  const jobsPromise =  prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: jobsPerPage,
    skip,
  });

  const countPromise = prisma.job.count({where})
  const [jobs,totalResults] = await Promise.all([jobsPromise,countPromise])

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="text-center m-auto">
            No Jobs Found. Try adjusting your search filters.
        </p>
      )}
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults/jobsPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
}

interface PaginationProps{
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterValues
}

function Pagination({
  currentPage,totalPages,filterValues: {q,type,location,remote}
}: PaginationProps){
  function generatePageLink(page:number) {
    const searchParams = new URLSearchParams({
      ...(q && {q}),
      ...(type && {type}),
      ...(location && {location}),
      ...(remote && {remote:"true"}),
      page: page.toString(),
    })
    return `/?${searchParams.toString()}`
  }
  return <div className="flex justify-between">
    <Link href = {generatePageLink(currentPage -1)}
    className={cn(
      "flex items-center gap-2 font-semibold",
      currentPage <=1 && "invisible"
    )}>
      <ArrowLeft size={16} />
      Previous Page
    </Link>
    <span className="font-semibold"> Page {currentPage} of {totalPages}</span>
    <Link href = {generatePageLink(currentPage +1)}
    className={cn(
      "flex items-center gap-2 font-semibold",
      currentPage >=totalPages && "invisible"
    )}>
      Next Page
      <ArrowRight size={16} />
    </Link>
  </div>
}
