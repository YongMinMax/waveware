import HeroSection from "../kwon/main/HeroSection";
import Career from "../kwon/main/career";
import MenuHeader from "../kwon/components/menuheader";

export default function Company() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">

        <MenuHeader title={"Company"} description={"데이터의 힘을 통해 미래를 예측하고/혁신을 이끄는 기술을 연구합니다."}/>
        
        <span className="w-full px-12 pt-32 pb-4 text-5xl font-semibold text-left">Who We Are</span>
        <section className="relative w-full h-[350px] bg-cover bg-center" style={{ backgroundImage: "url('/img/beach.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-65"></div>
            <div className="relative container mx-auto w-[1400px] h-full flex flex-col justify-between text-white py-12">
                <h2 className="text-[40px] font-regular text-left w-full">웨이브웨어는 물결입니다.</h2>
                <p className="text-xl font-light w-full text-right">
                    작은 파도가 일어나 바다로 퍼지고, 바다는 또 다른 파도를 만들어냅니다.<br/>
                    그렇게 끊임없이 이러질 때 파도는 비로소 거대한 물결이 됩니다.
                </p>
            </div>
        </section>

        <span className="w-full px-12 pt-32 pb-4 text-5xl font-semibold text-left">What We Do</span>
    </main>
  );
}
