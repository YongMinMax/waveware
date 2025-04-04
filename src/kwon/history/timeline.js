import {useRef, useState, useEffect} from "react";

export default function TimeLine () {
    const [selectedYear, setSelectedYear] = useState("2025");
    const yearRefs = useRef({});

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

            setSelectedYear(closestYear);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [selectedYear]);

    return(
        <div>
            <div className="w-full sticky top-0 bg-white">
                {/*<SectionTitle text={"Timeline"}/>*/}
                <div className={"container mx-auto flex justify-center items-start py-24"}>
                    {Object.keys(historyData).sort((a, b) => b - a).map((year) => (
                        <div className={"flex flex-col items-center"} key={year}>
                            <button
                                className={`px-6 py-2 ${selectedYear === year ? 'font-bold text-black' : 'text-gray-500'}`}
                                onClick={() => {
                                    yearRefs.current[year].scrollIntoView({ behavior: "smooth", block: "start" });
                                    setSelectedYear(year);
                                }}
                            >
                                {year}
                            </button>
                            { selectedYear === year && (<div className={"w-1 h-1 bg-black rounded-full"}></div>)}
                        </div>
                    ))}
                </div>
            </div>
            <div className={"flex "}>
                <img className={"sticky top-[25vh] w-[400px] h-[250px] object-cover"} src={historyData[selectedYear].image}/>
                <div className={"flex flex-col mx-12 border-t-2 border-black"}>
                    {Object.entries(historyData).sort(([a], [b]) => b - a).map(([year, data]) => (
                        <div key={year} ref={(el) => (yearRefs.current[year] = el)} data-year={year} style={{ scrollMarginTop: '25vh' }} className={"flex justify-start border-b-[1px] px-12 py-12"}>
                            <h2 className={"text-[50px] font-semibold px-10"}>{year}</h2>
                            <ul>
                                {data.events.map((event, index) => (
                                    <li key={index} className="mt-2 mb-2 ml-12">{event}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div className="h-[300px]"></div>
                </div>
            </div>
        </div>
    );
}

const historyData = {
    "2025": {
        events: [
            "오윤 100일",
            "임직원 롯데마트 방문",
        ],
        image: "/img/history/2025.png"
    },
    "2024": {
        events: [
            "글로벌 공급망 문제 사전감지와 대응을 위한 지능형 GVC 분석시스템 개발",
            "사회문제 R&D 분석 현황판 및 데이터 분석도구 개발",
        ],
        image: "/img/history/2024.png"
    },
    "2023": {
        events: [
            "글로벌 원부자재 공급망 문제 사전감지를 위한 종합 상황판 프레임워크 개발",
            "사회문제 R&D 현황 분석을 위한 메타데이터 구축 및 도구 개발",
        ],
        image: "/img/history/2023.png"
    },
    "2022": {
        events: [
            "NTIS AI 및 데이터 기반 자동분류 기술 고도화 및 신규 분류체계 추가",
            "NTIS 연관 콘텐츠 기반 그린체인 서비스 제공",
            "NTIS 콘텐츠 소비패턴 기반 이용자 행태분석 강화",
            "주요 원부자재 공급망 문제 이상징후 감지를 위한 테스트베드 개발",
        ],
        image: "/img/history/2022.png"
    },
    "2021": {
        events: [
            "빅데이터기반 치매조기예측 기술 (기술 이전)",
            "치매 조기예측 및 자동분류 시스템을 위한 패스트데이터 수집 플랫폼 개발 및 처리환경 고도화",
            "NTIS 인공지능 기반 자동분류 기술 개발",
            "풍수해 재난상황·복구 데이터를 활용한 재난피해 위험도 측정모델 개발",
            "지능형 과학 기술 산업 위기대응 시스템 개발",
            "인공지능 기반 논문 연구분야 자동분류 시스템 개발",
        ],
        image: "/img/history/2021.jpg"
    },
    "2020": {
        events: [
            "인공지능 연구소 설립",
            "치매 조기예측 및 자동분류 시스템을 위한 패스트데이터 처리 환경 고도화 용역",
            "NTIS 인공지능 기반 자동분류 기술 개발"
        ],
        image: "/img/history/2020.png"
    },
    "2019": {
        events: [
            "특허 등록 (그래픽 처리 장치의 자원 관리 기술)",
            "ADL 연구를 위한 IoT 인프라 개발 구축",
            "국가연구데이터플랫폼",
            "NTIS 국가과학기술지식정보서비스 구축",
        ],
        image: "/img/history/2019.jpg"
    },
    "2018": {
        events: [
            "빅데이터 기반 종합 치매 예측 서비스 개발 용역",
            "대형연구장비를 연계한 데이터 융합·분석 환경구축 및 시범서비스 개발",
            "NTIS 인공지능기반 국가과학기술표준 자동분류",
        ],
        image: "/img/history/2018.png"
    },
    "2017": {
        events: [
            "치매 조기예측을 위한 생체 정보 빅데이터 분석 시스템 구축",
            "피해 예측 기반 의사결정지원 시스템 구축",
            "대용량 데이터관리 플랫폼(SODA)기반의 연구지원 시범서비스 개발",
        ],
        image: "/img/history/2017.jpg"
    },
    "2016": {
        events: [
            "재난·재해 실시간 지식 탐지 플랫폼 개발",
            "치매 연구를 위한 빅데이터 분석 시스템 구축",
        ],
        image: "/img/history/2016.png"
    },
    "2015": {
        events: [
            "치매분야 학술문헌의 지식화 연구",
            "재난·재해 스트림/배치 지깃의 복합처리/관리 프레임워크 개발",
            "사회경제 환경 트렌드 분석을 위한 데이터 구축",
        ],
        image: "/img/history/2015.png"
    },
    "2014": {
        events: [
            "(주) waveware 설립",
            "Medical Pathway 관리 및 연계시스템 구현",
            "소셜 빅데이터 기반 기술기회발굴",
        ],
        image: "/img/history/2014.png"
    },
};