import React, { ReactNode, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import MenuHeader from "../../kwon/components/menuheader";
import SectionTitle from "../../kwon/components/section_title";
export default function CompanyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center  ">
      <MenuHeader
        title={"Company"}
        description={"데이터의 힘을 통해 미래를 예측하고/혁신을 이끄는 기술을 연구합니다."}
      />

      <SectionTitle text={"Who We Are"} />
      <WaveSection />

      <IntroSection />

      <SectionTitle text={"What We Do"} />
      <BannerSection />
    </main>
  );
}
const WaveSection = ({ isLong = 2 }) => {
  const waveRef = useRef(null);
  const { scrollYProgress: waveProgress } = useScroll({ target: waveRef, offset: ["end end", "start start"] });
  const waveY = useSpring(
    useTransform(
      waveProgress,
      // [0.0, 1.0], [-300, -500]),
      [0.0, 1.0],
      isLong === 1 ? [-300, -750] : [-300, -500]
    ),
    { stiffness: 500, damping: 100 }
  );
  return (
    // <section ref={waveRef} className="relative w-[1440px] h-[410px] overflow-hidden">
    <section ref={waveRef} className={`relative ${isLong === 1 ? "w-full" : "w-[1440px]"} h-[410px] overflow-hidden`}>
      <motion.img src={`/img/beach.jpg`} className={`  absolute `} style={{ y: waveY }} />
      <div className="absolute inset-0 bg-black opacity-65"></div>
      <div className="relative container mx-auto w-[1400px] h-full flex flex-col justify-between text-white py-12">
        <h2 className="text-[40px] font-regular text-left w-full">웨이브웨어는 물결입니다.</h2>
        <p className="text-xl font-light w-full text-right bottom-[530px]">
          작은 파도가 일어나 바다로 퍼지고, 바다는 또 다른 파도를 만들어냅니다.
          <br />
          그렇게 끊임없이 이러질 때 파도는 비로소 거대한 물결이 됩니다.
        </p>
      </div>
    </section>
  );
};
const IntroSection = () => {
  const [introSubTitle, setIntroSubTitle] = useState(false);
  const introRef = useRef(null);
  const { scrollYProgress: introProgress } = useScroll({ target: introRef, offset: ["start end", "end start"] });

  useMotionValueEvent(introProgress, "change", (latest) => {
    if (latest >= 0.55) {
      setIntroSubTitle(true);
    }
  });

  return (
    <section ref={introRef} className={`relative container h-[1020px] select-none   `}>
      <div className="overflow-hidden absolute   ">
        <motion.div
          className="font-pistara text-[300px] text-[#F6F6F6] "
          style={{
            textShadow: " -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black",
            opacity: 0.1,
            x: useTransform(introProgress, [0.0, 0.4], [-500, 0]),
            // y: useTransform(introProgress, [0.0, 0.4], [420, 0]),
          }}
        >
          waveware
        </motion.div>
      </div>
      <div className="overflow-hidden  absolute top-[300px] right-0  ">
        <motion.div
          className="font-pistara text-[300px] text-[#F6F6F6]  "
          style={{
            textShadow: " -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black",
            opacity: 0.1,
            x: useTransform(introProgress, [0.3, 0.5], [500, 0]),
            // y: useTransform(introProgress, [0.3, 0.6], [420, 0]),
          }}
        >
          waveware
        </motion.div>
      </div>
      <div className="overflow-hidden absolute top-[600px]  ">
        <motion.div
          className="font-pistara text-[300px] text-[#F6F6F6]   "
          style={{
            textShadow: " -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black",
            opacity: 0.1,
            x: useTransform(introProgress, [0.4, 0.7], [-500, 0]),
            // y: useTransform(introProgress, [0.1, 0.65], [420, 0]),
          }}
        >
          waveware
        </motion.div>
      </div>

      <MoveText
        scrollY={introProgress}
        treshold={0.1}
        className={`absolute text-center text-[48px]   bottom-[475px] left-1/2 transform -translate-x-1/2 text-nowrap font-medium`}
      >
        <div className={`text-center text-[48px]   text-nowrap font-medium`}>
          과학데이터 연산 및 데이터 시각화 기술 중심의
          <br />
          인공지능 분야 <span className={`text-[#C4000F]`}>핵심 코어 기술 전문 회사</span>
        </div>
      </MoveText>
      <MoveText
        scrollY={introProgress}
        treshold={0.1}
        className={
          "font-normal text-[24px]  absolute text-center bottom-[285px] left-1/2 transform -translate-x-1/2 text-nowrap pt-[10px]"
        }
      >
        <div className={`font-normal text-[24px]   text-center  text-nowrap pt-[10px]`}>
          <div className={`mb-[40px]`}>
            waveware는 미래 가치 분석을 위한 데이터 프로세싱을 통해 더 나은 선택을 위한 데이터 분석을 주도하며 데이터
          </div>
          <div>시각화를 통해 데이터의 의미를 추출하고 더 나은 결정을 내릴 수 있도록 연구하고 개발합니다</div>
        </div>
      </MoveText>
    </section>
  );
};

