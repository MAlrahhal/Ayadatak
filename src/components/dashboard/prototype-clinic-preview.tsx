"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ClinicTemplate } from "@/components/clinic";
import { cloneInitialPrototype, parsePrototype, PROTOTYPE_STORAGE_KEY } from "@/lib/dashboard-prototype";
import type { ClinicContent } from "@/types/clinic";

export function PrototypeClinicPreview() {
  const [clinic, setClinic] = useState<ClinicContent | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(PROTOTYPE_STORAGE_KEY);
        if (raw === null) setClinic(cloneInitialPrototype());
        else {
          const parsed = parsePrototype(raw);
          if (parsed) setClinic(parsed);
          else setError("تعذر قراءة المسودة المحلية. افتح محرر الموقع وراجع بياناتها قبل المعاينة.");
        }
      } catch { setError("التخزين المحلي غير متاح. افتح محرر الموقع من هذا المتصفح وأعد المحاولة."); }
    });
    return () => window.clearTimeout(timer);
  }, []);

  if (error) return <main className="grid min-h-screen place-items-center bg-[#f5fafb] p-6 text-center" dir="rtl"><div><h1 className="text-xl font-black text-[#08384b]">المعاينة غير متاحة</h1><p className="mt-3 text-sm text-[#607d89]">{error}</p><Link href="/dashboard-demo" className="mt-6 inline-flex rounded-xl bg-[#089fc5] px-5 py-3 text-sm font-bold text-white">العودة إلى المحرر</Link></div></main>;
  if (!clinic) return <main className="grid min-h-screen place-items-center bg-[#f5fafb] p-6 text-sm text-[#607d89]" dir="rtl">جارٍ تحميل المعاينة المحلية...</main>;

  return <div dir="rtl">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#a8dce8] bg-[#e7f7fa] px-4 py-2 text-xs font-bold text-[#185269] sm:px-8">
      <span>معاينة المسودة المحفوظة على هذا المتصفح · نموذج تجريبي غير منشور</span>
      <Link href="/dashboard-demo" className="underline underline-offset-2 hover:text-[#087f9c]">العودة إلى المحرر</Link>
    </div>
    <ClinicTemplate clinic={clinic} previewMode />
  </div>;
}
