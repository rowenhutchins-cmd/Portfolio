import { Briefcase, Code2, Palette, Wrench } from "lucide-react";

const FEATURES = [
  {
    icon: Palette,
    title: "Custom Design",
    description:
      "Tailored layouts and UI built around your brand, not a recycled template.",
  },
  {
    icon: Code2,
    title: "Full-Stack Build",
    description:
      "React, JavaScript, and MySQL, shipped front-to-back and ready for production.",
  },
  {
    icon: Wrench,
    title: "Ongoing Support",
    description:
      "Updates, fixes, and iteration after launch, so the site keeps working for you.",
  },
];

const Offering = () => {
  return (
    <section className="bg-ink-2 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
            What I Do
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
            <Briefcase size={13} />
            Available for Hire
          </span>

          <h2 className="max-w-3xl text-heading-3 font-extrabold text-white">
            I design and build websites.
          </h2>

          <p className="max-w-[60ch] text-sm leading-relaxed text-white/60">
            Open to freelance projects and full-time roles, from a first
            design concept to a fully shipped, production-ready site.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-ink-3 p-6"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Icon size={18} />
              </span>
              <h3 className="text-base font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-white/60">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offering;
