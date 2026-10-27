import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getButtonClassName } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { PublicClinicShowcase } from "@/components/marketing/public-clinic-showcase";

export function MarketingHomeHero() {
  return (
    <section id="top" className="relative scroll-mt-20 overflow-hidden bg-[#f2fafc] py-10 max-[360px]:max-w-[calc(100vw-16px)] sm:py-14 lg:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" aria-hidden="true" />
      <Container className="relative grid items-center gap-9 sm:gap-11 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-8 xl:gap-12">
        <div className="mx-auto min-w-0 max-w-xl text-center lg:mx-0 lg:text-right">
          <h1 aria-label="كل ما يخص عيادتك، في موقع واحد." className="text-[1.9rem] font-black leading-[1.5] tracking-[-0.025em] text-[#08384b] sm:text-[2.5rem] lg:text-[2.25rem] xl:text-[2.65rem]">
            كل ما يخص عيادتك، <span className="text-primary">في موقع واحد.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#4f6d7a] sm:text-base sm:leading-8 lg:mx-0">
            عرّف بعيادتك، اعرض خدماتك، وسهّل على المرضى الوصول إليك.
          </p>
          <div className="mt-6 flex justify-center lg:justify-start">
            <Link href="/demo" className={getButtonClassName({ size: "lg", className: "min-w-52 shadow-[0_12px_30px_rgba(8,159,197,.22)]" })}>
              استعرض نموذج العيادة
              <Icon name="arrow-left" className="size-4" />
            </Link>
          </div>
        </div>
        <div className="min-w-0">
          <PublicClinicShowcase />
        </div>
      </Container>
    </section>
  );
}
