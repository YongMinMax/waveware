import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";
const CompanyLongScrollPage = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isScrollDown, setIsScrollDown] = useState(true);
  const [firstRender, setFirstRender] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstSensor = useRef<HTMLDivElement>(null);
  const secondSensor = useRef<HTMLDivElement>(null);
  const thirdSensor = useRef<HTMLDivElement>(null);

  const SECTION_HEIGHT = { first: 90, second: 90, third: 90 };
  const DEFAULT_SCROLL_THRESHOLD = 0.6;
  const MIN_WIDTH = 1440;
  const selectedIndex = Math.floor((Math.abs(rotationAngle) / 120) % 3);

  const smallCirclePositions = [
    { x: 50 - 40 * Math.cos(0), y: parseFloat((50 + 40 * Math.sin(0)).toFixed(6)) },
    { x: 50 - 40 * Math.cos((2 * Math.PI) / 3), y: parseFloat((50 + 40 * Math.sin((2 * Math.PI) / 3)).toFixed(6)) },
    { x: 50 - 40 * Math.cos((4 * Math.PI) / 3), y: parseFloat((50 + 40 * Math.sin((4 * Math.PI) / 3)).toFixed(6)) },
  ];

  useEffect(() => {
    const createObserver = (threshold: number) => {
      return new IntersectionObserver(
        (entries) => {
          if (firstRender) {
            setFirstRender(false);
          }

          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (entry.target === firstSensor.current) {
                setRotationAngle(0);
                setIsScrollDown(false);
              } else if (entry.target === secondSensor.current) {
                let flag = false;
                setRotationAngle((prev) => {
                  if (prev === 0) {
                    flag = true;
                  }
                  setIsScrollDown(flag);
                  return 120;
                });
              } else if (entry.target === thirdSensor.current) {
                setRotationAngle(240);
                setIsScrollDown(true);
              }
            }
          });
        },
        { threshold }
      );
    };

    let observer = createObserver(DEFAULT_SCROLL_THRESHOLD); // 초기 threshold 값

    const observeSensors = () => {
      if (firstSensor.current) observer.observe(firstSensor.current);
      if (secondSensor.current) observer.observe(secondSensor.current);
      if (thirdSensor.current) observer.observe(thirdSensor.current);
    };

    const unobserveSensors = () => {
      if (firstSensor.current) observer.unobserve(firstSensor.current);
      if (secondSensor.current) observer.unobserve(secondSensor.current);
      if (thirdSensor.current) observer.unobserve(thirdSensor.current);
    };

    observeSensors();

    const handleResize = () => {
      unobserveSensors(); // 기존 observer 해제
      const newThreshold =
        window.innerWidth > MIN_WIDTH ? DEFAULT_SCROLL_THRESHOLD : (window.innerWidth * 0.6) / MIN_WIDTH;
      observer = createObserver(newThreshold); // 새로운 observer 생성
      observeSensors(); // 새로운 observer로 감시 시작
    };

    window.addEventListener("resize", handleResize);

    return () => {
      unobserveSensors(); // 컴포넌트 언마운트 시 observer 해제
      window.removeEventListener("resize", handleResize);
    };
  }, [firstRender]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full  max-w-[100%] min-w-[100%] `}
      style={{
        height: `${SECTION_HEIGHT.first + SECTION_HEIGHT.second + SECTION_HEIGHT.third}vh`,
        // minWidth: `${MIN_WIDTH}px`,
      }}
    >
      <div
        ref={firstSensor}
        className={`first-section w-[100%]  absolute   `}
        style={{
          height: `${SECTION_HEIGHT.first}vh`,
          minWidth: `${MIN_WIDTH}px`,
        }}
      ></div>
      <div
        ref={secondSensor}
        className={`second-section  w-[100%]   absolute  `}
        style={{
          height: `${SECTION_HEIGHT.second}vh`,
          top: `${SECTION_HEIGHT.first}vh`,
          minWidth: `${MIN_WIDTH}px`,
        }}
      ></div>
      <div
        ref={thirdSensor}
        className={`third-section   w-[100%]  absolute   `}
        style={{
          height: `${SECTION_HEIGHT.third}vh`,
          top: `${SECTION_HEIGHT.first + SECTION_HEIGHT.second}vh`,
          minWidth: `${MIN_WIDTH}px`,
        }}
      ></div>
      <div
        className={`container h-screen flex justify-end items-center sticky top-0 overflow-hidden `}
        style={{ minWidth: `${MIN_WIDTH}px` }} // px 단위를 명시적으로 추가
      >
        <CompanyText selectedIndex={selectedIndex} isScrollDown={isScrollDown} firstRender={firstRender} />

        <CompanyCircle
          smallCirclePositions={smallCirclePositions}
          rotationAngle={rotationAngle}
          selectedIndex={selectedIndex}
          isScrollDown={isScrollDown}
        />
      </div>
    </div>
  );
};
const CompanyText = ({ selectedIndex, isScrollDown, firstRender }) => {
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
  const text_movement = {
    enter: ({ isScrollDown, firstRender }: { isScrollDown: boolean; firstRender: boolean }) => ({
      x: firstRender ? "0%" : "20%",
      y: firstRender ? "0%" : isScrollDown ? "200%" : "-200%",
      opacity: 1,
      scale: firstRender ? 1 : 1.5,
    }),
    center: {
      x: "0%",
      y: "0%",
      opacity: 1,
      scale: 1,
    },
    exit: ({ isScrollDown, firstRender }: { isScrollDown: boolean; firstRender: boolean }) => ({
      x: "20%",
      y: isScrollDown ? "-200%" : "200%",
      opacity: 1,
    }),
  };
  const handleButtonClick = () => {
    if (selectedIndex === 0) {
      // 데이터프로세싱
    } else if (selectedIndex === 1) {
      // 데이터 분석
    } else if (selectedIndex === 2) {
      // 데이터 시각화
    }
  };
  return (
    <AnimatePresence custom={{ isScrollDown, firstRender }}>
      <motion.div
        className={`flex-col flex whitespace-pre-line gap-[35px] absolute left-4 `}
        custom={{ isScrollDown, firstRender }} // 최신 상태값 전달
        variants={text_movement}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        key={selectedIndex}
        // key={`${selectedIndex}-${isScrollDown}`} // key에 isScrollDown 포함
      >
        <div className={`text-[48px] font-semibold`}>{titles[selectedIndex]}</div>
        <div className={`text-[18px] font-light`}>{contents[selectedIndex]}</div>
        <button
          className={`border border-black rounded-full text-lg font-semibold px-[30px] py-[15px] self-start flex gap-[15px] items-center mt-[35px]
            hover:bg-black hover:text-white`}
          onClick={handleButtonClick}
        >
          자세히 보기
          <GoArrowUpRight className={`inline-block`} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

const CompanyCircle = ({ rotationAngle, smallCirclePositions, selectedIndex, isScrollDown }) => {
  const c_color = "#9BBB59";
  const img_size = selectedIndex === 2 ? " w-[320px] h-[320px]" : " w-[350px] h-[350px] ";
  const img_link =
    selectedIndex === 0
      ? "/img/company_dataProcessing.png"
      : selectedIndex === 1
      ? "/img/company_dataAnalysis.png"
      : "/img/company_dataVisualizing.png";
  return (
    <div className={`relative w-[650px] h-[650px]  `}>
      <FloatingImage
        img_link={img_link}
        img_size={img_size}
        selectedIndex={selectedIndex}
        isScrollDown={isScrollDown}
      />

      <motion.svg // 애니메이션 공간 확보
        className="w-[650px] h-[650px] absolute "
        viewBox="0 0 100 100"
        animate={{ rotate: rotationAngle }}
        transition={{ duration: 0.3 }}
      >
        <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="1.3" strokeDasharray="0.15, 2" />
        {smallCirclePositions.map((pos: { x: number; y: number }, index: number) => {
          const isSelected = index === selectedIndex;
          const beforeSelected = index === (selectedIndex + 2) % 3;

          if (isSelected) {
            return (
              <g key={index}>
                <AnimatedCircle
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
const FloatingImage = ({ img_link, img_size, selectedIndex, isScrollDown }) => {
  const shadow = [" h-[140px] w-[300px] rounded-[50%] ", "h-[160px] w-[160px] ", "h-[120px] w-[260px] rounded-[50%]"];
  const shadow_animate = [
    { scaleX: [1.0, 1.1], x: ["-50%"], y: ["35%"], opacity: [1.0, 0.3] },
    { skew: [-30], rotate: [30], scaleX: [1.0, 1.1], x: ["-50%"], y: ["45%"], opacity: [1.0, 0.3] },
    { scaleX: [1.0, 1.1], x: ["-50%"], y: ["45%"], opacity: [1.0, 0.3] },
  ];

  const image_movement: Variants = {
    enter: {
      x: "-50%",
      y: "-50%",
      opacity: 1,
    },
    center: {
      x: ["-50%", "-50%", "-50%"],
      y: ["-50%", "-55%", "-50%"],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse", // Ensure this value is one of the allowed types
        ease: "easeInOut",
      },
    },
  };
  return (
    <>
      <AnimatePresence custom={{ isScrollDown }}>
        <motion.img
          key={img_link}
          src={img_link} // 이미지 경로
          alt="Floating Image"
          custom={{ isScrollDown }}
          variants={image_movement}
          className={` ${img_size} absolute top-1/2 left-1/2 `}
          animate="center"
          style={{ transform: "translate(-50%, -500%)" }}
        />
      </AnimatePresence>
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
  r = 0.2,
  fill,
  animateR,
  transitionDuration,
}: {
  cx: number;
  cy: number;
  r?: number;
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
export default CompanyLongScrollPage;
