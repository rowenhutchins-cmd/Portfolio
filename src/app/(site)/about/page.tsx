import Contact from "@/components/Contact";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Rowen Hutchins",
  description:
    "Full-stack developer and U.S. Army veteran transitioning from military logistics and electronics troubleshooting into software.",
};

const experience = [
  {
    role: "Ammunition Specialist",
    org: "U.S. Army",
    period: "2021 to Present",
    bullets: [
      "Managed inventory, tracking, and logistics for munitions and equipment across domestic and overseas assignments, including a 9-month deployment in Germany.",
      "Enforced strict safety and compliance standards for handling and storing hazardous materials, maintaining a zero-incident record.",
      "Trained and supervised fellow soldiers on operating procedures, safety protocols, and equipment handling.",
      "Used digital tracking systems to maintain accurate, audit-ready inventory records, experience directly applicable to structured data and systems logic in software development.",
      "Served as a Non-Commissioned Officer, leading, teaching, and holding direct responsibility for a team of soldiers.",
    ],
  },
  {
    role: "ATM Technician",
    org: "Peachtree ATMs",
    period: "2019 to 2021",
    bullets: [
      "Diagnosed and resolved hardware, software, and network issues on ATM units, including performing software resets and installing system updates.",
      "Took over an additional service route on short notice, doubling coverage without missing a service call.",
      "Maintained a consistent response time under 24 hours across all service requests.",
      "Communicated directly with customers and vendors to explain issues, coordinate repairs, and ensure satisfaction.",
      "Applied systematic troubleshooting to electronics and networking problems, a foundation now extended into debugging and problem-solving in code.",
    ],
  },
];

const skills = [
  { group: "Front-End", items: ["HTML", "CSS", "JavaScript", "React"] },
  { group: "Back-End", items: ["Node.js", "Express (in progress)"] },
  { group: "Databases", items: ["MySQL"] },
  { group: "Tools", items: ["Git", "GitHub"] },
  {
    group: "Other",
    items: [
      "Hardware and network troubleshooting",
      "Systems diagnostics",
      "Inventory and logistics tracking software",
    ],
  },
];

const AboutPage = () => {
  return (
    <>
      <section className="bg-ink pb-20 pt-32 lg:pb-28 lg:pt-40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/10 lg:mx-0">
            <Image
              src="/images/rowen/headshot.png"
              alt="Portrait of Rowen Hutchins"
              fill
              priority
              sizes="(min-width: 1024px) 320px, 60vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
              About
            </span>
            <h1 className="text-heading-2 font-extrabold text-white">
              From ammunition logistics to application logic.
            </h1>
            <p className="max-w-[62ch] text-base leading-relaxed text-white/70">
              I am a full-stack developer combining hands-on experience in
              React, JavaScript, and MySQL with the leadership, technical
              troubleshooting, and logistics discipline I built during my
              time in the U.S. Army. I hold an active Secret clearance and
              I am looking for an entry-level full-stack or front-end
              developer role where that combination is an asset.
            </p>
            <p className="max-w-[62ch] text-base leading-relaxed text-white/70">
              Before the Army, I spent two years as an ATM technician,
              diagnosing hardware, software, and network failures in the
              field under tight response windows. That same systematic
              troubleshooting is what pulled me toward debugging and
              building software in the first place.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-ink py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="mb-10 text-heading-3 font-extrabold text-white lg:mb-14">
            Experience
          </h2>

          <div className="flex flex-col gap-14">
            {experience.map((job) => (
              <div
                key={job.role}
                className="grid grid-cols-1 gap-4 lg:grid-cols-[0.7fr_1.3fr] lg:gap-10"
              >
                <div>
                  <h3 className="text-lg font-bold text-white">{job.role}</h3>
                  <p className="text-sm text-white/60">{job.org}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.08em] text-ink-muted">
                    {job.period}
                  </p>
                </div>
                <ul className="flex flex-col gap-3">
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
      </section>

      <section className="border-t border-white/10 bg-ink py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="mb-10 text-heading-3 font-extrabold text-white lg:mb-14">
            Skills
          </h2>

          <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div key={skill.group}>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.08em] text-accent">
                  {skill.group}
                </h3>
                <ul className="flex flex-col gap-2">
                  {skill.items.map((item) => (
                    <li key={item} className="text-sm text-white/70">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-ink py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="mb-6 text-heading-3 font-extrabold text-white">
            Education
          </h2>
          <div className="border-l border-white/10 pl-4">
            <h3 className="text-lg font-bold text-white">
              Associate of Science in Aeronautical Science
            </h3>
            <p className="text-sm text-white/60">
              Embry-Riddle Aeronautical University
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.08em] text-ink-muted">
              Expected graduation 2027
            </p>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
};

export default AboutPage;
