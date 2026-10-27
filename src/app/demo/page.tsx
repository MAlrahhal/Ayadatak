import type { Metadata } from "next";
import { ClinicTemplate } from "@/components/clinic";
import { demoClinic } from "@/data/demo-clinic";

export const metadata: Metadata = {
  title: "معاينة عيادة النور التجريبية",
  description: "معاينة خيالية توضح قالب موقع العيادة في منصة عيادتك.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function DemoClinicPage() {
  return <ClinicTemplate clinic={demoClinic} previewMode />;
}
