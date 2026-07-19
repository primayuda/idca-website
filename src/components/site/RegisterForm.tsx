import { useState, type FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const WHATSAPP_NUMBER = "6281212343407";

const BUSINESS_TYPES = [
  { value: "dive-center", id: "Dive Center", en: "Dive Center" },
  { value: "dive-resort", id: "Dive Resort", en: "Dive Resort" },
  { value: "liveaboard", id: "Liveaboard", en: "Liveaboard" },
  { value: "travel-agent", id: "Travel Agent / Operator", en: "Travel Agent / Operator" },
  { value: "dive-shop", id: "Dive Shop / Peralatan", en: "Dive Shop / Equipment" },
  { value: "dive-school", id: "Dive School / Pelatihan", en: "Dive School / Training" },
  { value: "other", id: "Lainnya", en: "Other" },
];

type FormState = {
  company: string;
  businessType: string;
  location: string;
  contactName: string;
  whatsapp: string;
  email: string;
  website: string;
  message: string;
};

const EMPTY: FormState = {
  company: "",
  businessType: "",
  location: "",
  contactName: "",
  whatsapp: "",
  email: "",
  website: "",
  message: "",
};

export default function RegisterForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.company.trim()) next.company = "required";
    if (!form.businessType) next.businessType = "required";
    if (!form.location.trim()) next.location = "required";
    if (!form.contactName.trim()) next.contactName = "required";
    if (!form.whatsapp.trim()) next.whatsapp = "required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "invalid";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const businessLabel =
      BUSINESS_TYPES.find((b) => b.value === form.businessType)?.id ?? form.businessType;

    const lines = [
      "Halo IDCA, saya ingin mendaftar sebagai anggota:",
      `Nama Perusahaan: ${form.company}`,
      `Jenis Usaha: ${businessLabel}`,
      `Kota/Provinsi: ${form.location}`,
      `Contact Person: ${form.contactName}`,
      `No. WhatsApp: ${form.whatsapp}`,
      form.email ? `Email: ${form.email}` : null,
      form.website ? `Website: ${form.website}` : null,
      form.message ? `Pesan: ${form.message}` : null,
    ].filter(Boolean);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-reef/10 text-2xl">
          ✅
        </div>
        <h4 className="mt-4 font-display text-xl font-bold text-heading">
          <span lang="id">Pendaftaran Terkirim!</span>
          <span lang="en">Registration Sent!</span>
        </h4>
        <p className="mt-2 max-w-xs text-sm text-foreground/60">
          <span lang="id">
            WhatsApp telah terbuka. Tim IDCA akan segera menghubungi Anda untuk proses selanjutnya.
          </span>
          <span lang="en">
            WhatsApp has opened. The IDCA team will contact you shortly for the next steps.
          </span>
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => {
            setForm(EMPTY);
            setSubmitted(false);
          }}
        >
          <span lang="id">Daftar Lagi</span>
          <span lang="en">Register Another</span>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <p className="font-display text-sm font-bold uppercase tracking-wide text-reef">
        <span lang="id">📋 Formulir Pendaftaran Anggota</span>
        <span lang="en">📋 Member Registration Form</span>
      </p>

      <Field
        label={{ id: "Nama Perusahaan", en: "Company Name" }}
        required
        error={errors.company}
        errorText={{ id: "Nama perusahaan wajib diisi", en: "Company name is required" }}
      >
        <Input
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          placeholder="PT / CV ..."
        />
      </Field>

      <Field
        label={{ id: "Jenis Usaha", en: "Business Type" }}
        required
        error={errors.businessType}
        errorText={{ id: "Jenis usaha wajib dipilih", en: "Business type is required" }}
      >
        <Select value={form.businessType} onValueChange={(v) => update("businessType", v)}>
          <SelectTrigger>
            <SelectValue placeholder="-- Pilih / Select --" />
          </SelectTrigger>
          <SelectContent>
            {BUSINESS_TYPES.map((b) => (
              <SelectItem key={b.value} value={b.value}>
                <span lang="id">{b.id}</span>
                <span lang="en">{b.en}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field
        label={{ id: "Kota / Provinsi", en: "City / Province" }}
        required
        error={errors.location}
        errorText={{ id: "Lokasi wajib diisi", en: "Location is required" }}
      >
        <Input
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
          placeholder="Jakarta, DKI Jakarta"
        />
      </Field>

      <Field
        label={{ id: "Nama Contact Person", en: "Contact Person Name" }}
        required
        error={errors.contactName}
        errorText={{ id: "Nama contact person wajib diisi", en: "Contact person name is required" }}
      >
        <Input
          value={form.contactName}
          onChange={(e) => update("contactName", e.target.value)}
        />
      </Field>

      <Field
        label={{ id: "No. WhatsApp", en: "WhatsApp Number" }}
        required
        error={errors.whatsapp}
        errorText={{ id: "Nomor WhatsApp wajib diisi", en: "WhatsApp number is required" }}
      >
        <Input
          type="tel"
          value={form.whatsapp}
          onChange={(e) => update("whatsapp", e.target.value)}
          placeholder="0812xxxxxxx"
        />
      </Field>

      <Field
        label={{ id: "Email (opsional)", en: "Email (optional)" }}
        error={errors.email}
        errorText={{ id: "Format email tidak valid", en: "Invalid email format" }}
      >
        <Input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </Field>

      <Field label={{ id: "Website (opsional)", en: "Website (optional)" }}>
        <Input value={form.website} onChange={(e) => update("website", e.target.value)} />
      </Field>

      <Field label={{ id: "Pesan / Informasi Tambahan", en: "Message / Additional Info" }}>
        <Textarea
          rows={3}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </Field>

      <Button type="submit" className="mt-2 bg-coral hover:bg-coral/90">
        <span lang="id">Kirim via WhatsApp</span>
        <span lang="en">Send via WhatsApp</span>
      </Button>
      <p className="text-center text-xs text-foreground/45">
        <span lang="id">Data Anda akan dikirim langsung ke sekretariat IDCA via WhatsApp</span>
        <span lang="en">Your data will be sent directly to the IDCA secretariat via WhatsApp</span>
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  errorText,
  children,
}: {
  label: { id: string; en: string };
  required?: boolean;
  error?: string;
  errorText?: { id: string; en: string };
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-heading">
        <span lang="id">{label.id}</span>
        <span lang="en">{label.en}</span>
        {required && <span className="text-coral"> *</span>}
      </Label>
      {children}
      {error && errorText && (
        <p className="text-xs font-medium text-coral">
          <span lang="id">{errorText.id}</span>
          <span lang="en">{errorText.en}</span>
        </p>
      )}
    </div>
  );
}
