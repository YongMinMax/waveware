import React, { useState, useEffect } from 'react';
import MenuHeader from "../kwon/components/menuheader";
import ProcessComponent from "../kwon/career/process_component";
import Requirements from "../kwon/career/Requirements";

export default function Career() {
    // 현재 활성화된 프로세스 ID를 저장하는 상태
    const [activeProcess, setActiveProcess] = useState(1);
    // 호버된 프로세스 ID를 저장하는 상태
    const [hoveredProcess, setHoveredProcess] = useState(null);

    // 자동 하이라이트 기능을 위한 useEffect
    useEffect(() => {
        // 호버된 상태가 아닐 때만 자동 순환
        if (hoveredProcess === null) {
            const interval = setInterval(() => {
                setActiveProcess(prev => (prev % 5) + 1);
            }, 2000); // 3초마다 다음 프로세스로 이동
            
            return () => clearInterval(interval);
        }
    }, [hoveredProcess]);

    const processes = {
                1:{
                    id: 1,
                    step: "STEP 1",
                    title: "지원",
                    description: "당신의 성장 가능성과 열정을 보여주세요. 우리는 다양한 가능성을 열린 마음으로 바라봅니다.",
                    isHighlighted: false
                },
                2: {
                    id: 2,
                    step: "STEP 2",
                    title: "서류 전형",
                    description: "경험과 가치관을 확인합니다. 지원자의 잠재력과 도전 의지를 중요하게 생각합니다.",
                    isHighlighted: false
                },
                3: {
                    id: 3,
                    step: "STEP 3",
                    title: "면접",
                    description: "문제 해결에 대한 태도와 협업 역량을 살펴봅니다.",
                    isHighlighted: false
                },
                4: {
                    id: 4,
                    step: "STEP 4",
                    title: "최종 합격",
                    description: "우리와 함께할 준비가 되셨나요? 최종합격자는 새로운 여정을 함께할 동료로서 맞이하게 됩니다.",
                    isHighlighted: false
                },
                5: {
                    id: 5,
                    step: "FINAL",
                    title: "입사",
                    description: "함께 성장하고, 함께 도전하며 더 나은 내일을 만들어갑니다.",
                    isHighlighted: false
                }
            }

    const requirements = {
            1: {
                eng: "Growth",
                kor: "성장하고자 하는 사람",
                description:
                "팀원을 소모품이 아닌 필수품으로 생각합니다. 함께 성장해 나갈 수 있는 환경을 만듭니다.",
                img: "/img/1_color.png",
                },
            2: {
                eng: "Communication",
                kor: "열린 마음으로 듣는 사람",
                description:
                "서로의 아이디어를 존중하고 열린 마음으로 받아들이며, 적극적인 토론과 피드백을 통해 함께 성장합니다.",
                img: "/img/4_color.png",
                },
            3: {
                eng: "Challenge",
                kor: "끊임없이 도전하는 사람",
                description:
                "목표를 설정하고 이를 위해 노력하는 사람을 환영합니다. 실패를 두려워하지 않고 도전하는 사람을 찾습니다.",
                img: "/img/3_color.png",
                }
            }

    // 호버 핸들러
    const handleHover = (id) => {
        setHoveredProcess(id);
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center">

            <MenuHeader title={"Career"} description={"사람의 성장이 회사의 성장이라고 믿습니다."}/>

            <span className="w-[1400px] pt-32 pb-4 text-5xl font-bold text-left">Recruitment Process</span>

            <div className="w-[1300px] h-[500px] flex relative my-20">
                <div className="absolute left-0">
                    <ProcessComponent 
                        data={processes[1]} 
                        isActive={hoveredProcess === 1 || (hoveredProcess === null && activeProcess === 1)}
                        onHover={handleHover}
                    />
                </div>
                <div className="absolute left-[255px]">
                    <ProcessComponent 
                        data={processes[2]} 
                        isActive={hoveredProcess === 2 || (hoveredProcess === null && activeProcess === 2)}
                        onHover={handleHover}
                    />
                </div>
                <div className="absolute left-[510px]">
                    <ProcessComponent 
                        data={processes[3]} 
                        isActive={hoveredProcess === 3 || (hoveredProcess === null && activeProcess === 3)}
                        onHover={handleHover}
                    />
                </div>
                <div className="absolute left-[765px]">
                    <ProcessComponent 
                        data={processes[4]} 
                        isActive={hoveredProcess === 4 || (hoveredProcess === null && activeProcess === 4)}
                        onHover={handleHover}
                    />
                </div>
                <div className="absolute left-[1020px]">
                    <ProcessComponent 
                        data={processes[5]} 
                        isActive={hoveredProcess === 5 || (hoveredProcess === null && activeProcess === 5)}
                        onHover={handleHover}
                    />
                </div>
            </div>

            <span className="w-[1400px] pb-4 text-5xl font-bold text-left">Who We Wants</span>
            <section className="w-full h-[700px] bg-gray-100 flex justify-center">
                <div className="w-[1400px] h-full flex justify-between items-center">
                    <Requirements requirements={requirements[1]}/>
                    <div className="w-[1.5px] h-[80%] bg-gray-300"></div>
                    <Requirements requirements={requirements[2]}/>
                    <div className="w-[1.5px] h-[80%] bg-gray-300"></div>
                    <Requirements requirements={requirements[3]}/>
                </div>
            </section>



        </main>
    );
}
