-- CreateTable
CREATE TABLE "job" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "locationType" TEXT NOT NULL,
    "location" TEXT,
    "description" TEXT,
    "salary" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "applicationEmail" TEXT,
    "applicationUrl" TEXT,
    "companyLogoUrl" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alumni" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "graduationYear" INTEGER NOT NULL,
    "branch" TEXT NOT NULL,
    "contact" INTEGER,
    "linkedinUrl" TEXT NOT NULL,
    "currentJobRole" TEXT NOT NULL,
    "currentCompany" TEXT NOT NULL,
    "twitterUrl" TEXT,
    "githubUrl" TEXT,

    CONSTRAINT "alumni_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_slug_key" ON "job"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "alumni_email_key" ON "alumni"("email");
