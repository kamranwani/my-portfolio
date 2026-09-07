export interface SocialLink {
  label: string;
  url: string;
  icon: "github" | "linkedin" | "twitter" | string;
}

export interface Personal {
  name: string;
  role: string;
  tagline: string;
  summary: string;
  location: string;
  email: string;
  resumeUrl: string;
  availability: string;
  social: SocialLink[];
}

export interface Stat {
  label: string;
  value: string;
}

export interface About {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  stats: Stat[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Exploring {
  label: string;
  technology: string;
  description: string;
}

export interface Skills {
  eyebrow: string;
  heading: string;
  groups: SkillGroup[];
}

export interface Certification {
  name: string;
  issuer: string;
  issued: string;
  credentialId?: string;
}

export interface Certifications {
  eyebrow: string;
  heading: string;
  items: Certification[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface Experience {
  eyebrow: string;
  heading: string;
  items: ExperienceItem[];
}

export interface ProjectDetails {
  backend?: string[];
  frontend?: string[];
  integrations?: string[];
  engineering?: string[];
  focus?: string[];
  animation?: string[];
  deployment?: string[];
  scale?: string[];
  notes?: string;
}

export interface Project {
  title: string;
  problem: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  confidential?: boolean;
  status: "Live" | "In Progress" | string;
  details?: ProjectDetails;
}

export interface Projects {
  eyebrow: string;
  heading: string;
  items: Project[];
}

export interface Contact {
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
}

export interface Footer {
  note: string;
}

export interface PortfolioData {
  personal: Personal;
  about: About;
  skills: Skills;
  exploring: Exploring;
  experience: Experience;
  certifications: Certifications;
  projects: Projects;
  contact: Contact;
  footer: Footer;
}
