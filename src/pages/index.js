import HeroSection from "../kwon/main/HeroSection";
import Career from "../kwon/main/career";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
        <HeroSection/>
        <Career/>
    </main>
  );
}
