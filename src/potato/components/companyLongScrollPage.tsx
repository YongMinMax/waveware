import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Variants, useMotionValueEvent, useScroll } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";
import { useRouter } from "next/router";
const CompanyLongScrollPage = () => {
  return (
    <>
      <div className={`hidden md:block`}>
        <CompanyLongScrollPage_DeskTop />
      </div>
      <div className={`block md:hidden`}>
        <CompanyLongScrollPage_Mobile />
      </div>
    </>
  );
};
const CompanyLongScrollPage_DeskTop = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isScrollDown, setIsScrollDown] = useState(true);
  const [firstRender, setFirstRender] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const firstSensor = useRef<HTMLDivElement>(null);
  const secondSensor = useRef<HTMLDivElement>(null);
  const thirdSensor = useRef<HTMLDivElement>(null);

  const SECTION_HEIGHT = { first: 100, second: 100, third: 100 };
  const SCROLL_THRESHOLD = { firstToSecond: 0.4, secondToThird: 0.57 };
  const DEFAULT_SCROLL_THRESHOLD = 0.6;
  const MIN_WIDTH = 1440;
  const selectedIndex = Math.floor((Math.abs(rotationAngle) / 120) % 3);

  const smallCirclePositions = [
    { x: 50 - 40 * Math.cos(0), y: parseFloat((50 + 40 * Math.sin(0)).toFixed(6)) },
    { x: 50 - 40 * Math.cos((2 * Math.PI) / 3), y: parseFloat((50 + 40 * Math.sin((2 * Math.PI) / 3)).toFixed(6)) },
    { x: 50 - 40 * Math.cos((4 * Math.PI) / 3), y: parseFloat((50 + 40 * Math.sin((4 * Math.PI) / 3)).toFixed(6)) },
  ];

  const { scrollYProgress: scrollProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const contextRef = useRef<"start" | "middle" | "end" | null>("start");

  useEffect(() => {
    let isThrottled = false;
    const THROTTLE_TIME = 500;
    const THRESHOLD = 10; // 섹션 감지를 위한 픽셀 임계값
    const getPos = () => {
      const firstRect = firstSensor.current?.getBoundingClientRect();
      const secondRect = secondSensor.current?.getBoundingClientRect();
      const thirdRect = thirdSensor.current?.getBoundingClientRect();

      return {
        vh: window.innerHeight,
        scroll: window.scrollY,
        first: {
          top: firstRect ? firstRect.top + window.scrollY : 0, // 뷰포트 기준 위치를 문서 기준으로 변환
          height: firstSensor.current?.offsetHeight ?? 0,
        },
        second: {
          top: secondRect ? secondRect.top + window.scrollY : 0,
          height: secondSensor.current?.offsetHeight ?? 0,
        },
        third: {
          top: thirdRect ? thirdRect.top + window.scrollY : 0,
          height: thirdSensor.current?.offsetHeight ?? 0,
        },
      };
    };
    const scrollTo = (ref: React.RefObject<HTMLElement>, block: ScrollLogicalPosition = "start"): void => {
      ref.current?.scrollIntoView({ behavior: "smooth", block });
    };
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      if (isThrottled) return;
      isThrottled = true;
      setTimeout(() => (isThrottled = false), THROTTLE_TIME);
      const isDown = e.deltaY > 0;
      const p = getPos();
      if (isDown) {
        // 아래로 스크롤
        if (p.scroll >= p.first.top && p.scroll < p.second.top) {
          // first -> sceond
          scrollTo(secondSensor, "start");
        } else if (p.scroll >= p.second.top && p.scroll < p.third.top) {
          // second -> third
          scrollTo(thirdSensor, "start");
        }
      } else {
        // 위로 스크롤
        if (p.scroll >= p.third.top && p.scroll < p.third.top + p.third.height) {
          // third -> second
          scrollTo(secondSensor, "start");
        } else if (p.scroll >= p.second.top && p.scroll < p.second.top + p.second.height) {
          // second -> first
          scrollTo(firstSensor, "start");
        }
      }
    };
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  useMotionValueEvent(scrollProgress, "change", (scroll) => {
    if (scroll <= SCROLL_THRESHOLD.firstToSecond) {
      if (contextRef.current !== "start") {
        contextRef.current = "start";
        setIsScrollDown(false);
        setRotationAngle(0);
      }
    } else if (scroll > SCROLL_THRESHOLD.firstToSecond && scroll <= SCROLL_THRESHOLD.secondToThird) {
      if (contextRef.current !== "middle") {
        setRotationAngle((prev) => {
          setIsScrollDown(contextRef.current === "start");
          return 120;
        });
        contextRef.current = "middle";
      }
    } else if (scroll > SCROLL_THRESHOLD.secondToThird) {
      if (contextRef.current !== "end") {
        contextRef.current = "end";
        setRotationAngle(240);
        setIsScrollDown(true);
      }
    }
  });

  return (
    <div
      ref={containerRef}
      className={`relative w-full  max-w-[100%] min-w-[100%] `}
      style={{
        height: `${SECTION_HEIGHT.first + SECTION_HEIGHT.second + SECTION_HEIGHT.third}vh`,
      }}
    >
      <div
        ref={firstSensor}
        className={`first-section w-[100%]  absolute      `}
        style={{
          height: `${SECTION_HEIGHT.first}vh`,
          minWidth: `${MIN_WIDTH}px`,
        }}
      ></div>
      <div
        ref={secondSensor}
        className={`second-section  w-[100%]   absolute   `}
        style={{
          height: `${SECTION_HEIGHT.second}vh`,
          top: `${SECTION_HEIGHT.first}vh`,
          minWidth: `${MIN_WIDTH}px`,
        }}
      ></div>
      <div
        ref={thirdSensor}
        className={`third-section   w-[100%]  absolute    `}
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

        <CompanyCircle_Desktop
          smallCirclePositions={smallCirclePositions}
          rotationAngle={rotationAngle}
          selectedIndex={selectedIndex}
          isScrollDown={isScrollDown}
        />
      </div>
    </div>
  );
};

const CompanyLongScrollPage_Mobile = () => {
  const container_arr = [0, 1, 2];
  return (
    <div className="Mobile-area w-full relative overflow-hidden mx-auto  ">
      <div className={`px-[18px]`}>
        <motion.div className={`flex h-full`}>
          {container_arr.map((val, idx) => {
            return (
              <motion.div key={`${idx} + ${val}`} className="w-full flex-shrink-0 h-full  ">
                {/* 텍스트 area */}
                <div className={`  `}>
                  <div className={`text-[14px]`}>{`> 0${val + 1}`}</div>
                  <div className={`text-[24px] whitespace-pre-line  font-bold pt-[10px]`}>{titles[val]}</div>
                  <div className={`text-[18px] font-normal pt-[20px]`}>{contents[val]}</div>
                </div>

                <CompanyCircle_Mobile className={`mt-[50px] mx-auto overflow-hidden`} selectedIndex={val} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

const CompanyCircle_Mobile = ({ className, selectedIndex = 0 }) => {
  const smallCirclePositions = [
    {
      x: parseFloat((50 + 40 * Math.cos(-Math.PI / 2)).toFixed(6)),
      y: parseFloat((50 + 40 * Math.sin(-Math.PI / 2)).toFixed(6)),
    },
    {
      x: parseFloat((50 + 40 * Math.cos((5 * Math.PI) / 6)).toFixed(6)),
      y: parseFloat((50 + 40 * Math.sin((5 * Math.PI) / 6)).toFixed(6)),
    },
    {
      x: parseFloat((50 + 40 * Math.cos(Math.PI / 6)).toFixed(6)),
      y: parseFloat((50 + 40 * Math.sin(Math.PI / 6)).toFixed(6)),
    },
  ];
  const rotationAngle = selectedIndex * 120;
  const img_size = " w-[150px] h-[150px] ";
  const img_link =
    selectedIndex === 0
      ? "/img/company_dataProcessing.png"
      : selectedIndex === 1
      ? "/img/company_dataAnalysis.png"
      : "/img/company_dataVisualizing.png";
  const c_color = "#9BBB59";
  return (
    <div className={`relative w-[283px] h-[283px]   ${className}`}>
      <FloatingImage
        img_link={img_link}
        img_size={img_size}
        selectedIndex={selectedIndex}
        isScrollDown={false}
        isMobile={true}
      />
      <motion.svg // 애니메이션 공간 확보
        className="w-[283] h-[283px] absolute "
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

const CompanyText = ({ selectedIndex, isScrollDown, firstRender }) => {
  const text_movement = {
    enter: ({ isScrollDown }: { isScrollDown: boolean }) => ({
      x: "20%",
      y: isScrollDown ? "200%" : "-200%",
      opacity: 1,
      scale: firstRender ? 1 : 1.5,
    }),
    center: {
      x: "0%",
      y: "0%",
      opacity: 1,
      scale: 1,
    },
    exit: ({ isScrollDown }: { isScrollDown: boolean }) => ({
      x: "20%",
      y: isScrollDown ? "-200%" : "200%",
      opacity: 1,
    }),
  };
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/company");
  };
  return (
    <AnimatePresence custom={{ isScrollDown }}>
      <motion.div
        className={`flex-col flex whitespace-pre-line gap-[35px] absolute left-4 `}
        custom={{ isScrollDown }} // 최신 상태값 전달
        variants={text_movement}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        key={selectedIndex}
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

const CompanyCircle_Desktop = ({ rotationAngle, smallCirclePositions, selectedIndex, isScrollDown }) => {
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
const FloatingImage = ({ img_link, img_size, selectedIndex, isScrollDown, isMobile = false }) => {
  const shadow = isMobile
    ? [" h-[70px] w-[140px] rounded-[50%] ", "h-[70px] w-[70px] ", "h-[60px] w-[130px] rounded-[50%]"]
    : [" h-[140px] w-[350px] rounded-[50%] ", "h-[160px] w-[160px] ", "h-[120px] w-[260px] rounded-[50%]"];
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
export default CompanyLongScrollPage;
