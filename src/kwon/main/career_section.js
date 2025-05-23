import React, { useRef, useState } from "react";
import CareerCard from "./CareerCard";
import { useMotionValueEvent, useScroll } from "framer-motion";
import MoveCompo from "../components/move_compo";

export default function Career() {
  const scrollSensor = useRef(null);
  const [animate, setAnimate] = useState(false);
  const { scrollYProgress } = useScroll({ target: scrollSensor, offset: ["start end", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (scroll) => {
    if (scroll > 0.2) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  });

  return (
    <section
      ref={scrollSensor}
      className="relative w-full md:h-screen bg-cover bg-center py-6"
      style={{ backgroundImage: "url('/img/career_bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative container mx-auto  h-full flex flex-col justify-center items-center gap-2 text-white">
        <div className="flex w-full justify-between items-end overflow-hidden">
          <MoveCompo animate={animate}>
            <h1 className="text-xl font-semibold pb-4 text-primary">WAVEWARE</h1>
          </MoveCompo>
        </div>

        <div className="flex flex-col md:flex-row w-full justify-between items-center gap-2">
          <MoveCompo animate={animate}>
            <p className="text-3xl font-medium">
              데이터 속 가치를 찾아 함께
              <br /> 한 걸음 내딛을 동료를 찾습니다.
            </p>
          </MoveCompo>

          <MoveCompo animate={animate}>
            <div className="hidden md:block w-[0.5px] h-[60px] bg-white opacity-50"></div>
          </MoveCompo>

          <MoveCompo animate={animate}>
            <p className="md:w-[800px] text-lg font-light">
              waveware는 IT 전문 지식과 경험을 바탕으로 새로운 가치 창출의 세계로 진입할 준비를 하고 있으며, 개인의
              지식과 경험을 바탕으로 다양한 솔루션을 모색하기 위해 함께 협업할 팀원을 찾고 있습니다.
            </p>
          </MoveCompo>
        </div>

        <div className="flex flex-col md:flex-row gap-12 py-10 w-full">
          <MoveCompo animate={animate}>
            <CareerCard
              color="#A1E5A8"
              title="Growth"
              description="팀원을 소모품이 아닌 필수품으로 생각하며 함께 성장해 나갈 수 있는 사람"
            />
          </MoveCompo>
          <MoveCompo animate={animate}>
            <CareerCard
              color="#40D6CA"
              title="Communication"
              description="아이디어를 존중하고 받아들이며 적극적인 토론을 통해 함께 성장할 사람"
            />
          </MoveCompo>
          <MoveCompo animate={animate}>
            <CareerCard
              color="#75DFFF"
              title="Challenge"
              description="달성 가능한 목표를 설정하고 달려가며 끊임없이 도전하는 사람"
            />
          </MoveCompo>
        </div>

        <MoveCompo animate={animate}>
          <div className={"mt-10"}>
            <a
              href="https://www.saramin.co.kr/zf_user/company-info/view?csn=MlUxNjNTaERsZ0h1Qzg3NlZXUnpHdz09"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="flex items-center px-6 py-2 border border-white text-white rounded-br-2xl rounded-tl-2xl hover:bg-white hover:text-black transition-colors duration-300">
                <span className="mr-4 font-light">채용 공고</span>
                <svg width="30" viewBox="0 0 50 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 13H49V14H0V13Z" fill="currentColor" />
                  <path d="M34 0L49.0942 13.1212L48.4381 13.8759L33.3439 0.75471L34 0Z" fill="currentColor" />
                </svg>
              </button>
            </a>
          </div>
        </MoveCompo>
      </div>
    </section>
  );
}
