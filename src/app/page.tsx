import { Home } from "@/components/home";
import { ServerError } from "@/components/server-error";
import { queryHomePage } from "@/queries/server/home.prisma";

export default async function RootPage() {
  try {
    const sections = await queryHomePage();
    return <Home sections={sections} />;
  } catch (e) {
    return <ServerError error={e} />;
  }
}
