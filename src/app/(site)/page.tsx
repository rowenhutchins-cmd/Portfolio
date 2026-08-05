import Contact from "@/components/Contact";
import Hero from "@/components/Home/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rowen Hutchins | Full-Stack Developer",
  description:
    "Portfolio of Rowen Hutchins, a full-stack developer and U.S. Army veteran with an active Secret clearance, working in React, JavaScript, and MySQL.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Contact />
    </>
  );
}
