import { useEffect, useRef } from "react";
import MenuHeader from "../kwon/components/menuheader";
import SectionTitle from "../kwon/components/section_title";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

export default function Company() {
  const parallaxRef = useRef(null);
  const sectionRef = useRef(null);
  
  // 부드러운 스크롤 적용
  // useSmoothScroll(0.1);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current && sectionRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const visibleRatio = (windowHeight - sectionRect.top) / (windowHeight + sectionRect.height);
        
        if (visibleRatio > 0 && visibleRatio < 1) {
          const moveDistance = sectionRect.height * 0.5;
          const offset = moveDistance * visibleRatio;
          parallaxRef.current.style.transform = `translateY(-${offset}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <MenuHeader
        title={"Company"}
        description={
          "데이터의 힘을 통해 미래를 예측하고/혁신을 이끄는 기술을 연구합니다."
        }
      />

      <SectionTitle text={"Who We Are"} />
      <ParallaxSection 
        sectionRef={sectionRef} 
        parallaxRef={parallaxRef} 
      />

      <SectionTitle text={"What We Do"} />
    </main>
  );
}

// Extracted component for the parallax section
function ParallaxSection({ sectionRef, parallaxRef }) {
  return (
    <section
      ref={sectionRef}
      className="relative w-[1440px] h-[410px] overflow-hidden"
    >
      <div 
        ref={parallaxRef}
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
        style={{ 
          backgroundImage: "url('/img/beach.jpg')",
          height: '160%',
          top: '-30%',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          willChange: 'transform'
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-65"></div>
      <div className="relative container mx-auto w-[1400px] h-full flex flex-col justify-between text-white py-12">
        <h2 className="text-[40px] font-regular text-left w-full">
          웨이브웨어는 물결입니다.
        </h2>
        <p className="text-xl font-light w-full text-right">
          작은 파도가 일어나 바다로 퍼지고, 바다는 또 다른 파도를
          만들어냅니다.
          <br />
          그렇게 끊임없이 이러질 때 파도는 비로소 거대한 물결이 됩니다.
        </p>
      </div>
    </section>
  );
}