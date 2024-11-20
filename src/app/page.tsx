import { Navbar } from "@/ui/navbar";
import { ThemeToggle } from "@/ui/theme-toggle";

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ height: "200vh" }}>
        <ThemeToggle />
      </main>
    </>
  );
}
