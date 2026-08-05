"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const Contact = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Something went wrong. Try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  return (
    <section id="contact" className="bg-ink border-t border-white/10 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-10">
        <div className="flex flex-col gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
            Get In Touch
          </span>
          <h2 className="text-heading-3 font-extrabold text-white">
            Have a project in mind?
          </h2>
          <p className="max-w-[42ch] text-sm leading-relaxed text-white/60">
            Send a few details below and it lands directly in my inbox. I
            usually reply within a day or two.
          </p>
          <a
            href="mailto:rowen.hutchins@gmail.com"
            className="mt-2 text-sm font-medium text-accent hover:text-accent-dark"
          >
            rowen.hutchins@gmail.com
          </a>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-medium text-white/70">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-medium text-white/70">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-xs font-medium text-white/70">
              Project details
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="What are you looking to build?"
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-400">{errorMessage}</p>
          )}

          {status === "success" && (
            <p className="text-sm text-accent">
              Message sent. I will get back to you soon.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="motion-safe:hover:-translate-y-0.5 mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-ink transition-transform duration-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
