import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
const SkillPage = () => {
  return (
    <div>
      <IntroText />
      <SkillContainer />
    </div>
  );
};

const SkillContainer = () => {
  return (
    <div className={`flex flex-col items-end`}>
      <span className={`mt-[430px] text-[#F1EFEE] text-[128px] font-bold`}>WAVEWARE</span>
    </div>
  );
};
const SkillBox = () => {
  return <></>;
};
const IntroText = ({}) => {
  const introText = `데이터 처리 기술을 통해 미래의 잠재력을 미리 예측하고 혁신을 위한 새로운 가치를 발굴합니다.\n다년간 R&D 사업의 노하우를 통해 데이터 분석으로 의미를 추출합니다.`;
  const [isProgressed, setIsProgressed] = useState(false);
  const progressSensor = useRef<HTMLDivElement>(null);
  const GREEN = "#3A9100";
  const GRAY = "#D9D9D9";
  const progress_variant: Variants = {
    enter: { y: "-100%" },
    center: ({ isProgressed }: { isProgressed: boolean }) => ({
      y: isProgressed ? "0%" : "-100%",
    }),
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === progressSensor.current) {
              setIsProgressed(true);
            }
          }
        });
      },
      { threshold: 1.0 }
    );
    if (progressSensor.current) observer.observe(progressSensor.current);
    return () => {
      if (progressSensor.current) observer.unobserve(progressSensor.current);
    };
  }, []);
  console.log(` 진행${isProgressed}  `);
  return (
    <div className={`container text-center flex flex-col  items-center pt-[40px]`}>
      <span className={` font-bold text-[60px]`}>
        모든 <span className={`text-[${GREEN}]`}>데이터</span>에서
      </span>
      <div ref={progressSensor} className={`relative  w-[5px] h-[150px] overflow-hidden   bg-[${GRAY}]`}>
        <motion.div
          className={` absolute top-0 left-0 w-full h-full    `}
          variants={progress_variant}
          custom={{ isProgressed }}
          initial="enter"
          animate="center"
          style={{ background: `${GREEN}` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        ></motion.div>
      </div>
      <div className={` whitespace-pre-line `}>
        <div className={`font-semibold text-xl`}>
          <span className={`text-[${GREEN}]`}>waveware</span>
          <span>는</span>
        </div>
        <span className={`font-medium text-[30px]`}>{introText}</span>
      </div>
    </div>
  );
};

export default SkillPage;
