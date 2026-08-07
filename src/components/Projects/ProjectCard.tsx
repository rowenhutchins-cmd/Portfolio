import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import type { Project } from "./projectsData";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      {project.image ? (
        <div className="relative aspect-video w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        project.href && (
          <div className="relative aspect-video w-full overflow-hidden bg-white/[0.02]">
            <iframe
              src={project.href}
              title={`${project.title} preview`}
              tabIndex={-1}
              aria-hidden="true"
              loading="lazy"
              sandbox="allow-same-origin allow-scripts"
              className="pointer-events-none absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-[0.25] border-0"
            />
          </div>
        )
      )}

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            {project.description}
          </p>
        </div>

        <ul className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-5 pt-2">
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-dark"
            >
              Live site
              <ArrowUpRight size={14} />
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white"
            >
              <Github size={14} />
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
