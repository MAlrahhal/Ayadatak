import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClinicTemplate } from "@/components/clinic";
import { getFixtureClinicSlugs, resolveClinicBySlug } from "@/lib/clinic-resolver";

type DemoClinicPageProps = {
  params: Promise<{ slug: string }>;
};

const noIndexRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
};

export function generateStaticParams() {
  return getFixtureClinicSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DemoClinicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await resolveClinicBySlug(slug);

  if (!result.ok) {
    return {
      title: "معاينة عيادة غير متاحة",
      robots: noIndexRobots,
    };
  }

  return {
    title: `معاينة ${result.clinic.identity.nameAr}`,
    description: `معاينة خيالية لقالب موقع ${result.clinic.identity.nameAr} في منصة عيادتك.`,
    robots: noIndexRobots,
  };
}

export default async function DemoClinicBySlugPage({ params }: DemoClinicPageProps) {
  const { slug } = await params;
  const result = await resolveClinicBySlug(slug);

  if (!result.ok) {
    notFound();
  }

  return <ClinicTemplate clinic={result.clinic} previewMode />;
}
