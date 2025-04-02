import React, { ReactNode, useRef } from "react";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  Variants,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
const SkillPage = () => {
  return (
    <div className={`relative    mb-[300px]  min-w-full max-w-full`}>
      <IntroObj className={`min-w-[1440px]`} />
      {/* <IntroText className={`min-w-[1440px]`} /> */}
      <SkillContainer className={`min-w-[1440px] mt-[390px]`} />
    </div>
  );
};

const SkillContainer = ({ className }) => {
  const [seletedIndex, setSelectedIndex] = useState(1);

  const handleMouseEnter = (idx: number) => {
    setSelectedIndex(idx);
  };
  const skills = [
    {
      img_src: "/img/skill_metadata.jpg",
      img_size: "987.37px 702px",
      title: "메타 데이터",
      content: "효과적인 치매 예방을 위한 데이터 분석",
      keywords: ["의료 데이터", "질병 예측", "Cohort 연구", "ADL", "데이터 분석"],
    },
    {
      img_src: "/img/skill_visulation.jpg",
      img_size: "987px  ",
      title: "시각화",
      content: "재난 재해 피해예측 시각화",
      keywords: ["지도데이터", "수치표고모형(DEM)", "피해금액 예측 모델", "시각화"],
    },
    {
      img_src: "/img/skill_sns.jpg",
      img_size: "987px ",
      title: "분산처리",
      content: "유저 정보 분석을 위한 SNS 수집기",
      keywords: ["빅데이터", "Apache Spark", "분산 시스템", "실시간 데이터 처리", "데이터 적재"],
    },
    {
      img_src: "/img/skill_NLP.jpg",
      img_size: "987px  ",
      title: "NLP",
      content: "국가 과학기술 표준 분류 체계",
      keywords: ["비정형 데이터", "Word2Vec", "임베딩", "KNN 알고리즘", "NLP Parser"],
    },
  ];
  return (
    <div className={` container flex flex-col items-end px-0 ${className}`}>
      <MoveScrollText entryDuration={0.8} entryTiming={0.1} axis="x" className={``}>
        <span className={` text-[#F1EFEE] text-[128px] font-bold leading-[0.9]`}>WAVEWARE</span>
      </MoveScrollText>

      <div className={` w-[1440px] h-[640px] flex gap-[4px] overflow-hidden`}>
        {skills.map((skill, index) => {
          return (
            <SkillBox
              key={index}
              skillInfo={skill}
              isHovered={index === seletedIndex}
              handleMouseEnter={handleMouseEnter}
              idx={index}
            />
          );
        })}
      </div>
    </div>
  );
};

