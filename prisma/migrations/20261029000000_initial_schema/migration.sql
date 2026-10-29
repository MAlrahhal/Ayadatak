-- P4.4 initial schema, prepared offline for the Ayadatak development database.
-- Review the direct connection target before applying; this file has not been run.
-- Prisma's schema datasource is PostgreSQL/public. Keep every unqualified object in public.
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";
SET search_path = "public", pg_catalog;

-- CreateEnum
CREATE TYPE "ClinicOperationalState" AS ENUM ('ACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "ClinicPublicationState" AS ENUM ('NEVER_PUBLISHED', 'PUBLISHED', 'UNPUBLISHED');

-- CreateEnum
CREATE TYPE "ClinicRole" AS ENUM ('OWNER', 'MEMBER');

-- CreateEnum
CREATE TYPE "EntitlementSource" AS ENUM ('PILOT', 'COMMERCIAL');

-- CreateEnum
CREATE TYPE "MediaState" AS ENUM ('PRIVATE_STAGED', 'PUBLIC_READY');

-- CreateTable
CREATE TABLE "AppUser" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "AppUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthIdentity" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "provider" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthIdentity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clinic" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(63) NOT NULL,
    "operationalState" "ClinicOperationalState" NOT NULL DEFAULT 'ACTIVE',
    "publicationState" "ClinicPublicationState" NOT NULL DEFAULT 'NEVER_PUBLISHED',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Clinic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClinicMembership" (
    "id" UUID NOT NULL,
    "clinicId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "role" "ClinicRole" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClinicMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClinicEntitlement" (
    "clinicId" UUID NOT NULL,
    "source" "EntitlementSource" NOT NULL,
    "startsAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" TIMESTAMPTZ(6) NOT NULL,
    "termVersion" INTEGER NOT NULL DEFAULT 1,
    "accessExtendedUntil" TIMESTAMPTZ(6),
    "extensionGrantedAt" TIMESTAMPTZ(6),
    "extensionGrantedById" UUID,
    "grantedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "ClinicEntitlement_pkey" PRIMARY KEY ("clinicId")
);

-- CreateTable
CREATE TABLE "ClinicDraft" (
    "clinicId" UUID NOT NULL,
    "content" JSONB NOT NULL,
    "schemaVersion" INTEGER NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "savedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedById" UUID,

    CONSTRAINT "ClinicDraft_pkey" PRIMARY KEY ("clinicId")
);

-- CreateTable
CREATE TABLE "ClinicPublishedContent" (
    "clinicId" UUID NOT NULL,
    "content" JSONB NOT NULL,
    "schemaVersion" INTEGER NOT NULL,
    "sourceDraftVersion" INTEGER NOT NULL,
    "publicationNumber" INTEGER NOT NULL,
    "publishedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedById" UUID,

    CONSTRAINT "ClinicPublishedContent_pkey" PRIMARY KEY ("clinicId")
);

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" UUID NOT NULL,
    "clinicId" UUID NOT NULL,
    "provider" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "objectKey" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "byteSize" INTEGER NOT NULL,
    "state" "MediaState" NOT NULL DEFAULT 'PRIVATE_STAGED',
    "uploadedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformAdminGrant" (
    "userId" UUID NOT NULL,
    "grantedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "grantedById" UUID,

    CONSTRAINT "PlatformAdminGrant_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE INDEX "AuthIdentity_userId_idx" ON "AuthIdentity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthIdentity_provider_subject_key" ON "AuthIdentity"("provider", "subject");

-- CreateIndex
CREATE UNIQUE INDEX "Clinic_slug_key" ON "Clinic"("slug");

-- CreateIndex
CREATE INDEX "ClinicMembership_userId_idx" ON "ClinicMembership"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ClinicMembership_clinicId_userId_key" ON "ClinicMembership"("clinicId", "userId");

-- CreateIndex
CREATE INDEX "ClinicEntitlement_endsAt_idx" ON "ClinicEntitlement"("endsAt");

-- CreateIndex
CREATE INDEX "MediaAsset_clinicId_idx" ON "MediaAsset"("clinicId");

-- CreateIndex
CREATE UNIQUE INDEX "MediaAsset_provider_bucket_objectKey_key" ON "MediaAsset"("provider", "bucket", "objectKey");

-- AddForeignKey
ALTER TABLE "AuthIdentity" ADD CONSTRAINT "AuthIdentity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AppUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicMembership" ADD CONSTRAINT "ClinicMembership_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicMembership" ADD CONSTRAINT "ClinicMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AppUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicEntitlement" ADD CONSTRAINT "ClinicEntitlement_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicEntitlement" ADD CONSTRAINT "ClinicEntitlement_grantedById_fkey" FOREIGN KEY ("grantedById") REFERENCES "AppUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicEntitlement" ADD CONSTRAINT "ClinicEntitlement_extensionGrantedById_fkey" FOREIGN KEY ("extensionGrantedById") REFERENCES "AppUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicDraft" ADD CONSTRAINT "ClinicDraft_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicDraft" ADD CONSTRAINT "ClinicDraft_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "AppUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicPublishedContent" ADD CONSTRAINT "ClinicPublishedContent_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicPublishedContent" ADD CONSTRAINT "ClinicPublishedContent_publishedById_fkey" FOREIGN KEY ("publishedById") REFERENCES "AppUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAsset" ADD CONSTRAINT "MediaAsset_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAsset" ADD CONSTRAINT "MediaAsset_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "AppUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformAdminGrant" ADD CONSTRAINT "PlatformAdminGrant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AppUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformAdminGrant" ADD CONSTRAINT "PlatformAdminGrant_grantedById_fkey" FOREIGN KEY ("grantedById") REFERENCES "AppUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- PostgreSQL checks not expressible in the Prisma schema. The ASCII/C collation
-- matches the production slug policy's 1-63 lowercase, alphanumeric-boundary format.
ALTER TABLE "Clinic" ADD CONSTRAINT "Clinic_slug_format_check"
    CHECK ("slug" = lower("slug") AND "slug" COLLATE "C" ~ '^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$');
-- Defense in depth for the current reserved-name policy; onboarding must reject
-- the same set before attempting an insert or rename.
ALTER TABLE "Clinic" ADD CONSTRAINT "Clinic_slug_reserved_check"
    CHECK ("slug" NOT IN ('admin', 'app', 'api', 'dashboard', 'billing', 'auth', 'mail', 'static', 'help', 'www'));

ALTER TABLE "ClinicEntitlement" ADD CONSTRAINT "ClinicEntitlement_term_dates_check"
    CHECK ("endsAt" > "startsAt");
ALTER TABLE "ClinicEntitlement" ADD CONSTRAINT "ClinicEntitlement_termVersion_positive_check"
    CHECK ("termVersion" > 0);
ALTER TABLE "ClinicEntitlement" ADD CONSTRAINT "ClinicEntitlement_extension_complete_check"
    CHECK (
        ("accessExtendedUntil" IS NULL AND "extensionGrantedAt" IS NULL AND "extensionGrantedById" IS NULL)
        OR
        ("accessExtendedUntil" IS NOT NULL AND "extensionGrantedAt" IS NOT NULL AND "extensionGrantedById" IS NOT NULL
            AND "accessExtendedUntil" > "extensionGrantedAt")
    );

ALTER TABLE "ClinicDraft" ADD CONSTRAINT "ClinicDraft_content_object_check"
    CHECK (jsonb_typeof("content") = 'object');
ALTER TABLE "ClinicDraft" ADD CONSTRAINT "ClinicDraft_versions_positive_check"
    CHECK ("schemaVersion" > 0 AND "version" > 0);

ALTER TABLE "ClinicPublishedContent" ADD CONSTRAINT "ClinicPublishedContent_content_object_check"
    CHECK (jsonb_typeof("content") = 'object');
ALTER TABLE "ClinicPublishedContent" ADD CONSTRAINT "ClinicPublishedContent_versions_positive_check"
    CHECK ("schemaVersion" > 0 AND "sourceDraftVersion" > 0 AND "publicationNumber" > 0);

ALTER TABLE "MediaAsset" ADD CONSTRAINT "MediaAsset_byteSize_positive_check"
    CHECK ("byteSize" > 0);
