"use client";

import { useState } from "react";
import {
  CircleNotch,
  CheckCircle,
  ArrowRight,
  ArrowClockwise,
} from "@phosphor-icons/react";
import type { Dictionary } from "@/i18n/bg";

type ContactDict = Dictionary["contact"];

type Errors = {
  name?: boolean;
  email?: boolean;
  message?: boolean;
  consent?: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ENDPOINT = "/contact.php";

export function ContactForm({ dict }: { dict: ContactDict }) {
  const [instance, setInstance] = useState(0);
  return (
    <ContactFormInner
      key={instance}
      dict={dict}
      onReset={() => setInstance((i) => i + 1)}
    />
  );
}

function ContactFormInner({
  dict,
  onReset,
}: {
  dict: ContactDict;
  onReset: () => void;
}) {
  const f = dict.form;
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<Errors>({});
  const [failed, setFailed] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill the hidden field.
    if (((data.get("company_website") as string) ?? "").trim()) {
      setStatus("success");
      return;
    }

    const next: Errors = {};
    if (!((data.get("name") as string) ?? "").trim()) next.name = true;
    if (!EMAIL_RE.test(((data.get("email") as string) ?? "").trim()))
      next.email = true;
    if (((data.get("message") as string) ?? "").trim().length < 10)
      next.message = true;
    if (data.get("consent") !== "on") next.consent = true;

    setErrors(next);
    setFailed(false);
    if (Object.keys(next).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, { method: "POST", body: data });
      if (!res.ok) throw new Error("send failed");
      const json = await res.json().catch(() => ({ ok: true }));
      if (json.ok === false) throw new Error("send failed");
      setStatus("success");
    } catch {
      setFailed(true);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center rounded-2xl border border-line bg-surface/40 p-8 md:p-10">
        <span className="grid size-12 place-items-center rounded-full bg-accent text-[oklch(0.16_0_0)]">
          <CheckCircle size={26} weight="fill" />
        </span>
        <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-ink">
          {dict.success.title}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          {dict.success.body}
        </p>
        <button
          type="button"
          onClick={onReset}
          className="btn-ghost group mt-8 !py-2.5 !text-sm"
        >
          <ArrowClockwise size={16} weight="bold" />
          {dict.success.again}
        </button>
      </div>
    );
  }

  const isPending = status === "sending";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-line bg-surface/40 p-6 md:p-8"
    >
      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company website
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={f.name.label} error={errors.name ? dict.errors.name : undefined}>
            <input name="name" type="text" placeholder={f.name.placeholder} className={inputCls(errors.name)} />
          </Field>
          <Field label={f.email.label} error={errors.email ? dict.errors.email : undefined}>
            <input name="email" type="email" placeholder={f.email.placeholder} className={inputCls(errors.email)} />
          </Field>
        </div>

        <Field label={f.company.label} hint={f.company.hint}>
          <input name="company" type="text" placeholder={f.company.placeholder} className={inputCls(false)} />
        </Field>

        <Field label={f.interest.label}>
          <select name="interest" defaultValue={f.interest.options[0]} className={inputCls(false)}>
            {f.interest.options.map((o) => (
              <option key={o} value={o} className="bg-surface text-ink">
                {o}
              </option>
            ))}
          </select>
        </Field>

        <Field label={f.message.label} error={errors.message ? dict.errors.message : undefined}>
          <textarea
            name="message"
            rows={5}
            placeholder={f.message.placeholder}
            className={`${inputCls(errors.message)} resize-y`}
          />
        </Field>

        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 size-4 shrink-0 rounded border-line-strong"
            style={{ accentColor: "var(--color-accent)" }}
          />
          <span>
            {f.consent}
            {errors.consent && (
              <span className="mt-1 block text-[oklch(0.72_0.17_25)]">
                {dict.errors.consent}
              </span>
            )}
          </span>
        </label>

        {failed && (
          <p className="rounded-lg border border-[oklch(0.5_0.16_25/0.5)] bg-[oklch(0.5_0.16_25/0.12)] px-4 py-3 text-sm text-[oklch(0.78_0.15_25)]">
            {dict.errors.generic}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="btn-accent mt-1 w-full justify-center disabled:opacity-60 sm:w-auto"
        >
          {isPending ? (
            <>
              <CircleNotch size={18} weight="bold" className="animate-spin" />
              {f.sending}
            </>
          ) : (
            <>
              {f.submit}
              <ArrowRight size={18} weight="bold" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-ink">
        {label}
        {hint && <span className="text-xs font-normal text-faint">{hint}</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-[oklch(0.72_0.17_25)]">{error}</p>}
    </div>
  );
}

function inputCls(error?: boolean) {
  return `w-full rounded-lg border bg-bg/50 px-4 py-3 text-[0.95rem] text-ink placeholder:text-faint transition-colors duration-200 focus:border-accent focus:outline-none ${
    error ? "border-[oklch(0.55_0.17_25)]" : "border-line"
  }`;
}
