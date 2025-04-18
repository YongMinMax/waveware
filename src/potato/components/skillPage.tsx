import React, { ReactNode, useRef } from "react";
import { useEffect, useState } from "react";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { MdPlayCircle, MdPauseCircle } from "react-icons/md";
import { MdPlayArrow, MdPause } from "react-icons/md";
import {
  motion,
  AnimatePresence,
  Variants,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
  Variant,
  VariantLabels,
} from "framer-motion";
import { Modal_with_Portal } from "./Portal";

// 소개 글귀 최상단 컴포넌트
export const SkillIntroPage = () => {
  return (
    <div className={`relative       min-w-full max-w-full`}>
      <IntroObj className={`min-w-[1440px]  `} />
    </div>
  );
};

// 기술 카드 최상단 컴포넌트
const SkillPage = () => {
  return (
    <div className={`relative    min-w-full max-w-full `}>
      <SkillContainer className={`min-w-[1440px] mt-[100px]`} handleScrollLock={() => {}} />
    </div>
  );
};

const SkillTogglePage_Desktop = React.memo(
  ({
    handleScrollLock,
  }: {
    handleScrollLock: { isScrollLock: boolean; setIsScrollLock: React.Dispatch<React.SetStateAction<boolean>> };
  }) => {
    const { isScrollLock, setIsScrollLock } = handleScrollLock;
    const [firstRender, setFirstRender] = useState(false);
    const stateRef = useRef<"intro" | "content" | null>("intro");
    const scrollRef = useRef(null);
    const [isToggled, setIsToggled] = useState(false);
    const [isIntroAnimated, setIsIntroAnimated] = useState(false);
    const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start end", "end start"] });

    const firstSensor = useRef<HTMLDivElement>(null);
    const secondSensor = useRef<HTMLDivElement>(null);

    // 이미지 미리 로드
    useEffect(() => {
      const imageUrls = [skills[0].img_src, skills[1].img_src, skills[2].img_src, skills[3].img_src];
      preloadImages(imageUrls).then(() => {
        console.log("이미지 다 불러옴");
      });
    }, []);

    useMotionValueEvent(scrollYProgress, "change", (scroll) => {
      if (scroll >= 0.5) {
        if (stateRef.current !== "content") {
          stateRef.current = "content";
          setIsToggled(true);
        }
      } else {
        if (stateRef.current !== "intro") {
          stateRef.current = "intro";
          setIsToggled(false);
        }
      }
      if (scroll > 0.1 && scroll <= 0.4) {
        setIsIntroAnimated(true);
        if (!firstRender) {
          setFirstRender(true);
          setIsScrollLock(true);
          setTimeout(() => {
            setIsScrollLock(false);
          }, 1200);
        }
      } else if (scroll < 0.1) {
        setIsIntroAnimated(false);
      }
    });

    // 섹션 스크롤링
    useEffect(() => {
      let isThrottled = false;
      const THROTTLE_TIME = 500;
      const THRESHOLD = 10; // 섹션 감지를 위한 픽셀 임계값
      const getPos = () => {
        const firstRect = firstSensor.current?.getBoundingClientRect();
        const secondRect = secondSensor.current?.getBoundingClientRect();

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
        };
      };
      const scrollTo = (ref: React.RefObject<HTMLElement>, block: ScrollLogicalPosition = "start"): void => {
        ref.current?.scrollIntoView({ behavior: "smooth", block });
      };
      const handleScroll = (e: WheelEvent) => {
        e.preventDefault();
        if (isScrollLock) return;
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
          }
        } else {
          // 위로 스크롤
          if (p.scroll >= p.second.top && p.scroll < p.second.top + p.second.height) {
            // second -> first
            scrollTo(firstSensor, "start");
          }
        }
      };
      window.addEventListener("wheel", handleScroll, { passive: false });
      return () => window.removeEventListener("wheel", handleScroll);
    }, [isScrollLock]);

    return (
      <section ref={scrollRef} className={`relative   h-[200vh]     min-w-full max-w-full `}>
        <div ref={firstSensor} className={`firstSection w-full h-[100vh] absolute  `}>
          {" "}
        </div>
        <div ref={secondSensor} className={`secondSection top-[100vh] w-full h-[100vh] absolute `}>
          {" "}
        </div>

        <div className={`sticky top-0 w-full h-screen  `}>
          <motion.div
            key={`skillContainer`}
            style={{ willChange: "scale, opacity" }}
            // initial={{ opacity: 0, scale: 0.7 }}
            // initial={false}
            // animate={{ opacity: 1, scale: 1, transition: { ease: "easeOut", duration: 0.4 } }} // 나타날 때 상태
            animate={{
              opacity: isToggled ? [0, 1] : [1, 0],
              scale: isToggled ? [0.7, 1] : [1, 0.7],
              transition: { ease: "easeOut", duration: 0.4 },
            }}
            // exit={{ opacity: 0, scale: 0.7 }}
            className={`absolute w-full h-full `}
            transition={{ ease: "easeOut", duration: 0.15 }}
          >
            <SkillContainer className={`min-w-[1440px] h-screen pt-[100px] `} handleScrollLock={setIsScrollLock} />
          </motion.div>
          <AnimatePresence initial={true} mode="popLayout">
            {isToggled ? (
              <></>
            ) : (
              <motion.div
                key={`SkillIntro`}
                animate={{ opacity: 1, scale: 1 }} // 나타날 때 상태
                exit={{ opacity: 0, scale: 0.8 }} // 사라질 때 상태
                transition={{ ease: "easeOut", duration: 0.15 }}
                className={`z-30`}
              >
                <IntroObj className={`min-w-[1440px]  `} isAnimated={isIntroAnimated} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    );
  }
);
const SkillTogglePage_Mobile = () => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start end", "end start"] });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 스크롤에 따른 이벤트
    if (latest > 0.18) {
      setIsIntroAnimate(true);
    } else {
      setIsIntroAnimate(false);
    }
    if (latest > 0.2) {
      setIsImageAnimate(true);
    } else {
      setIsImageAnimate(false);
    }
  });
  // 여기 추가해야 함
  const handleScrollLock = () => {};
  const [isIntroAnimate, setIsIntroAnimate] = useState(false);
  const [isImageAnimate, setIsImageAnimate] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <div className={` min-w-[375px] flex flex-col items-center mt-[75px] `}>
      <Modal_with_Portal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedIndex={selectedIndex}
        handleScrollLock={handleScrollLock}
      ></Modal_with_Portal>
      {/* 텍스트 구간 */}
      <motion.div
        className={` whitespace-pre-line pb-[40px]`}
        animate={{ y: isIntroAnimate ? 0 : "50%", opacity: isIntroAnimate ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className={`text-[36px] text-center`}>
          모든
          <span className={`text-[#3A9100]`}>{` 데이터`}</span>에서
        </div>
        <div className="text-center pt-[10px]">
          <span className={`text-[#3A9100]`}>waveware</span>
          {`는 데이터 처리 기술을 통해 미래의 잠재력을\n미리 예측하고 혁신을 위한 새로운 가치를 발굴합니다`}
        </div>
      </motion.div>
      {/* 이미지 구간 */}
      <motion.div
        className={` flex flex-col gap-[2px]`}
        animate={{ y: isImageAnimate ? 0 : "15%", opacity: isImageAnimate ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {skills.map((skill, idx) => {
          return (
            <SkillBox_Mobile
              key={`${idx}-${skill.title}`}
              skill={skill}
              handleIndex={{ selectedIndex, setSelectedIndex }}
              idx={idx}
              handleClick={openModal}
            />
          );
        })}
      </motion.div>
    </div>
  );
};
export const SkillTogglePage = ({ handleScrollLock }) => {
  return (
    <>
      <div className={`flex md:hidden min-h-screen items-center justify-center`}>
        <SkillTogglePage_Mobile />
      </div>
      <div className={`hidden md:block`}>
        <SkillTogglePage_Desktop handleScrollLock={handleScrollLock} />
      </div>
    </>
  );
};

const SkillContainer = ({ className, handleScrollLock }) => {
  const [seletedIndex, setSelectedIndex] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleMouseEnter = (idx: number) => {
    setSelectedIndex(idx);
  };

  return (
    <div className={` container flex flex-col items-end px-0 ${className}`}>
      <div className={`overflow-hidden relative`}>
        <motion.div
          initial={{ x: "100%" }}
          // initial={false}
          animate={{ x: 0 }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 0.4 }}
        >
          <span className={` text-[#F1EFEE] text-[128px] font-bold leading-[0.9]`}>WAVEWARE</span>
        </motion.div>
      </div>
      <Modal_with_Portal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedIndex={seletedIndex}
        handleScrollLock={handleScrollLock}
      ></Modal_with_Portal>
      <div className={` w-[1440px] h-[640px] flex gap-[4px] overflow-hidden`}>
        {skills.map((skill, index) => {
          return (
            <SkillBox_Desktop
              key={index}
              skillInfo={skill}
              isHovered={index === seletedIndex}
              handleMouseEnter={handleMouseEnter}
              idx={index}
              handleClick={() => {
                openModal();
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const SkillBox_Desktop = ({ idx, skillInfo, isHovered, handleMouseEnter, handleClick }) => {
  const { img_size, img_src, title, content, keywords } = skillInfo;
  const background_CSS = isHovered
    ? `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8))`
    : `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))`;
  // Variants 정의
  const variants: Variants = {
    small: {
      width: "147px",
      height: "630px",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    large: {
      width: "987px",
      height: "630px",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };
  const skeleton_CSS = isHovered ? `w-[987px] h-[630px]` : `w-[147px] h-[630px]`;

  return (
    <div className={`relative overflow-hidden rounded-[5px]`} onClick={handleClick}>
      <motion.div
        className={`rounded-[5px]  cursor-pointer overflow-hidden`} // overflow 설정
        style={{
          backgroundImage: `${background_CSS},url(${img_src})`,
          backgroundPosition: `center top`,
          backgroundSize: `auto,${img_size}`,
          willChange: "transform, opacity",
          backgroundRepeat: "no-repeat",
          padding: isHovered ? "352px 0px 100px 100px " : "90px 0px 0px 0px",
        }}
        initial={false}
        variants={variants}
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
    </div>
  );
};
const SkillBox_Mobile = ({ skill, handleIndex, idx, handleClick }) => {
  const { img_src, img_size, title, content, keywords } = skill;
  const { selectedIndex, setSelectedIndex } = handleIndex;
  const variants = {
    small: { height: "115px", transition: { duration: 0.5, ease: "easeInOut" } },
    large: { height: "240px", transition: { duration: 0.5, ease: "easeInOut" } },
  };
  const handleCompoClick = () => {
    // 선택된 상황에서 또 선택 => 모달 오픈
    if (selectedIndex === idx) {
      handleClick();
    } else {
      // 미선택된 상황에서 선택 => 열리기
      setSelectedIndex(idx);
    }
  };
  return (
    <motion.div
      className={` w-screen    relative overflow-hidden`}
      onClick={handleCompoClick}
      variants={variants}
      animate={selectedIndex === idx ? "large" : "small"}
      initial={false}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      layout
    >
      <img
        src={img_src}
        alt={`background image`}
        className={` absolute top-1/2 transform -translate-y-1/2 left-0 -z-10 ${img_size} `}
        style={{}}
      />
      {/* 텍스트 */}
      {selectedIndex === idx ? (
        // 선택시
        <div className="text-white pb-[21px] px-[30px] flex flex-col justify-end h-full   backdrop-blur-[1px] bg-black/50  ">
          <motion.div
            className=" font-bold text-[40px] "
            initial={{ scale: 0.7 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {title}
          </motion.div>
          <MoveEnterText className="mt-[10px]" duration={0.3}>
            <div className=" font-medium text-[16px]">{content}</div>
          </MoveEnterText>
          {/* 키워드 */}
          <MoveEnterText className="mt-[10px]" duration={0.3}>
            <div className="flex gap-x-[15px] gap-y-[8px] flex-wrap">
              {keywords.map((keyword: string, idx: number) => {
                return (
                  <div
                    key={`${keyword}+${idx}`}
                    className={`rounded-[5px] border border-[#FFFFF] text-[12px] font-normal py-[3px] px-[8px] flex-shrink-0  `}
                  >
                    {keyword}
                  </div>
                );
              })}
            </div>
          </MoveEnterText>
        </div>
      ) : (
        // 미 선택 시
        <motion.div
          className="h-full flex items-center text-white font-bold text-[24px] pl-[20px]  backdrop-blur-[1px] bg-black/50 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        >
          {title}
        </motion.div>
      )}
    </motion.div>
  );
};

const IntroObj = ({ className, isAnimated = false }) => {
  const introText1 = `데이터 처리 기술을 통해 미래의 잠재력을 미리 예측하고 혁신을 위한 새로운 가치를 발굴합니다.\n`;
  const introText2 = `다년간 R&D 사업의 노하우를 통해 데이터 분석으로 의미를 추출합니다.`;
  const GREEN = "#3A9100";
  const GRAY = "#D9D9D9";
  const IntroAnimationDelay = {
    "모든 데이터에서": { duration: 0.6, delay: 0.0 },
    회색바: { duration: 0.25, delay: 0.32 },
    녹색바: { duration: 0.25, delay: 0.1 },
    설명: { duration: 0.25, delay: -0.2 },
  };
  // 등장 애니메이션의 duration과 delay기반으로 idx의 delay값 리턴
  const getCurrentDelay = (idx: string) => {
    let resultDelay = 0;

    if (idx === "모든 데이터에서" || idx === "회색바") {
      return IntroAnimationDelay[idx].delay;
    }
    resultDelay =
      resultDelay +
      IntroAnimationDelay["녹색바"].delay +
      Math.max(
        IntroAnimationDelay["모든 데이터에서"].delay + IntroAnimationDelay["모든 데이터에서"].duration,
        IntroAnimationDelay["회색바"].delay + IntroAnimationDelay["회색바"].duration
      );

    if (idx === "녹색바") {
      return resultDelay;
    }
    resultDelay = resultDelay + IntroAnimationDelay["설명"].delay + IntroAnimationDelay["설명"].duration;
    if (idx === "설명") {
      return resultDelay;
    }
  };

  return (
    <div className={` w-full h-[100vh]  relative  ${className} `}>
      <div className={`w-full h-fit  justify-end text-center items-center top-[10%]   `}>
        <div className={`flex flex-col items-center pt-[260px]`}>
          <div className={`relative overflow-hidden  `}>
            <motion.div
              initial={{ y: "100%" }}
              animate={isAnimated ? { y: 0 } : { y: "100%" }}
              transition={{
                ease: [0.68, -0.55, 0.265, 1.55],
                duration: IntroAnimationDelay["모든 데이터에서"].duration,
                delay: isAnimated ? getCurrentDelay("모든 데이터에서") : 0,
              }}
            >
              <span className={` font-bold text-[60px]`}>
                모든 <span style={{ color: `${GREEN}` }}>데이터</span>에서
              </span>
            </motion.div>
          </div>
          <div className={`relative  w-[5px] h-[150px] overflow-hidden mt-[37px] mb-[37px]  `}>
            <motion.div
              className={` absolute top-0 left-0 w-full h-full    `}
              style={{ background: `${GRAY}` }}
              initial={{ y: "-100%" }}
              animate={isAnimated ? { y: 0 } : { y: "-100%" }}
              transition={{
                ease: "easeOut",
                duration: IntroAnimationDelay["회색바"].duration,
                delay: isAnimated ? getCurrentDelay("회색바") : 0,
              }}
            ></motion.div>
            <motion.div
              initial={{ y: "-100%" }}
              className={` absolute top-0 left-0 w-full h-full    `}
              style={{ background: `${GREEN}` }}
              animate={isAnimated ? { y: 0 } : { y: "-100%" }}
              transition={{
                ease: "easeOut",
                duration: IntroAnimationDelay["녹색바"].duration,
                delay: isAnimated ? getCurrentDelay("녹색바") : 0,
              }}
            ></motion.div>
          </div>
          <div className={`relative overflow-hidden`}>
            <motion.div
              initial={{ y: "140%" }}
              animate={isAnimated ? { y: 0 } : { y: "140%" }}
              transition={{
                ease: [0.68, -0.55, 0.265, 1.55],
                duration: IntroAnimationDelay["설명"].duration,
                delay: isAnimated ? getCurrentDelay("설명") : 0,
              }}
            >
              <div className={`font-semibold text-xl mb-[11px]`}>
                <span style={{ color: `${GREEN}` }}>WAVEWARE</span>
                <span>는</span>
              </div>
            </motion.div>
          </div>
          <div className={`relative overflow-hidden`}>
            <motion.div
              initial={{ y: "100%" }}
              animate={isAnimated ? { y: 0 } : { y: "100%" }}
              transition={{
                ease: [0.68, -0.55, 0.265, 1.55],
                duration: IntroAnimationDelay["설명"].duration,
                delay: isAnimated ? getCurrentDelay("설명") : 0,
              }}
            >
              <span className={`font-medium text-[30px]`}>{introText1}</span>
            </motion.div>
          </div>

          <div className={`relative overflow-hidden`}>
            <motion.div
              initial={{ y: "100%" }}
              animate={isAnimated ? { y: 0 } : { y: "100%" }}
              transition={{
                ease: [0.68, -0.55, 0.265, 1.55],
                duration: IntroAnimationDelay["설명"].duration,
                delay: isAnimated ? getCurrentDelay("설명") : 0,
              }}
            >
              <span className={`font-medium text-[30px]`}>{introText2}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MoveEnterText = ({ children, duration = 0.5, delay = 0.2, className = `` }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
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
        initial={false}
        animate={isAnimated ? onAnimate : notAnimate}
        transition={{ ease: "easeOut", duration: entryDuration }}
      >
        {children}
      </motion.div>
    </div>
  );
};
// const Modal = ({
//   isOpen,
//   onClose,
//   selectedIndex,
//   handleScrollLock,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   selectedIndex: number;
//   handleScrollLock: React.Dispatch<React.SetStateAction<boolean>>;
// }) => {
//   const video_link = [
//     `/videos/skill_metadata.mp4`,
//     `/videos/skill_visulation.mp4`,
//     `/videos/skill_dc.mp4`,
//     `/videos/skill_nlp.mp4`,
//   ];
//   const video_subTitle = ["메타데이터", "시각화", "분산처리", "NLP"];
//   const video_title = [
//     "치매 연구를 위한 데이터 분석",
//     "재난재해 피해예측 시각화",
//     "SNS 수집기",
//     "국가 과학기술 표준분류체계",
//   ];
//   const video_description = [
//     "의료 데이터는 사람의 건강과 직결되어 있기 때문에 데이터가 가지는 특징이 매우 중요합니다. 또한 질병 예측 및 치료 방법 개발에 활용할 수 있기에 의료 데이터의 중요성은 더욱 부각되고 있습니다.\n\n일상생활 수행능력 측정 환경 구축 및 뇌파, ADL, 건강검진 등의 데이터를 분석하고 다년간 구축된 Cohort연구를 통해 치매 초기 증상을 예측하는 모델을 개발하였습니다.",
//     "지형 및 지도 데이터는 도시계획 및 재난재해 대응에 이르기까지 광범위한 분야에서 사용되는 중요한 유형의 데이터로 시각화 했을때 더욱 의미가 있습니다.\n\n수치표고모형(DEM) 데이터의 고도 및 침수심을 통해 피해영역을 가시화하고 재난이력 데이터로 재난 취약도를 계산해 재난운영 피해금액 예측 모델을 구축 및 시각화하였습니다.",
//     "실시간 대용량 처리를 위해서는 데이터를 수집하고 저장하는 데이터베이스와 함께 실시간으로 데이터를 처리하고 분석할 수 있는 소프트웨어가 필요합니다. 이를 위해 분산 시스템을 이용하여 데이터 처리 작업을 분산하고, 병목현상을 방지하여 성능을 향상시킵니다.\n\n하루에 약 500만건이 생성되는 SNS 데이터를 수집하여 처리하기 위해 Apache Spark를 활용해 실시간으로 처리하였으며, 위도,경도와 유저 정보를 통해 국가별, 유저별로 특징을 파악해 분류 후 적재하여 시각화합니다.",
//     "비정형 데이터는 구조화되지 않은 데이터로 처리 및 분석이 어렵고 데이터의 패턴이나 추세를 파악하기도 어렵습니다. 하지만 비정형 데이터는 많은 양의 정보를 포함하고 있으며 이를 분석해 새로운 가치를 발견할 수 있습니다.\n\n과제 및 논문 데이터를 NLP Parser를 통해 문장을 구조화 하고 Word2Vec 알고리즘으로 임베딩하여 Z-score 및 knn 알고리즘을 통해 분류하는 모델을 개발하였습니다.",
//   ];

//   useEffect(() => {
//     if (isOpen) {
//       // 스크롤 막기
//       handleScrollLock(true);
//       document.body.style.overflow = "hidden";
//       document.body.style.height = "100%";
//     } else {
//       // 스크롤 해제
//       document.body.style.overflow = "auto";
//       document.body.style.height = "auto";
//       handleScrollLock(false);
//     }

//     return () => {
//       // 컴포넌트 언마운트 시 복구
//       document.body.style.overflow = "auto";
//       document.body.style.height = "auto";
//       handleScrollLock(false);
//     };
//   }, [isOpen]);
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70  gap-[50px]`}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose}
//         >
//           <motion.div
//             className="bg-white rounded-lg shadow-lg  w-[1530px] h-[800px] max-w-full relative flex"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             onClick={(e) => {
//               e.stopPropagation();
//             }}
//           >
//             <CustomVideoPlayer src={`${video_link[selectedIndex]}`} />
//             <button className="absolute top-4 right-4 text-white hover:text-gray-500 text-[22px]  " onClick={onClose}>
//               ✕
//             </button>
//             <div
//               className={`whitespace-pre-line w-[350px]  px-[25px] pt-[60px] border-l-[3px] bg-[#191919] text-white border-black`}
//             >
//               <div className={` text-[18px] font-semibold  text-[#3A9100] `}>{video_subTitle[selectedIndex]}</div>
//               <div className={` w-fit text-[26px] font-bold mt-[15px]  `}>
//                 {video_title[selectedIndex]}
//                 <motion.div className={`w-full  h-[4px] bg-white mt-[8px]`}></motion.div>
//               </div>

//               <div className={` text-[16px] font-light mt-[20px]`}>{video_description[selectedIndex]}</div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };
export const CustomVideoPlayer = ({ src, isMobile = false }: { src: string; isMobile: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true); // 아이콘 표시 여부
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const width = isMobile ? ` w-full ` : ` w-[1180px] `;

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (isPlaying) {
      // 이전 타이머를 제거하고 새 타이머 설정
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
      hideControlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 500); // 2초 동안 마우스가 움직이지 않으면 숨김
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false); // 동영상이 끝나면 재생 상태를 false로 설정
    setShowControls(true); // 재생 아이콘 표시
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnd);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, []);

  return (
    <>
      {isMobile ? (
        // 모바일 비디오
        <div className={` ${width}  h-full    group rounded-l-lg flex items-center justify-center  `}>
          <video
            ref={videoRef}
            className={`  h-auto cursor-pointer`}
            controls
            playsInline
            src={src}
            controlsList="nofullscreen"
            onClick={handleVideoClick}
          />
        </div>
      ) : (
        // 데스크탑 비디오
        <div className={` ${width}  h-full bg-black   group  flex items-center justify-center  `}>
          <video
            ref={videoRef}
            className={`  h-full cursor-pointer`}
            onCanPlay={() => {
              videoRef.current?.play();
            }}
            controls
            muted
            playsInline
            src={src}
            controlsList="nofullscreen"
            onClick={handleVideoClick}
          />
        </div>
      )}
      {/* {!isMobile ? (
        <></>
      ) : (
        <motion.div
          className={`relative ${width} h-full bg-black cursor-pointer group rounded-l-lg  `}
          onClick={handleVideoClick}
          onMouseMove={handleMouseMove} // 마우스 움직임 감지
        >
          <video ref={videoRef} className="w-full h-full object-cover rounded-l-lg" src={src}></video>
          {(!isPlaying || showControls) && ( // 아이콘 표시 여부에 따라 렌더링
            <div className="absolute inset-0 flex items-center  justify-center">
              <div className="flex items-center justify-center w-20 h-20 bg-black rounded-full">
                {isPlaying ? (
                  <MdPause className="text-white text-4xl" />
                ) : (
                  <MdPlayArrow className="text-white text-4xl" />
                )}
              </div>
            </div>
          )}
        </motion.div>
      )} */}
    </>
  );
};

const preloadImages = (imageUrls: string[]) => {
  return Promise.all(
    imageUrls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
        img.onerror = () => reject();
      });
    })
  );
};

const skills = [
  {
    img_src: "/img/skill/metadata.jpg",
    img_size: "987.37px 702px",
    title: "메타 데이터",
    content: "지능형 정보처리를 위한 메타데이터 처리 방식",
    keywords: ["의료 데이터", "질병 예측", "Cohort 연구", "ADL", "Pubmed"],
  },
  {
    img_src: "/img/skill/visualization.jpg",
    img_size: "987px  ",
    title: "시각화",
    content: "데이터 해석과 의사결정을 지원하는 시각화 기술",
    keywords: ["지도데이터", "수치표고모형(DEM)", "피해금액 예측 모델", "금융 데이터", "국제 무역 정보"],
  },
  {
    img_src: "/img/skill/sns.jpg",
    img_size: "987px ",
    title: "분산처리",
    content: "고속 데이터 작업와 실시간 분석을 위한 분산처리 환경 구축",
    keywords: ["빅데이터", "Apache Spark", "분산 시스템", "GridFTP", "DTN"],
  },
  {
    img_src: "/img/skill/NLP.jpg",
    img_size: "987px  ",
    title: "NLP",
    content: "텍스트 기반 정보 활용을 위한 자연어처리 파이프라인 설계",
    keywords: ["비정형 데이터", "LLM", "Word2Vec", "임베딩", "KNN 알고리즘", "NLP Parser", "RAG"],
  },
];

export const useIsMobile = (breakpoint = 768) => {
  const getIsMobile = () => typeof window !== "undefined" && window.innerWidth < breakpoint;

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

export default SkillPage;
