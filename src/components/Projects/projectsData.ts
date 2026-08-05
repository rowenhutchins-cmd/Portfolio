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
export const projectsData: Project[] = [
  {
    title: "Furniture Website",
    description:
      "A furniture and landscaping showcase site with a video hero, animated service cards, and a customer intake form.",
    stack: ["HTML", "CSS"],
    href: "/projects/furniture-website/index.html",
  },
  {
    title: "Vintage Barbershop",
    description:
      "A barbershop site with a full appointment booking flow: an interactive calendar, time-slot picker, and service detail modals.",
    stack: ["JavaScript"],
    href: "/projects/vintage-barbershop/index.html",
  },
  {
    title: "The Beans Place",
    description:
      "A coffee e-commerce site with a product showcase, subscription plans, and a multi-section marketing layout.",
    stack: ["React"],
    href: "/projects/the-beans-place/index.html",
  },
];
