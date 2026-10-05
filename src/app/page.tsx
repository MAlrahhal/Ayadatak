import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center py-16">
      <Container className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          عيادتك
        </h1>
        <p className="mt-2 text-base text-foreground-muted">قيد الإنشاء</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary">زر رئيسي</Button>
          <Button variant="secondary">زر ثانوي</Button>
          <Button variant="ghost">زر شفاف</Button>
          <Button variant="primary" disabled>
            معطل
          </Button>
        </div>
      </Container>
    </main>
  );
}
