import HeroSection from "../kwon/main/HeroSection";
import Career from "../kwon/main/career";
import MenuHeader from "../kwon/components/menuheader";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
        <MenuHeader title={"Company"} description={"데이터의 힘을 통해 미래를 예측하고/혁신을 이끄는 기술을 연구합니다."}/>
    </main>
  );
}
