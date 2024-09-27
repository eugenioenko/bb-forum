import { Home } from "@/components/home";

export default async function RootPage() {
  const response = await fetch("http://localhost:4200/api/home");
  const sections = await response.json();

  return <Home sections={sections.data}></Home>;
}