const SkillBox = ({ idx, skillInfo, isHovered, handleMouseEnter }) => {
  const { img_size, img_src, title, content, keywords } = skillInfo;
  const background_CSS = isHovered
    ? `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8))`
    : `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))`;
  // Variants 정의
  const variants: Variants = {
    small: {
      width: "147px",
      height: "630px",
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    large: {
      width: "987px",
      height: "630px",
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };
  const skeleton_CSS = isHovered ? `w-[987px] h-[630px]` : `w-[147px] h-[630px]`;

  const scrollSensor = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollSensor, offset: ["start end", "end start"] });
  const [isAnimated, setIsAnimated] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.1) {
      setIsAnimated(true);
    }
  });

  return (
    <div ref={scrollSensor} className={`relative overflow-hidden rounded-[20px]`}>
      <AnimatePresence initial={false}>
        {!isAnimated && (
          <motion.div
            key={`${idx}-skeleton`}
            className={`${skeleton_CSS} absolute -z-10`}
            style={{ backgroundColor: `#F1EFEE` }}
            exit={{ opacity: 1, y: "-100%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          ></motion.div>
        )}
      </AnimatePresence>
      <motion.div animate={isAnimated ? { y: 0 } : { y: "100%" }} transition={{ ease: "easeOut", duration: 0.8 }}>
        <motion.div
          className={`rounded-[20px] cursor-pointer overflow-hidden`} // overflow 설정
          style={{
            backgroundImage: `${background_CSS},url(${img_src})`,
            backgroundPosition: `center top`,
            backgroundSize: `auto,${img_size}`,
            backgroundRepeat: "no-repeat",
            padding: isHovered ? "352px 0px 100px 100px " : "90px 0px 0px 0px",
          }}
          variants={variants}
          initial="small"
          animate={isHovered ? "large" : "small"}
          onMouseEnter={() => handleMouseEnter(idx)}
        >
          <div className="relative w-full h-full">
            {isHovered ? (
              <div className={`flex flex-col `}>
                <span className={`text-[#FFFFFF] font-bold text-[60px] whitespace-nowrap`}>{title}</span>
                <MoveEnterText>
                  <span className={`text-[#FFFFFF] font-medium text-[24px] whitespace-nowrap`}>{content}</span>
                </MoveEnterText>
                <MoveEnterText>
                  <div className={`mt-[37px] flex gap-[14px] `}>
                    {keywords.map((keyword: string) => (
                      <span
                        key={keyword}
                        className={`text-[#FFFFFF] rounded-[5px] border border-[#FFFFF] text-[16px] font-normal py-[3px] px-[15px] flex-shrink-0 `}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </MoveEnterText>
              </div>
            ) : (
              <div className={`text-[#B2C5CB] font-extrabold text-[32px] text-center`}>
                <motion.div
                  className="rotate-90 origin-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }}
                >
                  {title}
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const IntroText = ({ className }) => {
  const introText1 = `데이터 처리 기술을 통해 미래의 잠재력을 미리 예측하고 혁신을 위한 새로운 가치를 발굴합니다.\n`;
  const introText2 = `다년간 R&D 사업의 노하우를 통해 데이터 분석으로 의미를 추출합니다.`;

  const progressSensor = useRef<HTMLDivElement>(null);
  const [scrollLock, setScrollLock] = useState(false);
  const scrollLockRef = useRef<HTMLDivElement>(null);
  const [progressBar, setProgressBar] = useState(0);
  const { scrollYProgress: progressScroll } = useScroll({ target: progressSensor, offset: ["start end", "end start"] });
  const progressGreenBarY = useSpring(useTransform(progressScroll, [0.2, 0.33], [-150, 0]), {
    stiffness: 1000,
    damping: 100,
  });
  const progressGrayBarY = useSpring(useTransform(progressScroll, [0.0, 0.1], [-150, 0]), {
    stiffness: 1000,
    damping: 100,
  });
  const GREEN = "#3A9100";
  const GRAY = "#D9D9D9";
  const centerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: allDataScroll } = useScroll({ target: centerRef, offset: ["start center", "end center"] });

  return (
    <div className={`container text-center flex flex-col   items-center pt-[40px]   ${className}  `}>
      {/* <span ref={centerRef} className={` font-bold text-[60px]`}>
        모든 <span style={{ color: `${GREEN}` }}>데이터</span>에서
      </span>

      <div
        ref={progressSensor}
        className={`relative  w-[5px] h-[150px] overflow-hidden mt-[37px] mb-[37px]  `}
        style={{ background: `white` }}
      >
        <motion.div
          className={` absolute top-0 left-0 w-full h-full    `}
          style={{ background: `${GRAY}`, y: progressGrayBarY }}
        ></motion.div>
        <motion.div
          className={` absolute top-0 left-0 w-full h-full    `}
          style={{ background: `${GREEN}`, y: progressGreenBarY }}
        ></motion.div>
      </div> */}

      <div className={` whitespace-pre-line  snap-start`}>
        <MoveScrollText entryTiming={0.15}>
          <div className={`font-semibold text-xl mb-[11px]`}>
            <span style={{ color: `${GREEN}` }}>WAVEWARE</span>
            <span>는</span>
          </div>
        </MoveScrollText>
        <MoveScrollText entryTiming={0.15} entryDuration={0.5}>
          <span className={`font-medium text-[30px]`}>{introText1}</span>
        </MoveScrollText>
        <MoveScrollText entryTiming={0.15} entryDuration={0.5}>
          <span className={`font-medium text-[30px]`}>{introText2}</span>
        </MoveScrollText>
      </div>
    </div>
  );
};

const IntroObj = ({ className }) => {
  const introText1 = `데이터 처리 기술을 통해 미래의 잠재력을 미리 예측하고 혁신을 위한 새로운 가치를 발굴합니다.\n`;
  const introText2 = `다년간 R&D 사업의 노하우를 통해 데이터 분석으로 의미를 추출합니다.`;
  const centerRef = useRef<HTMLDivElement>(null);
  const GREEN = "#3A9100";
  const GRAY = "#D9D9D9";
  const scrollSensor = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollSensor, offset: ["start end", "end start"] });
  const [isAnimated, setIsAnimated] = useState(false);
  const [introAnimated, setIntroAnimated] = useState(false);
  const progressSensor = useRef<HTMLDivElement>(null);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.005) {
      setIsAnimated(true);
    } else {
      setIsAnimated(false);
    }
  });

  const { scrollYProgress: progressScroll } = useScroll({ target: progressSensor, offset: ["start end", "end start"] });
  useMotionValueEvent(progressScroll, "change", (latest) => {
    if (latest >= 0.55) {
      setIntroAnimated(true);
    } else {
      setIntroAnimated(false);
    }
  });
  const progressGreenBarY = useSpring(useTransform(progressScroll, [0.3, 0.45], [-150, 0]), {
    stiffness: 1000,
    damping: 100,
  });
  const progressGrayBarY = useSpring(useTransform(progressScroll, [0.1, 0.2], [-150, 0]), {
    stiffness: 1000,
    damping: 100,
  });
  return (
    <div ref={progressSensor} className={` w-full h-[250vh]  relative  ${className} `}>
      <div className={`w-full h-fit sticky  justify-end text-center items-center top-[10%]   `}>
        <div className={`flex flex-col items-center pt-[150px]`}>
          <div ref={scrollSensor} className={`relative overflow-hidden`}>
            <motion.div animate={isAnimated ? { y: 0 } : { y: "100%" }} transition={{ ease: "easeOut", duration: 0.5 }}>
              <span ref={centerRef} className={` font-bold text-[60px]`}>
                모든 <span style={{ color: `${GREEN}` }}>데이터</span>에서
              </span>
            </motion.div>
          </div>
          <div
            className={`relative  w-[5px] h-[150px] overflow-hidden mt-[37px] mb-[37px]  `}
            style={{ background: `white` }}
          >
            <motion.div
              className={` absolute top-0 left-0 w-full h-full    `}
              style={{ background: `${GRAY}`, y: progressGrayBarY }}
            ></motion.div>
            <motion.div
              className={` absolute top-0 left-0 w-full h-full    `}
              style={{ background: `${GREEN}`, y: progressGreenBarY }}
            ></motion.div>
          </div>
          <div className={`relative overflow-hidden`}>
            <motion.div
              animate={introAnimated ? { y: 0 } : { y: "140%" }}
              transition={{ ease: "easeOut", duration: 0.5 }}
            >
              <div className={`font-semibold text-xl mb-[11px]`}>
                <span style={{ color: `${GREEN}` }}>WAVEWARE</span>
                <span>는</span>
              </div>
            </motion.div>
          </div>
          <div className={`relative overflow-hidden`}>
            <motion.div
              animate={introAnimated ? { y: 0 } : { y: "100%" }}
              transition={{ ease: "easeOut", duration: 0.5 }}
            >
              <span className={`font-medium text-[30px]`}>{introText1}</span>
            </motion.div>
          </div>

          <div className={`relative overflow-hidden`}>
            <motion.div
              animate={introAnimated ? { y: 0 } : { y: "100%" }}
              transition={{ ease: "easeOut", duration: 0.5 }}
            >
              <span className={`font-medium text-[30px]`}>{introText2}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MoveEnterText = ({ children, duration = 0.5, delay = 0.2 }) => {
  return (
    <div className={`relative overflow-hidden `}>
      <motion.div
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ ease: "easeOut", duration: duration, delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const MoveScrollText = ({
  children,
  entryTiming = 0.01,
  entryDuration = 0.8,
  axis = "y",
  className = "",
  enterFunction = () => {},
  exitFunction = () => {},
}: {
  children: ReactNode;
  entryTiming?: number;
  entryDuration?: number;
  axis?: "x" | "y";
  className?: string;
  enterFunction?: () => void;
  exitFunction?: () => void;
  sensor?: HTMLDivElement | null;
}) => {
  const scrollSensor = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollSensor, offset: ["end end", "end start"] });
  const [isAnimated, setIsAnimated] = useState(false);
  const onAnimate = axis === "y" ? { y: 0 } : { x: 0 };
  const notAnimate = axis === "y" ? { y: 100 } : { x: "100%" };
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= entryTiming) {
      setIsAnimated(true);
      enterFunction();
    } else {
      setIsAnimated(false);
      exitFunction();
    }
  });
  return (
    <div ref={scrollSensor} className={`relative overflow-hidden ${className}`}>
      <motion.div
        animate={isAnimated ? onAnimate : notAnimate}
        transition={{ ease: "easeOut", duration: entryDuration }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SkillPage;
