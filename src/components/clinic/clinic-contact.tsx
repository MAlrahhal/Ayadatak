import type { ReactNode } from "react";
import type { ClinicContent } from "@/types/clinic";
import { ClinicContainer, ClinicSectionHeading, clinicFocusClass } from "./clinic-primitives";
import type { ClinicEditorSlots } from "./clinic-editor-slots";
import {
  clinicDayLabels,
  clinicSocialLabels,
  formatClinicTime,
  getEmailHref,
  getPhoneHref,
  getPreviewSafeActionHref,
  getSafeExternalUrl,
  getWhatsAppHref,
  hasClinicContactSection,
} from "./clinic-utils";

function ContactValue({ href, previewMode, children }: { href: string | null; previewMode: boolean; children: ReactNode }) {
  const actionHref = getPreviewSafeActionHref(href, previewMode);
  if (!actionHref) return <span className="font-bold text-slate-900">{children}</span>;
  return <a href={actionHref} className={`font-bold text-slate-900 underline decoration-sky-200 underline-offset-4 hover:text-[var(--clinic-primary)] ${clinicFocusClass}`}>{children}</a>;
}

export function ClinicContactSection({ clinic, previewMode, editor }: { clinic: ClinicContent; previewMode: boolean; editor?: ClinicEditorSlots }) {
  if (!hasClinicContactSection(clinic)) return null;

  const visibility = clinic.sectionVisibility;
  const mapUrl = getSafeExternalUrl(clinic.location.mapUrl);
  const mapActionHref = getPreviewSafeActionHref(mapUrl, previewMode);

  return (
    <section id="contact" className="bg-sky-50/70 py-16 sm:py-20 lg:py-24">
      <ClinicContainer>
        <ClinicSectionHeading eyebrow="نحن بالقرب منكم" title="الموقع وساعات العمل والتواصل" description="اطّلعوا على معلومات العيادة واختروا وسيلة التواصل المناسبة." />
        <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-3">
          {visibility.location && clinic.location.address.trim() ? (
            <article className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
              {editor ? <div className="mb-3">{editor.edit("location")}</div> : null}
              <p className="text-sm font-bold text-[var(--clinic-primary)]">الموقع</p>
              <h3 className="mt-3 text-xl font-black text-slate-900">عنوان العيادة</h3>
              <p className="mt-3 leading-8 text-slate-600">{clinic.location.address}</p>
              {mapUrl ? !mapActionHref ? (
                <span className="mt-5 inline-flex min-h-11 items-center rounded-xl border border-sky-200 px-4 text-sm font-bold text-slate-500" aria-disabled="true">رابط الخريطة معطّل في العرض التجريبي</span>
              ) : (
                <a href={mapActionHref} target="_blank" rel="noreferrer" className={`mt-5 inline-flex min-h-11 items-center rounded-xl border border-sky-200 px-4 text-sm font-bold text-[var(--clinic-primary)] hover:bg-sky-50 ${clinicFocusClass}`}>فتح الاتجاهات</a>
              ) : null}
            </article>
          ) : null}

          {visibility.workingHours && clinic.workingHours.length > 0 ? (
            <article className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm lg:row-span-2">
              {editor ? <div className="mb-3">{editor.edit("workingHours")}</div> : null}
              <p className="text-sm font-bold text-[var(--clinic-primary)]">ساعات العمل</p>
              <h3 className="mt-3 text-xl font-black text-slate-900">مواعيد استقبال المراجعين</h3>
              <dl className="mt-5 divide-y divide-sky-50">
                {clinic.workingHours.map((workingDay) => (
                  <div key={workingDay.day} className="flex items-start justify-between gap-4 py-3 text-sm">
                    <dt className="font-bold text-slate-700">{clinicDayLabels[workingDay.day]}</dt>
                    <dd className="text-left text-slate-600">
                      {workingDay.isOpen && workingDay.periods.length > 0 ? workingDay.periods.map((period) => (
                        <span key={`${period.opensAt}-${period.closesAt}`} className="block" dir="rtl">{formatClinicTime(period.opensAt)} – {formatClinicTime(period.closesAt)}</span>
                      )) : <span className="font-bold text-slate-400">مغلق</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ) : null}

          {visibility.contact ? (
            <article className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
              {editor ? <div className="mb-3">{editor.edit("contact")}</div> : null}
              <p className="text-sm font-bold text-[var(--clinic-primary)]">التواصل</p>
              <h3 className="mt-3 text-xl font-black text-slate-900">تواصلوا معنا</h3>
              <dl className="mt-5 space-y-4 text-sm">
                <div><dt className="text-slate-500">الهاتف</dt><dd className="mt-1" dir="ltr"><ContactValue href={getPhoneHref(clinic.contact.phone)} previewMode={previewMode}>{clinic.contact.phone}</ContactValue></dd></div>
                {clinic.contact.whatsapp ? <div><dt className="text-slate-500">واتساب</dt><dd className="mt-1" dir="ltr"><ContactValue href={getWhatsAppHref(clinic.contact.whatsapp)} previewMode={previewMode}>{clinic.contact.whatsapp}</ContactValue></dd></div> : null}
                {clinic.contact.email ? <div><dt className="text-slate-500">البريد الإلكتروني</dt><dd className="mt-1 break-all" dir="ltr"><ContactValue href={getEmailHref(clinic.contact.email)} previewMode={previewMode}>{clinic.contact.email}</ContactValue></dd></div> : null}
              </dl>
            </article>
          ) : null}

          {visibility.socialLinks && clinic.socialLinks.length > 0 ? (
            <article className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
              {editor ? <div className="mb-3">{editor.edit("socialLinks")}</div> : null}
              <p className="text-sm font-bold text-[var(--clinic-primary)]">حسابات العيادة</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {clinic.socialLinks.map((link) => {
                  const href = getSafeExternalUrl(link.url);
                  if (!href) return null;
                  const actionHref = getPreviewSafeActionHref(href, previewMode);
                  return actionHref ? <a key={link.platform} href={actionHref} target="_blank" rel="noreferrer" className={`inline-flex min-h-11 items-center rounded-xl bg-sky-50 px-4 text-sm font-bold text-[var(--clinic-primary)] hover:bg-sky-100 ${clinicFocusClass}`}>{clinicSocialLabels[link.platform]}</a> : <span key={link.platform} className="inline-flex min-h-11 items-center rounded-xl bg-sky-50 px-4 text-sm font-bold text-slate-500">{clinicSocialLabels[link.platform]}</span>;
                })}
              </div>
            </article>
          ) : null}
        </div>
      </ClinicContainer>
    </section>
  );
}
