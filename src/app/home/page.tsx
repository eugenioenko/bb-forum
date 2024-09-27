import { Home } from "@/components/home";
import { queryHomePage } from "@/queries/server/home.prisma";

export default async function HomePage() {
  const sections = await queryHomePage();
  return <Home sections={sections} />;
}
