import React, {useEffect, useState} from "react";
import SectionTitle from "../components/section_title";
import ProcessComponent from "./process_component";

export default function RecruitmentProcess () {

    const [activeProcess, setActiveProcess] = useState(1);
    const [hoveredProcess, setHoveredProcess] = useState(null);

    const handleHover = (id) => {
        setHoveredProcess(id);
    };

    useEffect(() => {
        if (hoveredProcess === null) {
            const interval = setInterval(() => {
                setActiveProcess(prev => (prev % 5) + 1);
            }, 2000); // 2초마다 다음 프로세스로 이동

            return () => clearInterval(interval);
        }
    }, [hoveredProcess]);

    return (
        <div className="w-[1300px] h-[500px] flex relative mt-20">
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
    );

}


const processes = {
    1: {
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