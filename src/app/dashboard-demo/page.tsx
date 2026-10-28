import type { Metadata } from "next";
import { VisualWebsiteEditor } from "@/components/dashboard/visual-website-editor";
import { PrototypeClinicPreview } from "@/components/dashboard/prototype-clinic-preview";

export const metadata: Metadata = {
  title: "محرر موقع العيادة التجريبي",
  description: "محرر بصري تجريبي محلي لموقع عيادة خيالية.",
  robots: { index: false, follow: false },
};

export default async function DashboardDemoPage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  return (await searchParams).preview === "1" ? <PrototypeClinicPreview /> : <VisualWebsiteEditor />;
}
