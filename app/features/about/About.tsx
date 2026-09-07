import Container from "@/app/shared/ui/Container";
import SectionHeading from "@/app/shared/ui/SectionHeading";
import Reveal from "@/app/shared/ui/Reveal";
import SectionAtmosphere from "@/app/shared/ui/SectionAtmosphere";
import { getPortfolioData } from "@/lib/portfolio";
import AboutStats from "./components/AboutStats";

const About = () => {
  const { about, certifications } = getPortfolioData();

  const stats = [
    ...about.stats,
    {
      label: "Certifications",
      value: `${certifications.items.length}+`,
    },
    { label: "Cups of coffee", value: "∞" },
  ];

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <SectionAtmosphere variant="a" />
      <Container addClass="relative flex flex-col gap-16">
        <Reveal>
          <SectionHeading index="02" eyebrow={about.eyebrow} heading={about.heading} />
        </Reveal>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-5">
          <Reveal className="flex flex-col gap-6 lg:col-span-3" stagger variant="left">
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg leading-8 text-foreground-muted"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal className="lg:col-span-2">
            <AboutStats stats={stats} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default About;
