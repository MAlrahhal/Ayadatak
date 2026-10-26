import { Container } from "@/components/ui/container";
import { Icon, type IconName } from "@/components/ui/icon";

const specialties: { label: string; icon: IconName }[] = [
  { label: "طب الأسرة", icon: "heart" },
  { label: "طب الأسنان", icon: "tooth" },
  { label: "الجلدية", icon: "spark" },
  { label: "العيون", icon: "eye" },
  { label: "النساء والولادة", icon: "stethoscope" },
  { label: "الأطفال", icon: "people" },
  { label: "المختبرات", icon: "clipboard" },
];

export function SpecialtiesStrip() {
  return (
    <section aria-labelledby="specialties-title" className="border-y border-cyan-100 bg-white py-6">
      <Container>
        <p id="specialties-title" className="mb-4 text-center text-xs font-bold text-primary sm:text-sm">
          مناسب لمختلف التخصصات الطبية
        </p>
        <ul className="flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center">
          {specialties.map((specialty) => (
            <li key={specialty.label} className="flex min-w-max snap-start items-center gap-2 rounded-xl border border-cyan-100 bg-[#fbfeff] px-4 py-2.5 text-xs font-bold text-[#234c5d]">
              <span className="grid size-7 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon name={specialty.icon} className="size-4" />
              </span>
              {specialty.label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
