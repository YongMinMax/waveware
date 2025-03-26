import HeroSection from "../kwon/pages/main/HeroSection";
import Career from "../kwon/pages/main/career";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
        <HeroSection/>
        <Career/>
    </main>
  );
}
