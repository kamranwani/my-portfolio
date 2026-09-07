import portfolioJson from "@/app/data/portfolio.json";
import { PortfolioData } from "@/app/shared/types/Portfolio";

/**
 * Single source of truth for all portfolio content.
 * Edit app/data/portfolio.json to change what renders on the site —
 * no component code needs to change.
 */
export function getPortfolioData(): PortfolioData {
  return portfolioJson as PortfolioData;
}
