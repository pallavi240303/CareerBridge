import React from 'react'
import H1 from "@/components/ui/h1";
import AlumniListItem from '@/components/AlumniListItem';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AlumniFilterSidebar from '@/components/AlumniFilterSidebar';
import { AlumniFilterValues } from '@/lib/validation';
import AlumniResults from '@/components/AlumniResults';

interface PageProps {
  searchParams : {
    q?: string;
    graduationYear?: number;
    branch?: string;
  };
}
export default async function Alumnipage({searchParams : {q,graduationYear,branch},} : PageProps) {

  const filterValues: AlumniFilterValues = {
    q,
    branch,
  };

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3 ">
      <div className='flex justify-between items-center'>
        <div className="flex-grow text-center">
          <H1>Alumni Dashboard</H1>
          <p className="text-muted-foreground">
          Connecting Engineers, Building Futures, Celebrating Success.
          </p>
        </div>
        <div className='flex gap-2'>
        <Button className='ml-auto'>
          <Link href="/admin/alumni/new">Add Alumni</Link>
        </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row ">
        <AlumniFilterSidebar defaultValues={filterValues}/>
        <AlumniResults filterValues={filterValues} page={1}/>
      </div>
    </main>
  )
}

