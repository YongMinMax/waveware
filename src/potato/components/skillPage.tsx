import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants, useScroll, useTransform } from "framer-motion";
import { style } from "framer-motion/client";
const SkillPage = () => {
  return (
    <div className={`relative  mt-[150px]  mb-[110px]  min-w-full max-w-full`}>
      <IntroText className={`min-w-[1440px]`} />
      <SkillContainer className={`min-w-[1440px]`} />
    </div>
  );
};

const SkillContainer = ({ className }) => {
  // 처음엔 가장 왼쪽의 메타데이터가 열려 있는 상태로
  const [seletedIndex, setSelectedIndex] = useState(0);
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
      <span className={`mt-[390px] text-[#F1EFEE] text-[128px] font-bold leading-[0.9]`}>WAVEWARE</span>
      <div className={` w-[1440px] h-[640px] flex gap-[4px] `}>
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

  return (
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
            <span className={`text-[#FFFFFF] font-medium text-[24px] whitespace-nowrap`}>{content}</span>
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
  );
};

const IntroText = ({ className }) => {
  const introText = `데이터 처리 기술을 통해 미래의 잠재력을 미리 예측하고 혁신을 위한 새로운 가치를 발굴합니다.\n다년간 R&D 사업의 노하우를 통해 데이터 분석으로 의미를 추출합니다.`;
  const [isProgressed, setIsProgressed] = useState(false);
  const progressSensor = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: progressSensor, offset: ["end end", "start start"] });
  const progressBarY = useTransform(scrollYProgress, [0.3, 0.8], [-150, 0]);
  const GREEN = "#3A9100";
  const GRAY = "#D9D9D9";
  return (
    <div className={`container text-center flex flex-col  items-center pt-[40px] ${className} `}>
      <span className={` font-bold text-[60px]`}>
        모든 <span style={{ color: `${GREEN}` }}>데이터</span>에서
      </span>
      <div
        ref={progressSensor}
        className={`relative  w-[5px] h-[150px] overflow-hidden mt-[37px]   `}
        style={{ background: `${GRAY}` }}
      >
        <motion.div
          className={` absolute top-0 left-0 w-full h-full    `}
          style={{ background: `${GREEN}`, y: progressBarY }}
        ></motion.div>
      </div>
      <div className={` whitespace-pre-line mt-[37px]`}>
        <div className={`font-semibold text-xl mb-[11px]`}>
          <span style={{ color: `${GREEN}` }}>WAVEWARE</span>
          <span>는</span>
        </div>
        <span className={`font-medium text-[30px]`}>{introText}</span>
      </div>
    </div>
  );
};

export default SkillPage;
