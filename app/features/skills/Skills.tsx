import Container from "@/app/shared/ui/Container";
import SectionHeading from "@/app/shared/ui/SectionHeading";
import Reveal from "@/app/shared/ui/Reveal";
import SectionAtmosphere from "@/app/shared/ui/SectionAtmosphere";
import { getPortfolioData } from "@/lib/portfolio";
import SkillGroupCard from "./components/SkillGroupCard";

const Skills = () => {
  const { skills } = getPortfolioData();

  return (
    <section id="skills" className="relative scroll-mt-24 overflow-hidden bg-surface/50 py-24 sm:py-32">
      <SectionAtmosphere variant="b" />
      <Container addClass="relative flex flex-col gap-16">
        <Reveal>
          <SectionHeading index="03" eyebrow={skills.eyebrow} heading={skills.heading} />
        </Reveal>

        <Reveal className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger variant="scale">
          {skills.groups.map((group) => (
            <SkillGroupCard key={group.category} group={group} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
};

export default Skills;
