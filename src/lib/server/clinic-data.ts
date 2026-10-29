import "server-only";

import { Prisma } from "@/generated/prisma/client";
import { createClinicDataService, type ClinicDataStore } from "@/lib/clinic-data-core";
import { prisma } from "./prisma";

const store: ClinicDataStore = {
  async membership(clinicId, userId) {
    return prisma.clinicMembership.findUnique({ where: { clinicId_userId: { clinicId, userId } }, select: { role: true } });
  },
  async clinicById(id) {
    return prisma.clinic.findUnique({ where: { id }, select: { id: true, slug: true, operationalState: true, publicationState: true } });
  },
  async clinicBySlug(slug) {
    return prisma.clinic.findUnique({ where: { slug }, select: { id: true, slug: true, operationalState: true, publicationState: true } });
  },
  async entitlement(clinicId) {
    return prisma.clinicEntitlement.findUnique({ where: { clinicId }, select: { startsAt: true, endsAt: true, accessExtendedUntil: true } });
  },
  async draft(clinicId, ownerUserId) {
    return prisma.clinicDraft.findFirst({
      where: { clinicId, clinic: { memberships: { some: { userId: ownerUserId, role: "OWNER" } } } },
      select: { content: true, schemaVersion: true, version: true, savedAt: true },
    });
  },
  async published(clinicId) {
    return prisma.clinicPublishedContent.findUnique({ where: { clinicId }, select: { content: true, schemaVersion: true, sourceDraftVersion: true, publicationNumber: true } });
  },
  async ownedMedia(clinicId, ids) {
    if (!ids.length) return [];
    return prisma.mediaAsset.findMany({ where: { clinicId, id: { in: [...ids] } }, select: { id: true, state: true } });
  },
  async saveDraftIfVersion({ clinicId, userId, expectedVersion, schemaVersion, content, savedAt }) {
    // The relational OWNER predicate is part of the atomic UPDATE, so a revoked
    // membership cannot win a race between the earlier check and this write.
    const result = await prisma.clinicDraft.updateMany({
      where: { clinicId, version: expectedVersion, schemaVersion, clinic: { memberships: { some: { userId, role: "OWNER" } } } },
      data: { content: JSON.parse(JSON.stringify(content)) as Prisma.InputJsonValue,
        schemaVersion, version: { increment: 1 }, savedAt, updatedById: userId },
    });
    return result.count === 1;
  },
};

/** Internal only. With no P5 session verifier, all protected methods fail closed. */
export const clinicData = createClinicDataService(store);
