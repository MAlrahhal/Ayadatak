import { Container } from "@/components/ui/container";
import { PublicClinicShowcase } from "@/components/marketing/public-clinic-showcase";

export function ClinicWebsitePreview() {
  return (
    <section aria-labelledby="clinic-preview-title" className="overflow-hidden bg-[#f8fcfd] py-10 max-[360px]:max-w-[calc(100vw-16px)] sm:py-14">
      <Container>
        <h2 id="clinic-preview-title" className="mb-8 text-center text-2xl font-black leading-relaxed tracking-[-0.025em] text-[#08384b] sm:mb-10 sm:text-3xl">
          موقع يعكس هوية عيادتك
        </h2>
        <PublicClinicShowcase />
      </Container>
    </section>
  );
}
