import Container from "@/app/shared/ui/Container";
import Reveal from "@/app/shared/ui/Reveal";
import { getPortfolioData } from "@/lib/portfolio";
import StatusCard from "./components/StatusCard";

const Exploring = () => {
  const { exploring } = getPortfolioData();

  return (
    <section className="py-4">
      <Container>
        <Reveal variant="scale">
          <StatusCard data={exploring} />
        </Reveal>
      </Container>
    </section>
  );
};

export default Exploring;
