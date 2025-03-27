import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";
import { threshold } from "three/examples/jsm/nodes/Nodes.js";

const CompanyPage2 = () => {
  const [rotationAngle, setRotationAngle] = useState(0); // 현재 회전 각도
  const containerRef = useRef<HTMLDivElement>(null);
  const firstSensor = useRef<HTMLDivElement>(null);
  const secondSensor = useRef<HTMLDivElement>(null);
  const thirdSensor = useRef<HTMLDivElement>(null);

  const selectedIndex =
    rotationAngle > 0
      ? Math.floor((Math.abs(rotationAngle) / 120) % 3)
      : Math.floor((Math.abs(rotationAngle) / 60) % 3);

  // 작은 원들의 초기 위치
  const smallCirclePositions = [
    { x: 50 - 40 * Math.cos(0), y: parseFloat((50 + 40 * Math.sin(0)).toFixed(6)) },
    { x: 50 - 40 * Math.cos((2 * Math.PI) / 3), y: parseFloat((50 + 40 * Math.sin((2 * Math.PI) / 3)).toFixed(6)) },
    { x: 50 - 40 * Math.cos((4 * Math.PI) / 3), y: parseFloat((50 + 40 * Math.sin((4 * Math.PI) / 3)).toFixed(6)) },
  ];

  console.log(rotationAngle);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === firstSensor.current) {
            } else if (entry.target === secondSensor.current) {
              // console.log(`세번째 섹션 입장 ${rotationAngle}`);
              setRotationAngle(120);
            } else if (entry.target === thirdSensor.current) {
              setRotationAngle(240);
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    const firstObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === firstSensor.current) {
              setRotationAngle(0);
            }
          }
        });
      },
      { rootMargin: "-250px 0px -250px 0px", threshold: 1.0 }
    );
    if (firstSensor.current) {
      firstObserver.observe(firstSensor.current);
    }
    if (secondSensor.current) {
      observer.observe(secondSensor.current);
    }
    if (thirdSensor.current) {
      observer.observe(thirdSensor.current);
    }
    return () => {
      if (firstSensor.current) {
        firstObserver.unobserve(firstSensor.current);
      }
      if (secondSensor.current) {
        observer.unobserve(secondSensor.current);
      }
      if (thirdSensor.current) {
        observer.unobserve(thirdSensor.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div className={`container  h-screen flex   justify-between items-center sticky top-0 `}>
        <CompanyText selectedIndex={selectedIndex} />

        <CompanyCircle
          smallCirclePositions={smallCirclePositions}
          rotationAngle={rotationAngle}
          selectedIndex={selectedIndex}
        />
      </div>
      <div className={`skill-area  h-[210vh] flex flex-col justify-around  `}>
        <div ref={firstSensor} className={`second-section h-[10vh] flex flex-col-reverse  `}></div>
        <div ref={secondSensor} className={`third-section h-[100vh]  `}></div>
        <div ref={thirdSensor} className={`third-section h-[100vh]  `}></div>
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
    "우리는 다년간 쌓아온 언어, 문서, 재난, 의료과학 분야에 전문화된\n데이터 처리 기술을 통해 미래의 새로운 가치를 발굴합니다.",
    "데이터는 우리가 살고 있는 세상을 다르게 볼 수 있는 정보를 제공하며,\n 데이터 분석을 통해 의미를 추출하고 더 나은 결정을 내릴 수 있도록\n연구하고 개발합니다.",
    "데이터 시각화를 통하여 모든 일련의 과정을 설명하며, 다양한 시각적\n요소를 활용해 누구든지 쉽게 정보를 이해할 수 있도록 합니다.",
  ];
  return (
    <motion.div
      className={`flex-col flex whitespace-pre-line gap-[35px]`}
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      exit={{ y: "200%", opacity: 0, position: "absolute" }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      key={selectedIndex}
    >
      <div className={`text-[48px] font-bold`}>{titles[selectedIndex]}</div>
      <div className={`text-[22px] font-medium`}>{contents[selectedIndex]}</div>
      <button
        className={`border-2 border-black rounded-full text-lg font-semibold px-[30px] py-[15px] self-start flex gap-[15px] items-center mt-[35px]`}
      >
        자세히 보기
        <GoArrowUpRight className={`inline-block`} />
      </button>
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
    <div className={`relative w-[650px] h-[650px] `}>
      <FloatingImage img_link={img_link} img_size={img_size} selectedIndex={selectedIndex} />

      <motion.svg // 애니메이션 공간 확보
        className="w-[650px] h-[650px] absolute "
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
              <g key={index}>
                <AnimatedCircle
                  // 지금 큰원부터 94 , 80 , 50
                  key={`${index}-outer`}
                  cx={pos.x}
                  cy={pos.y}
                  fill={c_color}
                  animateR={7.2}
                  transitionDuration={0.5}
                />
                <AnimatedCircle
                  key={`${index}-inner`}
                  cx={pos.x}
                  cy={pos.y}
                  fill={"white"}
                  animateR={6.1}
                  transitionDuration={0.5}
                />
                <AnimatedCircle
                  key={`${index}-smallest`}
                  cx={pos.x}
                  cy={pos.y}
                  fill={c_color}
                  animateR={3.8}
                  transitionDuration={0.5}
                />
              </g>
            );
          } else if (beforeSelected) {
            return (
              <g key={index}>
                <AnimatedCircle
                  key={`${index}-outer`}
                  cx={pos.x}
                  cy={pos.y}
                  fill={"#c3d69b"}
                  animateR={2.3}
                  transitionDuration={0.5}
                />
                <AnimatedCircle
                  key={`${index}-inner`}
                  cx={pos.x}
                  cy={pos.y}
                  fill={c_color}
                  animateR={1.5}
                  transitionDuration={0.5}
                />
              </g>
            );
          }
          return (
            <g key={index}>
              <AnimatedCircle
                key={`${index}-outer`}
                cx={pos.x}
                cy={pos.y}
                fill={c_color}
                animateR={3.8}
                transitionDuration={0.5}
              />
              <AnimatedCircle
                key={`${index}-inner`}
                cx={pos.x}
                cy={pos.y}
                fill={"white"}
                animateR={2.6}
                transitionDuration={0.5}
              />
            </g>
          );
        })}
      </motion.svg>
    </div>
  );
};
const FloatingImage = ({ img_link, img_size, selectedIndex }) => {
  const shadow = [" h-[140px] w-[300px] rounded-[50%] ", "h-[160px] w-[160px] ", "w-[240px] h-[160px]"];
  const shadow_animate = [
    { scaleX: [1.0, 1.1], x: ["-50%"], y: ["35%"], opacity: [1.0, 0.3] },
    { skew: [-30], rotate: [30], scaleX: [1.0, 1.1], x: ["-50%"], y: ["35%"], opacity: [1.0, 0.3] },
    { skew: [-25], x: ["-50%"], y: ["35%"], opacity: [1.0, 0.3], rotate: [30] },
  ];
  return (
    <>
      <motion.img
        key={img_link}
        src={img_link} // 이미지 경로
        alt="Floating Image"
        className={` ${img_size} absolute top-1/2 left-1/2    `}
        initial={{ x: "-50%", y: "-100%" }}
        animate={{
          x: ["-50%", "-50%", "-50%"],
          y: ["-50%", "-55%", "-50%"],
          // 위로 20px 이동 후 다시 원래 위치로
        }}
        transition={{
          duration: 3, // 애니메이션 지속 시간 (초)
          repeat: Infinity, // 무한 반복
          repeatType: "reverse", // 왕복 애니메이션
          ease: "easeInOut", // 부드러운 움직임
        }}
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <motion.div
        key={`${img_link}-shadow`}
        className={`absolute top-1/2 left-1/2 ${shadow[selectedIndex]} -z-10  `}
        style={{
          filter: "blur(15px)",
          opacity: 1.0,
          background: "linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1.0))",
          transformOrigin: "right",
        }}
        animate={shadow_animate[selectedIndex]}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      ></motion.div>
    </>
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
export default CompanyPage2;
