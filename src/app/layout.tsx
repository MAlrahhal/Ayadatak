import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-sans-arabic",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ayadatak.com"),
  title: {
    default: "عيادتك | موقع احترافي لعيادتك",
    template: "%s | عيادتك",
  },
  description:
    "منصة عربية تساعد العيادات والأطباء على إنشاء وإدارة موقع احترافي للعيادة من مكان واحد.",
  applicationName: "عيادتك",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "عيادتك",
    title: "عيادتك | موقع احترافي لعيادتك",
    description:
      "أنشئ موقع عيادتك واعرض خدماتك وأطباءك ومعلومات التواصل من لوحة إدارة عربية سهلة.",
  },
  twitter: {
    card: "summary",
    title: "عيادتك | موقع احترافي لعيادتك",
    description:
      "أنشئ موقع عيادتك واعرض خدماتك وأطباءك ومعلومات التواصل من لوحة إدارة عربية سهلة.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${notoSansArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
