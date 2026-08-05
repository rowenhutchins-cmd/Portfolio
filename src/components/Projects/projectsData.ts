export type Project = {
  title: string;
  description: string;
  stack: string[];
  href?: string;
  repo?: string;
  image?: string;
};

// Add real projects here as they ship. Example shape:
//
// {
//   title: "Project Name",
//   description: "One or two sentences on what it does and why it exists.",
//   stack: ["React", "Node.js", "MySQL"],
//   href: "https://your-live-demo.com",
//   repo: "https://github.com/rowenhutchins-cmd/project-repo",
//   image: "/images/projects/project-name.png",
// },
export const projectsData: Project[] = [];
