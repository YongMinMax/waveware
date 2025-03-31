import HeroSection from "../kwon/main/HeroSection";
import Career from "../kwon/main/career";
import CompanyLongScrollPage from "../potato/components/companyLongScrollPage";
import SkillPage from "../potato/components/skillPage";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <HeroSection />
      <CompanyLongScrollPage />
      <SkillPage />
      <Career />
    </main>
  );
}
