"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type FormValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const projectTypes = [
  "Website pentru firmă",
  "Landing page",
  "Magazin online",
  "Platformă web custom",
  "Redesign website",
  "SEO și performanță",
  "AI și automatizări",
  "Integrări și funcționalități",
  "Nu știu încă",
];

const initialValues: FormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="mt-2 text-xs text-red-300">{message}</p>;
}

export function ContactProjectForm() {
  const [form, setForm] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  function updateField<K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  }

  function validateForm() {
    const nextErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = form.phone.replace(/\D/g, "");

    if (form.name.trim().length < 2) {
      nextErrors.name = "Introdu numele complet.";
    }

    if (form.company.trim().length < 2) {
      nextErrors.company = "Introdu numele firmei.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Introdu adresa de email.";
    } else if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = "Introdu o adresă de email validă.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Introdu numărul de telefon.";
    } else if (phoneDigits.length < 9 || phoneDigits.length > 15) {
      nextErrors.phone = "Introdu un număr de telefon valid.";
    }

    if (!form.projectType) {
      nextErrors.projectType = "Selectează tipul proiectului.";
    }

    if (form.message.trim().length < 20) {
      nextErrors.message =
        "Descrie proiectul în cel puțin 20 de caractere.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Aici conectezi ulterior ruta/API-ul care trimite formularul.
    console.log("Cerere ofertă:", {
      ...form,
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
    });
  }

  const inputClass = (hasError: boolean) =>
    [
      "contact-input mt-2 w-full appearance-none rounded-2xl border bg-[#20242A] px-4 py-3 text-sm text-white outline-none ring-0 transition duration-300 placeholder:text-gray-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
      hasError
        ? "border-red-400/60 focus:border-amber-400/50"
        : "border-white/10 focus:border-amber-400/50",
    ].join(" ");

  return (
    <>
      <form noValidate onSubmit={handleSubmit} className="mt-10 space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-300">
            Nume
          </label>

          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            aria-invalid={Boolean(errors.name)}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Numele tău"
            className={inputClass(Boolean(errors.name))}
          />

          <FieldError message={errors.name} />
        </div>

        <div>
          <label
            htmlFor="company"
            className="text-sm font-medium text-gray-300"
          >
            Firmă
          </label>

          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            aria-invalid={Boolean(errors.company)}
            onChange={(event) => updateField("company", event.target.value)}
            placeholder="Numele firmei"
            className={inputClass(Boolean(errors.company))}
          />

          <FieldError message={errors.company} />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-300">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            aria-invalid={Boolean(errors.email)}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="contact@firma.ro"
            className={inputClass(Boolean(errors.email))}
          />

          <FieldError message={errors.email} />
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-medium text-gray-300">
            Telefon
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            aria-invalid={Boolean(errors.phone)}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="+40..."
            className={inputClass(Boolean(errors.phone))}
          />

          <FieldError message={errors.phone} />
        </div>
      </div>

      <div ref={dropdownRef} className="relative">
        <span className="text-sm font-medium text-gray-300">Tip proiect</span>

        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
          aria-invalid={Boolean(errors.projectType)}
          onClick={() => setDropdownOpen((current) => !current)}
          className={[
            "mt-2 flex w-full items-center justify-between rounded-2xl border bg-[#20242A] px-4 py-3 text-left text-sm outline-none ring-0 transition duration-300 focus:outline-none focus:ring-0",
            errors.projectType
              ? "border-red-400/60"
              : dropdownOpen
                ? "border-amber-400/50"
                : "border-white/10 hover:border-white/20",
            form.projectType ? "text-white" : "text-gray-400",
          ].join(" ")}
        >
          <span>{form.projectType || "Selectează tipul proiectului"}</span>

          <ChevronDown
            className={[
              "h-4 w-4 shrink-0 text-gray-400 transition duration-300",
              dropdownOpen ? "rotate-180 text-amber-300" : "",
            ].join(" ")}
          />
        </button>

        {dropdownOpen && (
          <div
            role="listbox"
            className="project-dropdown-scrollbar absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-white/10 bg-[#11161D] p-2 shadow-2xl shadow-black/50"
          >
            {projectTypes.map((type) => {
              const selected = form.projectType === type;

              return (
                <button
                  key={type}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    updateField("projectType", type);
                    setDropdownOpen(false);
                  }}
                  className={[
                    "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition duration-300",
                    selected
                      ? "bg-amber-400 text-black"
                      : "text-gray-300 hover:bg-white/[0.06] hover:text-white",
                  ].join(" ")}
                >
                  <span>{type}</span>
                  {selected && <Check className="h-4 w-4" />}
                </button>
              );
            })}
          </div>
        )}

        <FieldError message={errors.projectType} />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-gray-300">
          Mesaj
        </label>

        <textarea
          id="message"
          name="message"
          value={form.message}
          aria-invalid={Boolean(errors.message)}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Spune-ne ce vrei să construim, ce servicii oferi și ce obiectiv ai."
          className={[
            inputClass(Boolean(errors.message)),
            "h-[140px] resize-none leading-6",
          ].join(" ")}
        />

        <FieldError message={errors.message} />
      </div>

      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-amber-400 px-7 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300 md:w-auto"
      >
        Trimite cererea
      </button>
      </form>

      <style jsx global>{`

        .contact-input:-webkit-autofill,
        .contact-input:-webkit-autofill:hover,
        .contact-input:-webkit-autofill:active {
          -webkit-text-fill-color: #ffffff !important;
          caret-color: #ffffff;
          border-color: rgba(255, 255, 255, 0.1) !important;
          -webkit-box-shadow: 0 0 0 1000px #20242a inset !important;
          box-shadow: 0 0 0 1000px #20242a inset !important;
          transition:
            border-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1),
            background-color 9999s ease-out 0s;
        }

        .contact-input:focus,
        .contact-input:focus-visible,
        .contact-input:-webkit-autofill:focus {
          border-color: rgba(251, 191, 36, 0.5) !important;
          outline: none !important;
          box-shadow: none !important;
          transition:
            border-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
            background-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .contact-input:-webkit-autofill:focus {
          -webkit-text-fill-color: #ffffff !important;
          caret-color: #ffffff;
          -webkit-box-shadow: 0 0 0 1000px #20242a inset !important;
          box-shadow: 0 0 0 1000px #20242a inset !important;
          transition:
            border-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
            background-color 9999s ease-out 0s,
            box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .contact-input {
          color-scheme: dark;
          transition-property: border-color, background-color, box-shadow;
          transition-duration: 300ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-dropdown-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(251, 191, 36, 0.65) transparent;
        }

        .project-dropdown-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .project-dropdown-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          margin-block: 10px;
        }

        .project-dropdown-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(251, 191, 36, 0.45);
          border: 2px solid transparent;
          border-radius: 999px;
          background-clip: padding-box;
        }

        .project-dropdown-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(251, 191, 36, 0.75);
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        .project-dropdown-scrollbar::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>
    </>
  );
}