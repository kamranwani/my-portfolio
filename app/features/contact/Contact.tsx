import Container from "@/app/shared/ui/Container";
import SectionHeading from "@/app/shared/ui/SectionHeading";
import Reveal from "@/app/shared/ui/Reveal";
import SectionAtmosphere from "@/app/shared/ui/SectionAtmosphere";
import { getPortfolioData } from "@/lib/portfolio";
import ContactCard from "./components/ContactCard";

const Contact = () => {
  const { contact } = getPortfolioData();

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <SectionAtmosphere variant="a" />
      <Container addClass="relative flex flex-col items-center gap-16">
        <Reveal className="flex flex-col items-center">
          <SectionHeading
            index="06"
            eyebrow={contact.eyebrow}
            heading={contact.heading}
            description={contact.description}
            align="center"
          />
        </Reveal>

        <Reveal variant="scale">
          <ContactCard />
        </Reveal>
      </Container>
    </section>
  );
};

export default Contact;
