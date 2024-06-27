import prisma from "@/lib/prisma";
import JobListItem from "./JobListItem";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";

interface JobResultsProps {
    filterValues: JobFilterValues,
}
export default async function JobResults({
    filterValues: {q,type,location,remote},
}: JobResultsProps) {
    const searchString = q?.split(" ").filter(word => word.length > 0).join(" & ");

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

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <JobListItem job={job} key={job.id} />
      ))}
      {jobs.length === 0 && (
        <p className="text-center m-auto">
            No Jobs Found. Try adjusting your search filters.
        </p>
      )}
    </div>
  );
}
