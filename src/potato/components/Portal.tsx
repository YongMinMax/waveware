// components/Portal.tsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CustomVideoPlayer } from "./skillPage";

type Props = {
  children: React.ReactNode;
};

export default function Portal({ children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const portalRoot = document.getElementById("portal-root");
  return portalRoot ? createPortal(children, portalRoot) : null;
}
export const Modal_with_Portal = ({
  isOpen,
  onClose,
  selectedIndex,
  handleScrollLock,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedIndex: number;
  handleScrollLock: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (isOpen) {
      // 스크롤 막기
      handleScrollLock(true);
    } else {
      // 스크롤 해제
      handleScrollLock(false);
    }

    return () => {
      // 컴포넌트 언마운트 시 복구
      handleScrollLock(false);
    };
  }, [isOpen]);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const portalRoot = document.getElementById("__next");
  if (!portalRoot) return null;
  if (typeof window === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="hidden md:block">
            <Modal_Desktop
              selectedIndex={selectedIndex}
              onClose={onClose}
              videoInfo={{ video_title, video_link, video_description, video_subTitle }}
            />
          </div>
          <div className="block md:hidden">
            <Modal_Mobile
              selectedIndex={selectedIndex}
              onClose={onClose}
              videoInfo={{ video_title, video_link, video_description, video_subTitle }}
            />
          </div>
        </>
      )}
    </AnimatePresence>,
    portalRoot
  );
};
const Modal_Desktop = ({ selectedIndex, onClose, videoInfo }) => {
  const { video_title, video_link, video_description, video_subTitle } = videoInfo;
  return (
    <motion.div
      className={`fixed top-0 left-0 z-[9999] w-full h-full  flex items-center justify-center bg-black bg-opacity-70  gap-[50px]  `}
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
  );
};
const Modal_Mobile = ({ selectedIndex, onClose, videoInfo }) => {
  const { video_title, video_link, video_description, video_subTitle } = videoInfo;
  return (
    <motion.div
      className={`fixed top-0 left-0 z-[9999] w-full h-full  flex items-center justify-center bg-black bg-opacity-70  gap-[50px]  `}
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
  );
};
