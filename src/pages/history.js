import MenuHeader from "../kwon/components/menuheader";
import SectionTitle from "../kwon/components/section_title";
import { useState, useRef, useEffect } from "react";

export default function History() {
    const [selectedYear, setSelectedYear] = useState("2023");
    const yearRefs = useRef({});
    const timelineContainerRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isTimelineActive, setIsTimelineActive] = useState(false);

    const historyData = {
        // "2025": {
        //     events: [
        //         "롯데마트 방문",
        //         "오윤 100일",
        //     ],
        //     image: "/img/history/2025.jpg"
        // },
        // "2024": {
        //     events: [
        //         "권예은 입사",
        //     ],
        //     image: "/img/history/2024.jpg"
        // },
        "2023": {
            events: [
                "글로벌 원부자재 공급망 문제 사전감지를 위한 종합 상황판 프레임워크 개발",
                "사회문제 R&D 현황 분석을 위한 메타데이터 구축 및 도구 개발",
            ],
            image: "/img/history/2023.jpg"
        },
        "2022": {
            events: [
                "NTIS AI 및 데이터 기반 자동분류 기술 고도화 및 신규 분류체계 추가",
                "NTIS 연관 콘텐츠 기반 그린체인 서비스 제공",
                "NTIS 콘텐츠 소비패턴 기반 이용자 행태분석 강화",
                "주요 원부자재 공급망 문제 이상징후 감지를 위한 테스트베드 개발",
            ],
            image: "/img/history/2022.jpg"
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

    const years = Object.keys(historyData).reverse();
    
    // 스냅 스크롤 처리
    const handleWheel = (e) => {
        if (isScrolling) return;
        
        const currentIndex = years.indexOf(selectedYear);
        let nextIndex;
        
        if (e.deltaY > 0 && currentIndex < years.length - 1) {
            // 아래로 스크롤
            nextIndex = currentIndex + 1;
        } else if (e.deltaY < 0 && currentIndex > 0) {
            // 위로 스크롤
            nextIndex = currentIndex - 1;
        } else {
            return;
        }
        
        const nextYear = years[nextIndex];
        setSelectedYear(nextYear);
        
        // 스크롤 애니메이션
        setIsScrolling(true);
        const yearSection = document.getElementById(`year-${nextYear}`);
        if (yearSection) {
            yearSection.scrollIntoView({ behavior: 'smooth' });
            
            // 스크롤 애니메이션이 끝나면 isScrolling 상태 해제
            setTimeout(() => {
                setIsScrolling(false);
            }, 800); // 스크롤 애니메이션 시간과 맞춤
        }
    };

    // 페이지 스크롤 이벤트 처리
    useEffect(() => {
        const handlePageScroll = () => {
            if (!timelineContainerRef.current || isScrolling) return;
            
            // 타임라인 섹션이 화면에 보이는지 확인
            const rect = timelineContainerRef.current.getBoundingClientRect();
            const isVisible = 
                rect.top < window.innerHeight * 0.6 && 
                rect.bottom > window.innerHeight * 0.4;
            
            setIsTimelineActive(isVisible);

            if (isVisible) {
                // 각 연도 섹션의 위치를 확인하여 가장 가까운 연도 선택
                let closestYear = null;
                let minDistance = Infinity;
                
                years.forEach(year => {
                    const yearElement = document.getElementById(`year-${year}`);
                    if (yearElement) {
                        const yearRect = yearElement.getBoundingClientRect();
                        const distance = Math.abs(yearRect.top);
                        
                        if (distance < minDistance) {
                            minDistance = distance;
                            closestYear = year;
                        }
                    }
                });
                
                if (closestYear && closestYear !== selectedYear) {
                    setSelectedYear(closestYear);
                }
            }
        };
        
        window.addEventListener('scroll', handlePageScroll);
        return () => window.removeEventListener('scroll', handlePageScroll);
    }, [selectedYear, isScrolling, years]);

    return (
        <main className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${isTimelineActive ? 'bg-gray-300' : 'bg-white'}`}>
            <MenuHeader title={"History"} description={"기술로 써 내려온 성장의 기록/ 미래를 향한 우리의 발자취입니다."}/>
            
            <SectionTitle text={"Timeline"}/>
            
            <div className="w-full h-[100px]"></div>
            
            <section 
                ref={timelineContainerRef} 
                className="w-full py-20"
                onWheel={handleWheel}
            >
                <div className="container mx-auto w-[1400px] flex">
                    {/* 왼쪽: 고정된 이미지 영역 */}
                    <div className="w-[700px] sticky top-[200px] h-[500px] self-start mr-10">
                        {years.map(year => (
                            <div 
                                key={year}
                                className={`absolute inset-0 w-full h-full bg-gray-100 rounded-lg overflow-hidden transition-opacity duration-500 shadow-2xl ${selectedYear === year ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <div 
                                    className="w-full h-full bg-cover bg-center"
                                    style={{ backgroundImage: `url('${historyData[year].image}')` }}
                                ></div>
                            </div>
                        ))}
                    </div>
                    
                    {/* 오른쪽: 스크롤되는 타임라인과 이벤트 */}
                    <div className="flex-1 relative">
                        {/* 전체 타임라인 세로선 (회색 배경) */}
                        <div className={`absolute top-0 left-[50px] w-[2px] h-full ${isTimelineActive ? 'bg-gray-100' : 'bg-gray-300'}`}></div>
                        
                        {/* 진행 상태를 나타내는 컬러 타임라인 */}
                        <div className="absolute top-0 left-[50px] w-[2px] bg-primary transition-all duration-500" style={{
                            height: (() => {
                                // 현재 선택된 연도의 마커 위치까지만 색상 변경
                                const currentYearElement = yearRefs.current[selectedYear];
                                if (currentYearElement) {
                                    const rect = currentYearElement.getBoundingClientRect();
                                    const timelineRect = timelineContainerRef.current.getBoundingClientRect();
                                    // 타임라인 컨테이너 상단에서부터 현재 연도 마커까지의 거리 계산
                                    return `${rect.top - timelineRect.top - 70}px`; // pt-[240px] 패딩 고려
                                }
                                return '0px';
                            })()
                        }}></div>
                        
                        {years.map(year => (
                            <div 
                                id={`year-${year}`}
                                key={year} 
                                className={`flex min-h-[600px] transition-opacity duration-500 ${selectedYear === year ? 'opacity-100' : 'opacity-40'}`}
                            >
                                {/* 왼쪽: 타임라인 */}
                                <div className="relative w-[100px] flex flex-col items-center pt-[260px]">
                                    {/* 연도 마커 */}
                                    <div 
                                        ref={el => yearRefs.current[year] = el}
                                        className="relative flex flex-col items-center cursor-pointer z-10"
                                        onClick={() => {
                                            if (isScrolling) return;
                                            setSelectedYear(year);
                                            setIsScrolling(true);
                                            const yearSection = document.getElementById(`year-${year}`);
                                            if (yearSection) {
                                                yearSection.scrollIntoView({ behavior: 'smooth' });
                                                setTimeout(() => {
                                                    setIsScrolling(false);
                                                }, 800);
                                            }
                                        }}
                                    >
                                        <div className={`w-[20px] h-[20px] rounded-full ${selectedYear === year ? 'bg-primary' : 'bg-white'} mb-4`}></div>
                                    </div>
                                </div>
                                
                                {/* 오른쪽: 연도와 이벤트 */}
                                <div className="flex-1 flex flex-col pt-[240px]">
                                    <h2 className="text-5xl font-bold mb-10 text-primary">{year}</h2>
                                    
                                    <ul className="space-y-6">
                                        {historyData[year].events.map((event, index) => (
                                            <li key={index} className="flex items-start">
                                                {/* <div className="w-[10px] h-[10px] rounded-full bg-primary mt-2 mr-4"></div> */}
                                                <p className="text-xl font-semibold">{event}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <SectionTitle text={"Our Vision"}/>
            
            <section className="relative w-full h-[500px] bg-cover bg-center mb-20"
                     style={{backgroundImage: "url('/img/vision_bg.jpg')"}}>
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="relative container mx-auto w-[1400px] h-full flex flex-col justify-center text-white">
                    <h2 className="text-5xl font-bold mb-8">미래를 향한 도전</h2>
                    <p className="text-2xl font-light max-w-[800px] leading-relaxed">
                        웨이브웨어는 데이터의 가치를 발견하고 활용하는 기술을 통해 더 나은 미래를 만들어갑니다. 
                        우리의 기술이 사회와 산업 전반에 긍정적인 변화를 가져올 수 있도록 끊임없이 혁신하고 도전합니다.
                    </p>
                </div>
            </section>
        </main>
    );
}
