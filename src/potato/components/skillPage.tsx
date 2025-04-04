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
} from "framer-motion";
export const SkillIntroPage = () => {
  return (
    <div className={`relative    mb-[200px]  min-w-full max-w-full`}>
      <IntroObj className={`min-w-[1440px]`} />
    </div>
  );
};
const SkillPage = () => {
  return (
    <div className={`relative    min-w-full max-w-full`}>
      <SkillContainer className={`min-w-[1440px] mt-[100px]`} />
    </div>
  );
};

const SkillContainer = ({ className }) => {
  const [seletedIndex, setSelectedIndex] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

      <Modal isOpen={isModalOpen} onClose={closeModal} selectedIndex={seletedIndex}></Modal>
      <div className={` w-[1440px] h-[640px] flex gap-[4px] overflow-hidden`}>
        {skills.map((skill, index) => {
          return (
            <SkillBox
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

const SkillBox = ({ idx, skillInfo, isHovered, handleMouseEnter, handleClick }) => {
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
    <div ref={scrollSensor} className={`relative overflow-hidden rounded-[5px]`} onClick={handleClick}>
      <AnimatePresence initial={false}>
        {!isAnimated && (
          <motion.div
            key={`${idx}-skeleton`}
            className={`${skeleton_CSS} absolute -z-10`}
            style={{ backgroundColor: `#F1EFEE` }}
            exit={{ opacity: 1, y: "-100%" }}
            transition={{ duration: 10.5, ease: "easeOut" }}
          ></motion.div>
        )}
      </AnimatePresence>
      <motion.div animate={isAnimated ? { y: 0 } : { y: "100%" }} transition={{ ease: "easeOut", duration: 0.8 }}>
        <motion.div
          className={`rounded-[5px]  cursor-pointer overflow-hidden`} // overflow 설정
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
const Modal = ({ isOpen, onClose, selectedIndex }: { isOpen: boolean; onClose: () => void; selectedIndex: number }) => {
  const video_link = [
    `/videos/skill_metadata.mp4`,
    `/videos/skill_visulation.mp4`,
    `/videos/skill_dc.mp4`,
    `/videos/skill_nlp.mp4`,
  ];
  const video_subTitle = ["메타데이터", "시각화", "분산처리", "NLP"];
  const video_title = [
    "치매 연구를 위한 데이터 분석",
    "재난재해 피해예측 시각화",
    "SNS 수집기",
    "국가 과학기술 표준분류체계",
  ];
  const video_description = [
    "의료 데이터는 사람의 건강과 직결되어 있기 때문에 데이터가 가지는 특징이 매우 중요합니다. 또한 질병 예측 및 치료 방법 개발에 활용할 수 있기에 의료 데이터의 중요성은 더욱 부각되고 있습니다.\n\n일상생활 수행능력 측정 환경 구축 및 뇌파, ADL, 건강검진 등의 데이터를 분석하고 다년간 구축된 Cohort연구를 통해 치매 초기 증상을 예측하는 모델을 개발하였습니다.",
    "지형 및 지도 데이터는 도시계획 및 재난재해 대응에 이르기까지 광범위한 분야에서 사용되는 중요한 유형의 데이터로 시각화 했을때 더욱 의미가 있습니다.\n\n수치표고모형(DEM) 데이터의 고도 및 침수심을 통해 피해영역을 가시화하고 재난이력 데이터로 재난 취약도를 계산해 재난운영 피해금액 예측 모델을 구축 및 시각화하였습니다.",
    "실시간 대용량 처리를 위해서는 데이터를 수집하고 저장하는 데이터베이스와 함께 실시간으로 데이터를 처리하고 분석할 수 있는 소프트웨어가 필요합니다. 이를 위해 분산 시스템을 이용하여 데이터 처리 작업을 분산하고, 병목현상을 방지하여 성능을 향상시킵니다.\n\n하루에 약 500만건이 생성되는 SNS 데이터를 수집하여 처리하기 위해 Apache Spark를 활용해 실시간으로 처리하였으며, 위도,경도와 유저 정보를 통해 국가별, 유저별로 특징을 파악해 분류 후 적재하여 시각화합니다.",
    "비정형 데이터는 구조화되지 않은 데이터로 처리 및 분석이 어렵고 데이터의 패턴이나 추세를 파악하기도 어렵습니다. 하지만 비정형 데이터는 많은 양의 정보를 포함하고 있으며 이를 분석해 새로운 가치를 발견할 수 있습니다.\n\n과제 및 논문 데이터를 NLP Parser를 통해 문장을 구조화 하고 Word2Vec 알고리즘으로 임베딩하여 Z-score 및 knn 알고리즘을 통해 분류하는 모델을 개발하였습니다.",
  ];

  useEffect(() => {
    if (isOpen) {
      // 스크롤 막기
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    } else {
      // 스크롤 해제
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }

    return () => {
      // 컴포넌트 언마운트 시 복구
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    };
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70  gap-[50px]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg  w-[1530px] h-[800px] max-w-full relative flex"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <CustomVideoPlayer src={`${video_link[selectedIndex]}`} />
            <button className="absolute top-4 right-4 text-white hover:text-gray-500 text-[22px]  " onClick={onClose}>
              ✕
            </button>
            <div
              className={`whitespace-pre-line w-[350px]  px-[25px] pt-[60px] border-l-[3px] bg-[#191919] text-white border-black`}
            >
              <div className={` text-[18px] font-semibold  text-[#3A9100] `}>{video_subTitle[selectedIndex]}</div>
              <div className={` w-fit text-[26px] font-bold mt-[15px]  `}>
                {video_title[selectedIndex]}
                <motion.div className={`w-full  h-[4px] bg-white mt-[8px]`}></motion.div>
              </div>

              <div className={` text-[16px] font-light mt-[20px]`}>{video_description[selectedIndex]}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
const CustomVideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true); // 아이콘 표시 여부
  const hideControlsTimeout = useRef<number | null>(null);

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
    <motion.div
      className={`relative w-[1180px] h-full bg-black cursor-pointer group rounded-l-lg  `}
      onClick={handleVideoClick}
      onMouseMove={handleMouseMove} // 마우스 움직임 감지
    >
      <video ref={videoRef} className="w-full h-full object-cover rounded-l-lg" src={src}></video>
      {(!isPlaying || showControls) && ( // 아이콘 표시 여부에 따라 렌더링
        <div className="absolute inset-0 flex items-center  justify-center">
          <div className="flex items-center justify-center w-20 h-20 bg-black rounded-full">
            {isPlaying ? <MdPause className="text-white text-4xl" /> : <MdPlayArrow className="text-white text-4xl" />}
          </div>
        </div>
      )}
    </motion.div>
  );
};
export default SkillPage;
