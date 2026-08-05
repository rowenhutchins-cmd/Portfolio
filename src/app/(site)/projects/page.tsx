import Contact from "@/components/Contact";
import ProjectCard from "@/components/Projects/ProjectCard";
import { projectsData } from "@/components/Projects/projectsData";
import { Github } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Rowen Hutchins",
  description:
    "Coding projects by Rowen Hutchins, full-stack developer working in React, JavaScript, and MySQL.",
};

const ProjectsPage = () => {
  return (
    <>
      <section className="bg-ink pb-16 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
            Projects
          </span>
          <h1 className="mt-4 max-w-2xl text-heading-2 font-extrabold text-white">
            Things I have built.
          </h1>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-white/70">
            Original coding projects, deployed and viewable here as they
            ship. Source for everything lives on GitHub.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 bg-ink pb-24 pt-12 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {projectsData.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projectsData.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-16">
              <h2 className="text-xl font-bold text-white">
                Projects are on their way.
              </h2>
              <p className="max-w-[52ch] text-sm leading-relaxed text-white/60">
                This page is wired up and ready. In the meantime, the code
                for what I am working on is public on GitHub.
              </p>
              <a
                href="https://github.com/rowenhutchins-cmd"
                target="_blank"
                rel="noopener noreferrer"
                className="motion-safe:hover:-translate-y-0.5 mt-1 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-ink transition-transform duration-200"
              >
                <Github size={16} />
                View GitHub
              </a>
            </div>
          )}
        </div>
      </section>

      <Contact />
    </>
  );
};

export default ProjectsPage;
