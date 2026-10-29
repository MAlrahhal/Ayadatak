import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VisualWebsiteEditor } from "@/components/dashboard/visual-website-editor";
import { PrototypeClinicPreview } from "@/components/dashboard/prototype-clinic-preview";

export const metadata: Metadata = {
  title: "محرر موقع العيادة التجريبي",
  description: "محرر بصري تجريبي محلي لموقع عيادة خيالية.",
  robots: { index: false, follow: false },
};

export default async function DashboardDemoPage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  // P5 has not supplied verified sessions. Never serve this editor in a deployment.
  if (process.env.NODE_ENV !== "development") notFound();
  return (await searchParams).preview === "1" ? <PrototypeClinicPreview /> : <VisualWebsiteEditor />;
}
