import Container from "@/app/shared/ui/Container";
import SectionHeading from "@/app/shared/ui/SectionHeading";
import Reveal from "@/app/shared/ui/Reveal";
import SectionAtmosphere from "@/app/shared/ui/SectionAtmosphere";
import { getPortfolioData } from "@/lib/portfolio";
import ProjectCard from "./components/ProjectCard";

const Projects = () => {
  const { projects } = getPortfolioData();

  return (
    <section id="projects" className="relative scroll-mt-24 overflow-hidden bg-surface/50 py-24 sm:py-32">
      <SectionAtmosphere variant="b" />
      <Container addClass="relative flex flex-col gap-16">
        <Reveal>
          <SectionHeading index="05" eyebrow={projects.eyebrow} heading={projects.heading} />
        </Reveal>

        <Reveal className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger>
          {projects.items.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
};

export default Projects;
