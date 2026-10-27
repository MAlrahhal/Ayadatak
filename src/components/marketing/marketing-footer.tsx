import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Brand } from "@/components/ui/brand";

const links = [
  ["الرئيسية", "#top"],
  ["لوحة الإدارة", "#dashboard"],
  ["المميزات", "#features"],
  ["كيف تعمل", "#how-it-works"],
  ["نموذج العيادة", "/demo"],
] as const;

export function MarketingFooter() {
  return (
    <footer className="border-t border-cyan-100 bg-white py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-7 md:flex-row">
          <div className="max-w-sm text-center md:text-right">
            <Link href="#top" className="-m-1 inline-block rounded-lg p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="عيادتك - العودة إلى البداية">
              <Brand />
            </Link>
            <p className="mt-3 text-xs leading-6 text-[#647d88]">مواقع عربية واضحة تساعد العيادات على عرض خدماتها ومعلوماتها.</p>
          </div>
          <nav aria-label="روابط التذييل" className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-bold text-[#456371]">
            {links.map(([label, href]) => <Link key={href} href={href} className="inline-flex min-h-11 items-center rounded-md px-1 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{label}</Link>)}
          </nav>
        </div>
        <div className="mt-8 border-t border-cyan-100 pt-5 text-center text-[11px] text-slate-500 md:text-right">
          <p>© ٢٠٢٦ عيادتك. جميع الحقوق محفوظة.</p>
        </div>
      </Container>
    </footer>
  );
}
