import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CompanyPage = () => {
  const [rotationAngle, setRotationAngle] = useState(0); // 현재 회전 각도
  const [currentStep, setCurrentStep] = useState(0); // 현재 단계 (1번, 2번 등)
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedIndex =
    rotationAngle > 0
      ? Math.floor((Math.abs(rotationAngle) / 120) % 3)
      : Math.floor((Math.abs(rotationAngle) / 60) % 3);

  // 스크롤 마다 동작하는 이벤트 - 회전값 변경
  const handleScroll = (e: WheelEvent) => {
    e.preventDefault();

    if (e.deltaY > 0) {
      setCurrentStep((prev) => {
        if (prev - 1 > -10) {
          return prev - 1;
        } else {
          setRotationAngle((prev) => prev + 120);
          return 0;
        }
      });
      // setRotationAngle((prev) => prev - 120);
    } else if (e.deltaY < 0) {
      setCurrentStep((prev) => {
        if (prev + 1 < 10) {
          return prev + 1;
        } else {
          setRotationAngle((prev) => prev - 120);
          return 0;
        }
      });
      // setRotationAngle((prev) => prev + 120);
    }
  };

  // 작은 원들의 초기 위치
  const smallCirclePositions = [
    { x: 50 - 40 * Math.cos(0), y: 50 + 40 * Math.sin(0) },
    { x: 50 - 40 * Math.cos((2 * Math.PI) / 3), y: 50 + 40 * Math.sin((2 * Math.PI) / 3) },
    { x: 50 - 40 * Math.cos((4 * Math.PI) / 3), y: 50 + 40 * Math.sin((4 * Math.PI) / 3) },
  ];

  // 스크롤 이벤트 등록
  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("wheel", handleScroll, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div className={`container w-screen h-screen flex  justify-between items-center`}>
        <CompanyText selectedIndex={selectedIndex} />
        <CompanyCircle
          smallCirclePositions={smallCirclePositions}
          rotationAngle={rotationAngle}
          selectedIndex={selectedIndex}
        />
      </div>
    </div>
  );
};
const CompanyText = ({ selectedIndex }) => {
  const titles = [
    "미래가치 분석을 위한\n 데이터 프로세싱",
    "더 나은 선택을 위한\n 데이터 분석",
    "문제 해결을 위한\n 데이터 시각화",
  ];
  const contents = [
    "우리는 다년간 쌓아온 언어, 문서, 재난, 의료과학\n분야에 전문화된 데이터 처리 기술을 통해\n미래의 새로운 가치를 발굴합니다.",
    "데이터는 우리가 살고 있는 세상을 다르게 볼 수 있는\n 정보를 제공하며, 데이터 분석을 통해 의미를 추출하고\n 더 나은 결정을 내릴 수 있도록 연구하고 개발합니다.",
    "데이터 시각화를 통하여 모든 일련의 과정을\n 설명하며, 다양한 시각적 요소를 활용해\n 누구든지 쉽게 정보를 이해할 수 있도록 합니다.",
  ];
  return (
    <motion.div
      className={`flex-col flex whitespace-pre-line gap-[60px]`}
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      exit={{ y: "200%", opacity: 0, position: "absolute" }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      key={selectedIndex}
    >
      <div className={`text-[58px] font-bold`}>{titles[selectedIndex]}</div>
      <div className={`text-[30px]`}>{contents[selectedIndex]}</div>
    </motion.div>
  );
};

const CompanyCircle = ({ rotationAngle, smallCirclePositions, selectedIndex }) => {
  const c_color = "#9BBB59";
  const img_size = selectedIndex === 2 ? " w-[380px] h-[300px]" : " w-[350px] h-[350px] ";
  const img_link =
    selectedIndex === 0
      ? "/img/company_dataProcessing.png"
      : selectedIndex === 1
      ? "/img/company_dataAnalysis.png"
      : "/img/company_dataVisualizing.png";
  return (
    <div className={`relative w-[750px] h-[750px] `}>
      <FloatingImage img_link={img_link} img_size={img_size} />

      <motion.svg // 애니메이션 공간 확보
        className="w-[750px] h-[750px] absolute "
        viewBox="0 0 100 100"
        animate={{ rotate: rotationAngle }}
        transition={{ duration: 1.2 }}
      >
        <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="1.3" strokeDasharray="0.15, 2" />
        {smallCirclePositions.map((pos: { x: number; y: number }, index: number) => {
          const isSelected = index === selectedIndex;
          const beforeSelected = index === (selectedIndex + 2) % 3;

          if (isSelected) {
            return (
              <>
                <AnimatedCircle
                  key={`${index}-outer`}
                  cx={pos.x}
                  cy={pos.y}
                  fill={c_color}
                  animateR={8}
                  transitionDuration={0.5}
                />
                <AnimatedCircle
                  key={`${index}-inner`}
                  cx={pos.x}
                  cy={pos.y}
                  fill={"white"}
                  animateR={7}
                  transitionDuration={0.5}
                />
                <AnimatedCircle
                  key={`${index}-smallest`}
                  cx={pos.x}
                  cy={pos.y}
                  fill={c_color}
                  animateR={4.5}
                  transitionDuration={0.5}
                />
              </>
            );
          } else if (beforeSelected) {
            return (
              <>
                <AnimatedCircle
                  key={`${index}-outer`}
                  cx={pos.x}
                  cy={pos.y}
                  fill={"#c3d69b"}
                  animateR={3.5}
                  transitionDuration={0.5}
                />
                <AnimatedCircle
                  key={`${index}-inner`}
                  cx={pos.x}
                  cy={pos.y}
                  fill={c_color}
                  animateR={1.8}
                  transitionDuration={0.5}
                />
              </>
            );
          }
          return (
            <>
              <AnimatedCircle
                key={`${index}-outer`}
                cx={pos.x}
                cy={pos.y}
                fill={c_color}
                animateR={3.5}
                transitionDuration={0.5}
              />
              <AnimatedCircle
                key={`${index}-inner`}
                cx={pos.x}
                cy={pos.y}
                fill={"white"}
                animateR={3}
                transitionDuration={0.5}
              />
            </>
          );
        })}
      </motion.svg>
    </div>
  );
};
const FloatingImage = ({ img_link, img_size }) => {
  return (
    <motion.img
      key={img_link}
      src={img_link} // 이미지 경로
      alt="Floating Image"
      className={` ${img_size} absolute top-1/2 left-1/2  drop-shadow-2xl `}
      initial={{ x: "-50%", y: "-100%" }}
      animate={{
        x: ["-50%", "-50%", "-50%"],
        y: ["-50%", "-60%", "-50%"],
        // 위로 20px 이동 후 다시 원래 위치로
      }}
      transition={{
        // delay: 0.5,
        duration: 3, // 애니메이션 지속 시간 (초)
        repeat: Infinity, // 무한 반복
        repeatType: "reverse", // 왕복 애니메이션
        ease: "easeInOut", // 부드러운 움직임
      }}
      style={{ transform: "translate(-50%, -50%)" }}
    />
  );
};
const AnimatedCircle = ({
  cx,
  cy,
  r = 0.2, // Default value for r
  fill,
  animateR,
  transitionDuration,
}: {
  cx: number;
  cy: number;
  r?: number; // Make r optional
  fill: string;
  animateR: number;
  transitionDuration: number;
}) => {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
      animate={{ r: animateR }}
      transition={{ duration: transitionDuration }}
    />
  );
};
export default CompanyPage;