const MoveText = ({ children, scrollY, treshold, className = ``, delay = 0, duration = 0.8 }) => {
  const [isVisible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (Number(latest) >= treshold) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });
  return (
    <>
      <div className={` ${className}  overflow-hidden`}>
        <motion.div
          animate={isVisible ? { y: 0 } : { y: "100%" }}
          transition={{ ease: [0.68, -0.55, 0.265, 1.55], duration: duration, delay: delay }}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
};

const BannerSection = ({ img_num = 2 }) => {
  const bannerRef = useRef(null);
  const { scrollYProgress: bannerProgress } = useScroll({ target: bannerRef, offset: ["start end", "end start"] });
  const img_src = [
    `/img/${img_num}-1 processing.png`,
    `/img/${img_num}-2 analysis.png`,
    `/img/${img_num}-3 visual.png`,
  ];
  const img_css = ` w-[260px] h-[260px] pb-[25px]`;
  const title_timing = 0.05;
  const description_timing = 0.05;
  const img_timing = 0.05;
  const duration = 0.6;
  return (
    <section ref={bannerRef} className={`relative w-full h-[730px] bg-[#F3F3F3] `}>
      <div className="justify-center flex">
        <div className=" flex  py-[103px] justify-between  w-[1400px] ">
          <div className={` flex-col flex items-center w-[330px]  `}>
            <MoveText scrollY={bannerProgress} treshold={title_timing} className="self-start " duration={duration}>
              <div className="font-bold text-[27px] pb-[12px] ">Data Processing</div>
            </MoveText>
            <MoveText scrollY={bannerProgress} treshold={description_timing} duration={duration}>
              <div className="font-normal text-[21px]">
                전문화된 데이터 처리 기술을 통해 혁신을 위한 가치를 발굴합니다.
              </div>
            </MoveText>
            <MoveText scrollY={bannerProgress} treshold={img_timing} duration={duration}>
              <img src={img_src[0]} className={` mt-[50px] w-[330px] h-[330px]  ${img_css}`} />
            </MoveText>
          </div>
          <div className={` flex-col flex items-center w-[330px]  `}>
            <MoveText
              scrollY={bannerProgress}
              treshold={title_timing}
              className="self-start "
              delay={0.15}
              duration={duration}
            >
              <div className="font-bold text-[27px] pb-[12px]   ">Data Analysis</div>
            </MoveText>
            <MoveText scrollY={bannerProgress} treshold={description_timing} delay={0.15} duration={duration}>
              <div className="font-normal text-[21px]">
                데이터 분석을 통해 더 나은 결정을 내릴 수 있도록 연구하고 개발합니다.
              </div>
            </MoveText>
            <MoveText scrollY={bannerProgress} treshold={img_timing} delay={0.15} duration={duration}>
              <img src={img_src[1]} className={` mt-[50px] w-[330px] h-[330px]  ${img_css}`} />
            </MoveText>
          </div>
          <div className={` flex-col flex items-center w-[330px]  `}>
            <MoveText
              scrollY={bannerProgress}
              treshold={title_timing}
              className="self-start "
              delay={0.3}
              duration={duration}
            >
              <div className="font-bold text-[27px] pb-[12px]  ">Data Visualization</div>
            </MoveText>
            <MoveText scrollY={bannerProgress} treshold={description_timing} delay={0.3} duration={duration}>
              <div className="font-normal text-[21px]">
                다양한 시각적 요소를 활용해 누구든지 쉽게 정보를 이해할 수 있도록 합니다.
              </div>
            </MoveText>
            <MoveText scrollY={bannerProgress} treshold={img_timing} delay={0.3} duration={duration}>
              <img src={img_src[2]} className={` mt-[50px] w-[330px] h-[330px]  ${img_css}`} />
            </MoveText>
          </div>
        </div>
      </div>
    </section>
  );
};
