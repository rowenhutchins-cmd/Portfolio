import { Download, Eye } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume | Rowen Hutchins",
  description:
    "Resume for Rowen Hutchins, full-stack developer with a U.S. Army background and an active Secret security clearance.",
};

const technicalSkills = [
  { label: "Front-End", value: "HTML/CSS, JavaScript, React" },
  { label: "Back-End", value: "Node.js, Express (in progress)" },
  { label: "Databases", value: "MySQL" },
  { label: "Tools", value: "Git, GitHub" },
  {
    label: "Other",
    value:
      "Hardware and network troubleshooting, systems diagnostics, inventory and logistics tracking software",
  },
];

const experience = [
  {
    role: "Ammunition Specialist",
    org: "U.S. Army",
    period: "2021 to Present",
    bullets: [
      "Managed inventory, tracking, and logistics for munitions and equipment across domestic and overseas assignments, including a 9-month deployment in Germany.",
      "Enforced strict safety and compliance standards for the handling and storage of hazardous materials, maintaining a zero-incident record.",
      "Trained and supervised fellow soldiers on operating procedures, safety protocols, and equipment handling.",
      "Used digital tracking systems to maintain accurate, audit-ready inventory records, experience directly applicable to working with structured data and systems logic in software development.",
      "Served as a Non-Commissioned Officer, leading, teaching, and holding direct responsibility for a team of soldiers.",
    ],
  },
  {
    role: "ATM Technician",
    org: "Peachtree ATMs",
    period: "2019 to 2021",
    bullets: [
      "Diagnosed and resolved hardware, software, and network issues on ATM units, including performing software resets and installing system updates.",
      "Took over an additional service route on short notice, doubling coverage while family managed a health issue, without missing a service call.",
      "Maintained a consistent response time of under 24 hours across all service requests.",
      "Communicated directly with customers and vendors to explain issues, coordinate repairs, and ensure satisfaction.",
      "Applied systematic troubleshooting to electronics and networking problems, a foundational skill set now being extended into debugging and problem-solving in code.",
    ],
  },
];

const ResumePage = () => {
  return (
    <section className="bg-ink pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
              Active Secret Security Clearance
            </span>
            <h1 className="mt-3 text-heading-2 font-extrabold text-white">
              Rowen Hutchins
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Lakeland, FL &middot; 404-578-7769 &middot;{" "}
              <a
                href="mailto:rowen.hutchins@gmail.com"
                className="hover:text-accent"
              >
                rowen.hutchins@gmail.com
              </a>
            </p>
            <p className="mt-1 text-sm text-white/60">
              rowenhutchins.com &middot; github.com/rowenhutchins-cmd
            </p>
          </div>

          <div className="flex w-fit flex-wrap gap-3">
            <Link
              href="/resume/Rowen_Hutchins_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="motion-safe:hover:-translate-y-0.5 inline-flex items-center gap-2 rounded-full border border-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-accent transition-transform duration-200 hover:bg-accent/10"
            >
              <Eye size={16} />
              Preview
            </Link>
            <Link
              href="/resume/Rowen_Hutchins_Resume.pdf"
              className="motion-safe:hover:-translate-y-0.5 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-ink transition-transform duration-200"
              download
            >
              <Download size={16} />
              Download
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-14 pt-12">
          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.08em] text-accent">
              Objective
            </h2>
            <p className="max-w-[70ch] text-base leading-relaxed text-white/70">
              Full-stack developer combining hands-on experience in React,
              JavaScript, and MySQL with proven leadership, technical
              troubleshooting, and logistics experience from the U.S. Army.
              Seeking an entry-level full-stack or front-end developer role.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.08em] text-accent">
              Technical Skills
            </h2>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {technicalSkills.map((skill) => (
                <div key={skill.label}>
                  <dt className="text-sm font-bold text-white">
                    {skill.label}
                  </dt>
                  <dd className="mt-1 text-sm text-white/70">
                    {skill.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-bold uppercase tracking-[0.08em] text-accent">
              Experience
            </h2>
            <div className="flex flex-col gap-10">
              {experience.map((job) => (
                <div key={job.role}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-bold text-white">
                      {job.role}, {job.org}
                    </h3>
                    <span className="text-xs uppercase tracking-[0.08em] text-ink-muted">
                      {job.period}
                    </span>
                  </div>
                  <ul className="mt-3 flex flex-col gap-2">
                    {job.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="border-l border-white/10 pl-4 text-sm leading-relaxed text-white/70"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.08em] text-accent">
              Projects
            </h2>
            <p className="max-w-[70ch] text-sm leading-relaxed text-white/70">
              Several original coding projects are deployed and viewable at{" "}
              <a
                href="https://rowenhutchins.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-dark"
              >
                rowenhutchins.com
              </a>
              , with source code available at{" "}
              <a
                href="https://github.com/rowenhutchins-cmd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-dark"
              >
                github.com/rowenhutchins-cmd
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.08em] text-accent">
              Education
            </h2>
            <h3 className="text-base font-bold text-white">
              Associate of Science in Aeronautical Science (In Progress)
            </h3>
            <p className="mt-1 text-sm text-white/60">
              Embry-Riddle Aeronautical University &middot; Expected
              Graduation 2027
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumePage;
