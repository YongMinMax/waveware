// components/Portal.tsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CustomVideoPlayer } from "./skillPage";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

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
  setSelectedIndex,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedIndex: number;
  handleScrollLock: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>; // Added type for setSelectedIndex
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

  const [isFullScreen, setFullScreen] = useState(false);
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
            <Modal_Desktop selectedIndex={selectedIndex} onClose={onClose} setSelectedIndex={setSelectedIndex} />
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
const Modal_Desktop = ({ selectedIndex, onClose, setSelectedIndex }) => {
  // const { video_title, video_link, video_description, video_subTitle } = videoInfo;
  const infos = video_info[selectedIndex];
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const handleArrowClick = (direction: number) => {
    if (direction === -1) {
      if (selectedIndex !== 0) {
        setSelectedIndex((prev: number) => prev - 1);
        setSelectedVideoIndex(0);
      }
    } else if (direction === 1) {
      if (selectedIndex !== video_info.length - 1) {
        setSelectedIndex((prev: number) => prev + 1);
        setSelectedVideoIndex(0);
      }
    }
  };
  return (
    <motion.div
      id={"modal"}
      className={`fixed top-0 left-0 z-[9999] w-full h-full  flex items-center justify-center bg-black bg-opacity-70  gap-[20px]  `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <MdOutlineKeyboardArrowLeft
        onClick={(e) => {
          e.stopPropagation();
          handleArrowClick(-1);
        }}
        className={`text-[100px] ${selectedIndex === 0 ? "text-gray-500" : "text-white"} `}
      />

      <motion.div
        className="  rounded-lg shadow-lg  w-[1630px] h-[800px] max-w-full relative flex"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="absolute top-4 right-8 text-white hover:text-gray-500 text-[26px] z-10   " onClick={onClose}>
          ✕
        </button>
        <CustomVideoPlayer src={`${infos[selectedVideoIndex].link}`} isMobile={false} />
        {/* 원본 코드 */}
        {/* <div className={`whitespace-pre-line flex-1   px-[40px] pt-[100px]   bg-[#191919] text-white  `}>
          <div className={` text-[18px] font-semibold  text-[#3A9100] `}>{video_subTitle[selectedIndex]}</div>
          <div className={` w-fit text-[26px] font-bold mt-[15px]  `}>
            {video_title[selectedIndex]}
            <motion.div className={`w-full  h-[4px] bg-white mt-[8px]`}></motion.div>
          </div>

          <div className={` text-[16px] font-light mt-[20px]`}>{video_description[selectedIndex]}</div>
        </div> */}

        <div
          className={`whitespace-pre-line flex-1  pt-[60px]   bg-[#191919] text-white flex flex-col `}
          onWheel={(e) => e.stopPropagation()}
        >
          {/* 원본 */}
          {/* <div className={` text-[24px] font-semibold text-[#3A9100] pb-[40px] px-[30px]`}>{infos[0].title}</div> */}
          {/* 글자 키우고 밑줄 넣은 버젼 */}
          {/* <div
            className={` text-[28px] underline underline-offset-[10px] font-semibold text-[#3A9100] pb-[40px] px-[30px]  `}
          >
            {infos[0].title}
          </div> */}
          {/* 뱃지 처럼 만든 버젼 */}
          {/* <div className="px-[30px]  pb-[40px] ">
            <span className="inline-block bg-[#3A9100] text-white text-[24px] font-normal px-3 py-1 rounded-full uppercase tracking-wide ">
              {infos[0].title}
            </span>
          </div> */}
          {/* 두줄 공간 먹게한 버전  - X */}
          {/* <div className={` text-[40px] font-semibold text-[#3A9100]  pb-[40px] px-[30px] flex flex-col gap-[10px]`}>
            <div className="text-[24px]">{`0${selectedIndex + 1}`}</div>
            <div>{infos[0].title}</div>
          </div> */}

          <div className={` text-[24px] font-semibold text-[#3A9100] pb-[40px] px-[30px]`}>{infos[0].title}</div>

          <div className="flex flex-col  gap-[0px] select-none flex-1  overflow-y-auto scrollbar-hide ">
            {infos.map((info, idx) => {
              return (
                <>
                  <motion.div
                    key={`${info.name}-${idx}`}
                    className={`relative    px-[30px]  pt-[30px] pb-[0px]   cursor-pointer  ${
                      selectedVideoIndex === idx ? "bg-[#3a3a3a]" : "hover:bg-[#2a2a2a]/60"
                    } `}
                    whileHover="hover"
                    onClick={() => {
                      setSelectedVideoIndex(idx);
                    }}
                    // initial="initial"
                  >
                    {/* 호버 효과 주는 div */}
                    {/* <motion.div
                    className={`absolute inset-0 bg-white/20 w-full h-full mix-blend-lighten  `}
                    variants={{
                      initial: { x: "-130%" },
                      hover: {
                        x: "0%",
                        transition: {
                          duration: 0.3,
                        },
                      },
                    }}
                  ></motion.div> */}
                    <motion.div className={` text-[18px] pb-[25px]`} variants={{ hover: { color: "" } }}>
                      {String(idx + 1).padStart(2, "0")}
                    </motion.div>
                    <motion.div
                      className={` text-[32px] pb-[20px] font-bold ${selectedVideoIndex === idx ? "text-[#fff]" : ""} `}
                      variants={{ hover: { color: "" } }}
                    >
                      {info.name}
                    </motion.div>
                    <motion.div
                      className={` text-[16px]  font-light pb-[60px]  ${
                        idx !== infos.length - 1 && idx !== selectedVideoIndex && idx + 1 !== selectedVideoIndex
                          ? "border-b-[1px] border-b-white/30"
                          : ""
                      }
                        ${selectedVideoIndex === idx ? "text-[#ccc]" : "text-[#999]"}`}
                      variants={{ hover: { color: "#bbb" } }}
                    >
                      {info.description}
                    </motion.div>
                  </motion.div>
                  {/* {idx !== infos.length - 1 && <div className="border-b-[1px] mx-[30px] opacity-30" />} */}
                </>
              );
            })}
          </div>
        </div>
      </motion.div>
      <MdOutlineKeyboardArrowRight
        onClick={(e) => {
          e.stopPropagation();
          handleArrowClick(1);
        }}
        className={`text-[100px] ${selectedIndex === video_info.length - 1 ? "text-gray-500" : "text-white"}`}
      />
    </motion.div>
  );
};
const Modal_Mobile = ({ selectedIndex, onClose, videoInfo }) => {
  const { video_title, video_link, video_description, video_subTitle } = videoInfo;
  console.log(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // 터치 이벤트 막기
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
  console.log("hihi");
  return (
    <motion.div
      className={`fixed top-0 left-0 z-[9999] w-full h-full  flex items-center justify-center bg-black bg-opacity-80  gap-[50px]  `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button className="absolute top-4 right-4 text-white hover:text-gray-500 text-[22px]  " onClick={onClose}>
        ✕
      </button>
      <motion.div
        className=" rounded-lg shadow-lg  w-full max-w-full relative flex flex-col gap-[20px]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CustomVideoPlayer src={`${video_link[selectedIndex]}`} isMobile={true} />

        <div className={`whitespace-pre-line  mx-[16px] px-4 py-4  bg-[#191919] text-white `}>
          <div className={` text-[16px] font-semibold  text-[#3A9100] `}>{video_subTitle[selectedIndex]}</div>
          <div className={` w-fit text-[22px] font-bold mt-[15px]  `}>
            {video_title[selectedIndex]}
            <motion.div className={`w-full  h-[4px] bg-white mt-[8px]`}></motion.div>
          </div>

          <div className={` text-[14px] font-light mt-[20px]`}>{video_description[selectedIndex]}</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const video_info = [
  // 메타데이터
  [
    {
      link: "/videos/skill_metadata.mp4",
      title: "메타데이터",
      name: "치매 연구를 위한  데이터 분석",
      description:
        "일상생활 수행능력 측정 환경 구축 및 뇌파, ADL, 건강검진 등의 데이터를 분석하고 다년간 구축된 Cohort연구를 통해 치매 초기 증상을 예측하는 모델을 개발하였습니다.",
    },
    {
      link: "/videos/skill_sindi.mp4",
      title: "메타데이터",
      name: "질병 Pathway 검색 도구",
      description:
        "Pubmed DB에서 질병관련 논문, 보고서, 학회 발표 자료 데이터를 분석하고 정리해, 질병에 대한 생체적 요소간의 역학관계를 동적으로 구성하는 모델을 개발하였습니다",
    },
  ],
  // 시각화
  [
    {
      link: "/videos/skill_visulation.mp4",
      title: "시각화",
      name: "재난재해 피해예측 시각화",
      description:
        "수치표고모형(DEM) 데이터의 고도 및 침수심을 통해 피해영역을 가시화하고 재난이력 데이터로 재난 취약도를 계산해 재난운영 피해금액 예측 모델을 구축 및 시각화하였습니다.",
    },
    {
      link: "/videos/skill_newsTrends.mp4",
      title: "시각화",
      name: "키워드 기반 실시간 추이 분석기",
      description:
        "95개의 언론사에서 하루 약 30,000 건의 기사를 통해 실시간으로 키워드를 감지,분류하여 사용자에게 실시간으로 키워드의 추이를 시각화하여 제공합니다.",
    },
    {
      link: "/videos/skill_gvc.mp4",
      title: "시각화",
      name: "공급망 문제 분석 시스템",
      description:
        "글로벌 뉴스 데이터, 국제 금융데이터와 무역정보를 수집하고 분석해, 글로벌 공급망 문제를 사전감지하고 관련 정보를 시각화한 시스템을 개발하였습니다.",
    },
    {
      link: "/videos/skill_disaster.mp4",
      title: "시각화",
      name: "풍수해 위험도 측정 모델",
      description:
        "과거의 풍수해 재난 피해 및 복구 데이터를 GIS상에 융합,결합하여 재난 시 집중관리 및 대응 대비에 대한 정보를 시각화 하는 모델을 개발하였습니다.",
    },
  ],
  // 분산처리
  [
    {
      link: "/videos/skill_sns.mp4",
      title: "분산처리",
      name: "SNS 수집기",
      description:
        "하루에 약 500만건이 생성되는 SNS 데이터를 수집하여 처리하기 위해 Apache Spark를 활용해 실시간으로 처리하였으며, 위도,경도와 유저 정보를 통해 국가별, 유저별로 특징을 파악해 분류 후 적재하여 시각화합니다.",
    },
    {
      link: "/videos/skill_soda.mp4",
      title: "분산처리",
      name: "대용량 데이터 관리 플랫폼",
      description:
        "슈퍼컴퓨터 DTN 간 SFTP 및 GridFTP를 활용한 대용량 병렬처리를 개발하여 사용자 간 안정적인 고속 파일 전송이 가능하도록 했습니다. 또한, FreeIPA와의 연동을 통해 데이터셋에 대한 권한을 설정할 수 있는 기능을 구현하였습니다.",
    },
  ],
  // NLP
  [
    {
      link: "/videos/skill_nlp.mp4",
      title: "NLP",
      name: "국가 과학기술 표준분류체계",
      description:
        "과제 및 논문 데이터를 NLP Parser를 통해 문장을 구조화 하고 Word2Vec 알고리즘으로 임베딩하여 Z-score 및 knn 알고리즘을 통해 분류하는 모델을 개발하였습니다.",
    },
    {
      link: "/videos/skill_rnd.mp4",
      title: "NLP",
      name: "사회문제 R&D 분석 도구",
      description:
        "특허와 논문 데이터를 Clustering으로 분류 후 LDA,LSA로 데이터의 토픽을 추출하고,  RAG 기반 LLM을 활용해 사회 문제와 해결 방안에 대해 편향 없는 답변을 제공하는 시스템을 개발하였습니다.",
    },
  ],
];
