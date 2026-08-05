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
      "Trained and supervised fellow soldiers on standard operating procedures and equipment handling as a Non-Commissioned Officer, taking direct responsibility for their readiness and performance.",
      "Enforced strict safety and compliance standards for handling and storing hazardous materials, maintaining a zero-incident record through discipline and attention to detail under pressure.",
      "Used digital inventory and tracking systems to maintain accurate, audit-ready records across domestic and overseas assignments, including a 9-month deployment in Germany.",
    ],
  },
  {
    role: "ATM Technician",
    org: "Peachtree ATMs",
    period: "2019 to 2021",
    bullets: [
      "Diagnosed and resolved hardware, software, and network issues on ATM units, including performing software resets, installing system updates, and troubleshooting connectivity failures.",
      "Applied systematic, root-cause troubleshooting to electronics and networking problems, the same debugging mindset now applied to writing and fixing code.",
      "Maintained a consistent under-24-hour response time across an expanded coverage route.",
    ],
  },
];

const projects = [
  {
    name: "Furniture Website",
    stack: "HTML/CSS",
    href: "/projects/furniture-website/index.html",
  },
  {
    name: "Vintage Barbershop",
    stack: "JavaScript",
    href: "/projects/vintage-barbershop/index.html",
  },
  {
    name: "The Beans Place",
    stack: "React",
    href: "/projects/the-beans-place/index.html",
  },
];

const ResumePage = () => {
  return (
    <section className="bg-ink pb-24 pt-32 lg:pt-40">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center rounded-full border border-accent px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-accent">
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
              Seeking an entry-level full-stack or front-end developer role
              where I can apply hands-on experience in React, JavaScript,
              and MySQL alongside the leadership, troubleshooting, and
              technical discipline built during my time in the U.S. Army
              and as an ATM technician.
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
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.08em] text-accent">
              Projects
            </h2>
            <p className="max-w-[70ch] text-sm leading-relaxed text-white/70">
              Three independent coding projects, built during the ERA
              Solutions program and deployed live from this site:{" "}
              {projects.map((project, index) => (
                <span key={project.name}>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-dark"
                  >
                    {project.name}
                  </a>{" "}
                  ({project.stack})
                  {index < projects.length - 1 ? ", " : "."}
                </span>
              ))}{" "}
              Source code for each is available at{" "}
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
