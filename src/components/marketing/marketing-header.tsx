import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Brand } from "@/components/ui/brand";
import { getButtonClassName } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

const navItems = [
  ["الرئيسية", "#top"],
  ["المميزات", "#features"],
  ["القالب", "#templates"],
  ["كيف تعمل", "#how-it-works"],
] as const;

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-cyan-100/80 bg-white/92 backdrop-blur-xl">
      <Container className="flex h-[70px] items-center justify-between gap-4">
        <Link href="#top" aria-label="العودة إلى بداية الصفحة" className="-m-1 rounded-lg p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Brand />
        </Link>

        <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-7 lg:flex">
          {navItems.map(([label, href], index) => (
            <Link key={href} href={href} className={`relative py-6 text-sm font-bold transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${index === 0 ? "text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-primary" : "text-[#34566a]"}`}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="#templates" className={getButtonClassName({ size: "md" })}>
            استكشف القالب
          </Link>
        </div>

        <details className="group relative lg:hidden">
          <summary className="grid size-11 cursor-pointer list-none place-items-center rounded-lg border border-cyan-100 bg-white text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden" aria-label="فتح قائمة التنقل">
            <Icon name="menu" className="size-5" />
          </summary>
          <div className="absolute left-0 top-12 w-64 rounded-2xl border border-cyan-100 bg-white p-3 shadow-2xl">
            <nav aria-label="التنقل على الهاتف" className="grid gap-1">
              {navItems.map(([label, href]) => (
                <Link key={href} href={href} className="rounded-lg px-3 py-2.5 text-sm font-bold text-[#34566a] hover:bg-cyan-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{label}</Link>
              ))}
              <Link href="#templates" className="mt-2 rounded-lg bg-primary px-3 py-3 text-center text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">استكشف القالب</Link>
            </nav>
          </div>
        </details>
      </Container>
    </header>
  );
}
