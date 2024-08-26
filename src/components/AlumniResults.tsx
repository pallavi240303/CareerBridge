import prisma from "@/lib/prisma";
import AlumniListItem from "./AlumniListItem";
import { AlumniFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface AlumniResultsProps {
    filterValues: AlumniFilterValues,
    page?: number;
}

export default async function AlumniResults({
    filterValues,
    page = 1,
}: AlumniResultsProps) {
    const { q, branch } = filterValues;
    const searchString = q?.split(" ").filter(word => word.length > 0).join(" & ");

    const alumniPerPage = 6;
    const skip = (page - 1) * alumniPerPage;

    const searchFilter: Prisma.AlumniWhereInput = searchString ? {
        OR: [
            { firstName: { search: searchString } },
            { lastName: { search: searchString } },
            { currentJobRole: { search: searchString } },
            { currentCompany: { search: searchString } },
        ],
    } : {};

    const where: Prisma.AlumniWhereInput = {
        AND: [
            searchFilter,
            branch ? { branch } : {},
        ]
    };

    const alumniPromise = prisma.alumni.findMany({
        where,
        orderBy: { graduationYear: "desc" },
        take: alumniPerPage,
        skip,
    });

    const countPromise = prisma.alumni.count({ where });
    const [alumni, totalResults] = await Promise.all([alumniPromise, countPromise]);

    return (
        <div className="grow space-y-4">
            {alumni.length === 0 ? (
                <p className="text-center m-auto">
                    No Alumni Found. Try adjusting your search filters.
                </p>
            ) : (
                <>
                    {alumni.map((alumnus) => (
                        <div key={alumnus.id} className="block">
                            <AlumniListItem alumni={alumnus} />
                        </div>
                    ))}

                    <Pagination
                        currentPage={page}
                        totalPages={Math.ceil(totalResults / alumniPerPage)}
                        filterValues={filterValues}
                    />
                </>
            )}
        </div>
    );
}

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    filterValues: AlumniFilterValues;
}

function Pagination({
    currentPage, totalPages, filterValues: { q, branch }
}: PaginationProps) {
    function generatePageLink(page: number) {
        const searchParams = new URLSearchParams({
            ...(q && { q }),
            ...(branch && { branch }),
            page: page.toString(),
        });
        return `/alumni?${searchParams.toString()}`;
    }
    return (
        <div className="flex justify-between">
            <Link href={generatePageLink(currentPage - 1)}
                className={cn(
                    "flex items-center gap-2 font-semibold",
                    currentPage <= 1 && "invisible"
                )}
                passHref>
                <ArrowLeft size={16} />
                Previous Page
            </Link>
            <span className="font-semibold"> Page {currentPage} of {totalPages}</span>
            <Link href={generatePageLink(currentPage + 1)}
                className={cn(
                    "flex items-center gap-2 font-semibold",
                    currentPage >= totalPages && "invisible"
                )}
                passHref>
                Next Page
                <ArrowRight size={16} />
            </Link>
        </div>
    );
}
