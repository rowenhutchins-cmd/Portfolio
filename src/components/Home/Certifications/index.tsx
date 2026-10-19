import { Cpu, Flame, Network, ShieldCheck, Terminal } from "lucide-react";

const CERTIFICATIONS = [
  {
    icon: Cpu,
    name: "CompTIA A+",
  },
  {
    icon: Network,
    name: "CompTIA Network+",
  },
  {
    icon: ShieldCheck,
    name: "CompTIA Security+",
  },
  {
    icon: Flame,
    name: "Firewall Configuration",
  },
  {
    icon: Terminal,
    name: "Linux Fundamentals",
  },
];

const Certifications = () => {
  return (
    <section className="border-t border-white/10 bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
            Cybersecurity
          </span>
          <h2 className="max-w-2xl text-heading-3 font-extrabold text-white">
            Certified in security fundamentals.
          </h2>
          <p className="max-w-[60ch] text-sm leading-relaxed text-white/60">
            Completed coursework covering hardware, networking, system
            security, firewall configuration, and Linux administration.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5">
          {CERTIFICATIONS.map(({ icon: Icon, name }) => (
            <div
              key={name}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Icon size={18} />
              </span>
              <h3 className="text-sm font-bold text-white">{name}</h3>
              <span className="inline-flex w-fit items-center rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-accent">
                Completed
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
