import { useRef, useState, useEffect } from "react";

export default function TimeLine() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [prevSelectedYear, setPrevSelectedYear] = useState("2024");
  const yearRefs = useRef({});
  const [imagePage, setImagePage] = useState(0);
  const [transitionActive, setTransitionActive] = useState(false);

  useEffect(() => {
    setImagePage(0);
  }, [selectedYear]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.2;
      let closestYear = selectedYear;
      let minDistance = Infinity;

      Object.entries(yearRefs.current).forEach(([year, ref]) => {
        if (ref) {
          const box = ref.getBoundingClientRect();
          const offset = box.top + window.scrollY;
          const distance = Math.abs(scrollPosition - offset);

          if (distance < minDistance) {
            minDistance = distance;
            closestYear = year;
          }
        }
      });

      if (closestYear !== selectedYear) {
        setPrevSelectedYear(selectedYear);
        setSelectedYear(closestYear);
        setTransitionActive(true);
        setTimeout(() => {
          setTransitionActive(false);
        }, 600); // 애니메이션 지속 시간보다 약간 길게
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedYear]);

  useEffect(() => {
    const interval = setInterval(() => {
      const totalSlides = Math.ceil(
        historyData[selectedYear].images.length / 2
      );
      setImagePage((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedYear]);

  // 연도를 정렬하여 정수로 변환
  const sortedYears = Object.keys(historyData)
    .map((year) => parseInt(year))
    .sort((a, b) => b - a);

  return (
    <div>
      <div className="w-full sticky top-0 bg-white">
        <div className="container mx-auto flex justify-center items-start py-24">
          {sortedYears.map((year) => (
            <div className="flex flex-col items-center" key={year}>
              <button
                className={`px-6 py-2 ${
                  selectedYear === year.toString()
                    ? "font-bold text-black"
                    : "text-gray-500"
                }`}
                onClick={() => {
                  yearRefs.current[year].scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                {year}
              </button>
              {selectedYear === year.toString() && (
                <div className="w-1 h-1 bg-black rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-[1400px]">
        <div className="sticky top-[25vh] w-[500px] h-[70vh] overflow-hidden relative bg-white rounded-xl shadow-lg">
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 text-3xl font-bold text-gray-700 hover:text-black"
            onClick={() => setImagePage((prev) => Math.max(0, prev - 1))}
          >
            〈
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 text-3xl font-bold text-gray-700 hover:text-black"
            onClick={() =>
              setImagePage((prev) =>
                Math.min(
                  Math.ceil(historyData[selectedYear].images.length / 2) - 1,
                  prev + 1
                )
              )
            }
          >
            〉
          </button>

          {/* 연도별 이미지 컨테이너들 */}
          <div className="w-full h-full relative">
            {sortedYears.map((year) => {
              const yearStr = year.toString();
              // 연도의 순서를 기반으로 초기 위치 계산
              const yearIndex = sortedYears.indexOf(parseInt(selectedYear));
              const currentIndex = sortedYears.indexOf(year);

              // 기본 위치 (선택되지 않은 경우 위나 아래에 위치)
              let initialPosition = currentIndex < yearIndex ? "-200%" : "200%";
              if (yearStr === prevSelectedYear && yearStr !== selectedYear) {
                // 이전에 선택되었다가 지금은 선택되지 않은 경우
                initialPosition =
                  parseInt(selectedYear) > year ? "200%" : "-200%";
              }

              return (
                <div
                  key={year}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    transform:
                      yearStr === selectedYear
                        ? "translateY(0)"
                        : `translateY(${initialPosition})`,
                    opacity: yearStr === selectedYear ? 1 : 0,
                    visibility:
                      yearStr === selectedYear ||
                      (transitionActive && yearStr === prevSelectedYear)
                        ? "visible"
                        : "hidden",
                    transition:
                      "transform 500ms ease-in-out, opacity 500ms ease-in-out",
                    zIndex: yearStr === selectedYear ? 20 : 10,
                  }}
                >
                  {/* 이미지 페이지네이션 컨테이너 */}
                  <div
                    className="flex h-full"
                    style={{
                      width: `${
                        Math.ceil(historyData[yearStr].images.length / 2) * 500
                      }px`,
                      transform: `translateX(-${imagePage * 500}px)`,
                      transition: "transform 500ms ease-in-out",
                    }}
                  >
                    {Array.from({
                      length: Math.ceil(historyData[yearStr].images.length / 2),
                    }).map((_, pageIndex) => (
                      <div
                        key={pageIndex}
                        className="w-[500px] h-full flex-shrink-0 flex flex-col justify-between p-2 gap-4 box-border"
                      >
                        {[0, 1].map((offset) => {
                          const img =
                            historyData[yearStr].images[pageIndex * 2 + offset];
                          return (
                            img && (
                              <div
                                key={offset}
                                className="h-[45%] rounded-lg overflow-hidden relative shadow-md"
                              >
                                <img
                                  src={img}
                                  alt={`Image ${pageIndex * 2 + offset}`}
                                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 z-10 relative"
                                />
                              </div>
                            )
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col mx-12 border-t-2 border-black">
          {sortedYears.map((year) => {
            const yearStr = year.toString();
            const data = historyData[yearStr];
            return (
              <div
                key={year}
                ref={(el) => (yearRefs.current[year] = el)}
                data-year={year}
                style={{ scrollMarginTop: "25vh" }}
                className="flex justify-start border-b-[1px] px-12 py-12"
              >
                <h2 className="text-[50px] font-semibold px-10">{year}</h2>
                <ul>
                  {data.events.map((event, index) => (
                    <li key={index} className="mt-2 mb-2 ml-12">
                      {event}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div className="h-[400px]"></div>
        </div>
      </div>
    </div>
  );
}

const historyData = {
  // "2025": {
  //     events: [
  //         "오윤 100일",
  //         "임직원 롯데마트 방문",
  //     ],
  //     images: ["/img/history1/2025.png"]
  // },
  2024: {
    events: [
      "글로벌 공급망 문제 사전감지와 대응을 위한 지능형 GVC 분석시스템 개발",
      "사회문제 R&D 분석 현황판 및 데이터 분석도구 개발",
    ],
    images: ["/img/history1/2024/img_0.png", "/img/history1/2024/img_1.png"],
  },
  2023: {
    events: [
      "자본금 증자 (2억)",
      "소프트웨어 등록 3건",
      "- 대용량 뉴스 데이터 기반 병렬 분산 패스트데이터 검색 엔진",
      "- 대용량 뉴스데이터 기반 실시간 검색.분석을 위한 GUI 도구",
      "- 자연어 처리 모델을 활용한 기술 문헌용 AI 기반 감정 분석 엔진",
      "글로벌 원부자재 공급망 문제 사전감지를 위한 종합 상황판 프레임워크 개발",
      "사회문제 R&D 현황 분석을 위한 메타데이터 구축 및 도구 개발",
    ],
    images: [
      // "/img/history1/2023/img_1.png",
      "/img/history1/2023/img_2.png",
      "/img/history1/2023/img_3.png",
      // "/img/history1/2023/img_4.png",
    ],
  },
  2022: {
    events: [
      "기업 부설 연구소 설립",
      "NTIS AI 및 데이터 기반 자동분류 기술 고도화 및 신규 분류체계 추가",
      "NTIS 연관 콘텐츠 기반 그린체인 서비스 제공",
      "NTIS 콘텐츠 소비패턴 기반 이용자 행태분석 강화",
      "주요 원부자재 공급망 문제 이상징후 감지를 위한 테스트베드 개발",
    ],
    images: [
      "/img/history1/2022/img_1.png",
      // "/img/history1/2022/img_2.png",
      "/img/history1/2022/img_3.png",
      // "/img/history1/2022/img_4.png",
    ],
  },
  2021: {
    events: [
      "자본금 증자 (1억)",
      "빅데이터기반 치매조기예측 기술 (기술 이전)",
      "치매 조기예측 및 자동분류 시스템을 위한 패스트데이터 수집 플랫폼 개발 및 처리환경 고도화",
      "NTIS 인공지능 기반 자동분류 기술 개발",
      "풍수해 재난상황·복구 데이터를 활용한 재난피해 위험도 측정모델 개발",
      "지능형 과학 기술 산업 위기대응 시스템 개발",
      "인공지능 기반 논문 연구분야 자동분류 시스템 개발",
    ],
    images: [
      "/img/history1/2021/img_1.png",
      "/img/history1/2021/img_2.png",
      "/img/history1/2021/img_3.png",
      "/img/history1/2021/img_4.png",
      "/img/history1/2021/img_5.png",
    ],
  },
  2020: {
    events: [
      "인공지능 연구소 설립",
      "치매 조기예측 및 자동분류 시스템을 위한 패스트데이터 처리 환경 고도화 용역",
      "NTIS 인공지능 기반 자동분류 기술 개발",
    ],
    images: ["/img/history1/2020/img_1.png", "/img/history1/2020/img_2.png"],
  },
  2019: {
    events: [
      "벤처기업 인증",
      "사무실 이전 (대덕비즈센터)",
      "소프트웨어 등록 - freeIPA/NFSv4 기반, 권한접근관리 프로그램",
      "특허 등록- 그래픽 처리 장치의 자원 관리를 위한 딥러닝 플랫폼; 제10-2064882호",
      "ADL 연구를 위한 IoT 인프라 개발 구축",
      "국가연구데이터플랫폼",
      "NTIS 국가과학기술지식정보서비스 구축",
    ],
    images: [
      "/img/history1/2019/img_1.png",
      // "/img/history1/2019/img_2.png",
      // "/img/history1/2019/img_3.png",
      "/img/history1/2019/img_4.png",
    ],
  },
  2018: {
    events: [
      "빅데이터 기반 종합 치매 예측 서비스 개발 용역",
      "대형연구장비를 연계한 데이터 융합·분석 환경구축 및 시범서비스 개발",
      "NTIS 인공지능기반 국가과학기술표준 자동분류",
    ],
    images: [
      "/img/history1/2018/img_1.jpg",
      // "/img/history1/2018/img_2.png",
      "/img/history1/2018/img_3.jpg",
    ],
  },
  2017: {
    events: [
      "사무실 이전 (미건 테크노 월드)",
      "치매 조기예측을 위한 생체 정보 빅데이터 분석 시스템 구축",
      "피해 예측 기반 의사결정지원 시스템 구축",
      "대용량 데이터관리 플랫폼(SODA)기반의 연구지원 시범서비스 개발",
    ],
    images: [
      "/img/history1/2017/img_1.jpg",
      "/img/history1/2017/img_2.png",
      "/img/history1/2017/img_3.png",
      "/img/history1/2017/img_4.png",
      "/img/history1/2017/img_5.png",
    ],
  },
  2016: {
    events: [
      "재난·재해 실시간 지식 탐지 플랫폼 개발",
      "치매 연구를 위한 빅데이터 분석 시스템 구축",
    ],
    images: [
      "/img/history1/2016/img_1.png",
      "/img/history1/2016/img_2.png",
      "/img/history1/2016/img_3.png",
      "/img/history1/2016/img_4.png",
    ],
  },
  2015: {
    events: [
      "치매분야 학술문헌의 지식화 연구",
      "재난·재해 스트림/배치 지깃의 복합처리/관리 프레임워크 개발",
      "사회경제 환경 트렌드 분석을 위한 데이터 구축",
    ],
    images: [
      "/img/history1/2015/img_1.png",
      "/img/history1/2015/img_3.png",
      "/img/history1/2015/img_3_.png",
      "/img/history1/2015/img_ppt_1.png",
      "/img/history1/2015/img_ppt_2.png",
    ],
  },
  2014: {
    events: [
      "(주) waveware 설립",
      "Medical Pathway 관리 및 연계시스템 구현",
      "소셜 빅데이터 기반 기술기회발굴",
    ],
    images: [
      "/img/history1/2014/img_1.png",
      // "/img/history1/2014/img_2.png",
      "/img/history1/2014/img_3.png",
      "/img/history1/2014/img_4.png",
    ],
  },
};
