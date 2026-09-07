import Container from "@/app/shared/ui/Container";
import SectionHeading from "@/app/shared/ui/SectionHeading";
import Reveal from "@/app/shared/ui/Reveal";
import SectionAtmosphere from "@/app/shared/ui/SectionAtmosphere";
import { getPortfolioData } from "@/lib/portfolio";
import ExperienceItemCard from "./components/ExperienceItemCard";
import TimelineRail from "./components/TimelineRail";

const Experience = () => {
  const { experience } = getPortfolioData();

  return (
    <section id="experience" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <SectionAtmosphere variant="a" />
      <Container addClass="relative flex flex-col gap-16">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow={experience.eyebrow}
            heading={experience.heading}
          />
        </Reveal>

        <TimelineRail>
          <Reveal className="flex flex-col" stagger variant="left">
            {experience.items.map((item) => (
              <ExperienceItemCard key={item.company} item={item} />
            ))}
          </Reveal>
        </TimelineRail>
      </Container>
    </section>
  );
};

export default Experience;
