import React from 'react';
import { Alumni } from "@prisma/client";
import { Briefcase, Linkedin, Twitter, Github, Mail, Book, Phone } from "lucide-react";
import { Button } from './ui/button';

interface AlumniListItemProps {
  alumni: Alumni;
}

export default function AlumniListItem({
  alumni: {
    firstName,
    lastName,
    email,
    graduationYear,
    branch,
    contact,
    linkedinUrl,
    currentJobRole,
    currentCompany,
    twitterUrl,
    githubUrl
  },
}: AlumniListItemProps) {
  return (
    <article className="flex outline justify-between items-center gap-3 rounded-lg border p-5 hover:bg-muted/60 my-5 shadow ">
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">
            {firstName} {lastName}
          </h2>
          <p className="text-muted-foreground">
            {currentJobRole} at {currentCompany}
          </p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <Book size={16} className="shrink-0" />
            {branch}
          </p>
          <p className="flex items-center gap-1.5">
            <Briefcase size={16} className="shrink-0" />
            Graduated: {graduationYear}
          </p>
          <p className="flex items-center gap-1.5">
            <Phone size={16} className="shrink-0" />
            Contact: {contact ? contact : "Not Provided"}
          </p>
        </div>
      </div>
      <div className="flex gap-2 flex-col mr-7">
        <a href={`mailto:${email}`} className="">
            <Button variant="outline" className="p-4 rounded-full bg-primary/90 text-white hover:outline">
              <Mail size={16} />
            </Button>
        </a>
        {linkedinUrl && (
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="p-4 rounded-full bg-primary/90 text-white hover:outline">
              <Linkedin size={16} />
            </Button>
          </a>
        )}
        {twitterUrl && (
          <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="p-4 rounded-full bg-primary/90 text-white hover:outline">
              <Twitter size={16} />
            </Button>
          </a>
        )}
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="p-4 rounded-full bg-primary/90 text-white hover:outline">
              <Github size={16} />
            </Button>
          </a>
        )}
      </div>
    </article>
  );
}
