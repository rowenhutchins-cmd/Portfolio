import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Rowen Hutchins",
  description:
    "Get in touch with Rowen Hutchins, a full-stack developer and U.S. Army veteran with an active Secret clearance, working in React, JavaScript, and MySQL.",
};

const ContactPage = () => {
  return <Contact variant="page" />;
};

export default ContactPage;
