import { Footer } from "@/ui/footer";
import { Navbar } from "@/ui/navbar";
import { ThemeToggle } from "@/ui/theme-toggle";

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ height: "200vh" }}>
        <ThemeToggle />
        <h1>Main page</h1>
        <Footer />
      </main>
    </>
  );
}
