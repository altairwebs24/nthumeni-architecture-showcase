import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nthumeni Architecture" },
      { name: "description", content: "Begin a conversation with Nthumeni Architecture about a new project, site or commission." },
      { property: "og:title", content: "Contact — Nthumeni Architecture" },
      { property: "og:description", content: "Start a project with the studio." },
    ],
  }),
  component: ContactPage,
});

const WHATSAPP_NUMBER = "27837505726";

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", location: "", brief: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const whatsappHref = () => {
    const msg =
      `Hello Nthumeni Architecture,\n\n` +
      `My name is ${form.name || "[your name]"}.\n` +
      (form.location ? `Site / location: ${form.location}\n` : "") +
      (form.email ? `Email: ${form.email}\n` : "") +
      `\nProject brief:\n${form.brief || "[tell us about your project]"}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section className="container-x pt-16 md:pt-24 pb-24 grid md:grid-cols-12 gap-12">
      <div className="md:col-span-5">
        <p className="eyebrow">Contact</p>
        <h1 className="font-display text-5xl md:text-7xl mt-5 leading-[0.95]">
          Let's <em className="italic text-accent">begin.</em>
        </h1>
        <p className="mt-6 text-foreground/80 max-w-prose">
          Tell us a little about your site, your brief, or the idea you're carrying.
          We respond to every enquiry within five working days.
        </p>

        <dl className="mt-12 space-y-6 text-sm">
          <div>
            <dt className="eyebrow mb-1">Studio</dt>
            <dd>Sibasa, Thohoyandou 0970<br />Limpopo, South Africa</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">Cell</dt>
            <dd><a className="hover:text-accent" href="tel:+27837505726">083 750 5726</a></dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">WhatsApp</dt>
            <dd>
              <a
                className="hover:text-accent"
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Nthumeni Architecture, I'd like to enquire about a project.")}`}
                target="_blank"
                rel="noreferrer"
              >
                +27 83 750 5726
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">Email</dt>
            <dd>
              <a className="hover:text-accent block" href="mailto:info@nthumeniarchi.co.za">info@nthumeniarchi.co.za</a>
              <a className="hover:text-accent block" href="mailto:nenongwen@gmail.com">nenongwen@gmail.com</a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">Instagram</dt>
            <dd><a className="hover:text-accent" href="https://www.instagram.com/nthumeni.architecture" target="_blank" rel="noreferrer">@nthumeni.architecture</a></dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">Facebook</dt>
            <dd><a className="hover:text-accent" href="https://www.facebook.com/nenongwe" target="_blank" rel="noreferrer">facebook.com/nenongwe</a></dd>
          </div>
        </dl>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        className="md:col-span-7 space-y-6"
      >
        <Field label="Name" name="name" value={form.name} onChange={update("name")} required />
        <Field label="Email" name="email" type="email" value={form.email} onChange={update("email")} required />
        <Field label="Location / site" name="location" value={form.location} onChange={update("location")} />
        <div>
          <label className="eyebrow block mb-2" htmlFor="brief">Project brief</label>
          <textarea
            id="brief"
            name="brief"
            rows={6}
            required
            maxLength={2000}
            value={form.brief}
            onChange={update("brief")}
            className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 resize-none"
            placeholder="Tell us about your project…"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm hover:bg-accent transition-colors"
          >
            {sent ? "Thank you — we'll be in touch" : "Send enquiry"}
          </button>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-sm hover:border-accent hover:text-accent transition-colors"
          >
            Send via WhatsApp
          </a>
        </div>
      </form>
    </section>
  );
}

function Field({
  label, name, type = "text", required, value, onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="eyebrow block mb-2" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        maxLength={255}
        className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3"
      />
    </div>
  );
}
