import Requirements from "./Requirements";
import React from "react";

export default function WhoWeWant() {

    return (
        <section className="w-full h-[700px] bg-gray-100 flex justify-center">
            <div className="w-[1400px] h-full flex justify-between items-center">
                <Requirements requirements={requirements[1]}/>
                <div className="w-[1.5px] h-[80%] bg-gray-300"></div>
                <Requirements requirements={requirements[2]}/>
                <div className="w-[1.5px] h-[80%] bg-gray-300"></div>
                <Requirements requirements={requirements[3]}/>
            </div>
        </section>
    );
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