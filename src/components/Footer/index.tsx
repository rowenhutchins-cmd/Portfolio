import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import menuData from "../Header/menuData";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="w-fit text-sm font-extrabold uppercase tracking-[0.2em] text-white"
          >
            Rowen Hutchins
          </Link>
          <p className="flex items-center gap-2 text-sm text-ink-muted">
            <Image
              src="/favicon.svg"
              alt="Rowen Hutchins logo"
              width={16}
              height={16}
              className="h-4 w-4 rounded-[4px]"
            />
            &copy; {year} Rowen Hutchins. Built with Next.js and Tailwind CSS.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {menuData.map((item) => (
            <Link
              key={item.id}
              href={item.path ?? "/"}
              className="text-sm text-white/70 transition-colors duration-200 hover:text-accent"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href="https://github.com/rowenhutchins-cmd"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white/70 transition-colors duration-200 hover:text-accent"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/rowen-hutchins-546320428"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white/70 transition-colors duration-200 hover:text-accent"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:rowen.hutchins@gmail.com"
            aria-label="Email"
            className="text-white/70 transition-colors duration-200 hover:text-accent"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
