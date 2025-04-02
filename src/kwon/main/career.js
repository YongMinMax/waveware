import React from 'react';
import CareerCard from './CareerCard';

export default function Career() {
  return (
    <section
      className="relative w-full h-screen min-h-[700px] bg-cover bg-center"
      style={{ backgroundImage: "url('/img/career_bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>

        <div
            className="relative container mx-auto w-[1400px] h-full flex flex-col justify-center items-center gap-2 text-white">

            <div className='flex w-full justify-between items-end'>
                <h1 className="text-xl font-semibold mb-4 text-primary">WAVEWARE</h1>
            </div>

            <div className='flex w-full justify-between items-center'>

                <p className="text-3xl font-medium">
                    데이터 속 가치를 찾아 함께<br/> 한 걸음 내딜을 동료를 찾습니다.
                </p>

                <div className='w-[0.5px] h-[60px] bg-white opacity-50'></div>

                <p className='w-[800px] text-lg font-light'>
                    waveware는 IT 전문 지식과 경험을 바탕으로 새로운 가치 창출의 세계로 진입할 준비를 하고 있으며,
                    개인의 지식과 경험을 바탕으로 다양한 솔루션을 모색하기 위해 함께 협업할 팀원을 찾고 있습니다.
                </p>

            </div>

            <div className="flex gap-12 py-20 w-full">
                <CareerCard color="#A1E5A8" title="Growth" description="팀원을 소모품이 아닌 필수품으로 생각하며 함께 성장해 나갈 수 있는 사람"/>
                <CareerCard color="#40D6CA" title="Communication" description="아이디어를 존중하고 받아들이며 적극적인 토론을 통해 함께 성장할 사람"/>
                <CareerCard color="#75DFFF" title="Challenge" description="달성 가능한 목표를 설정하고 달려가며 끊임없이 도전하는 사람"/>
            </div>

            <a href="https://www.saramin.co.kr/zf_user/company-info/view?csn=MlUxNjNTaERsZ0h1Qzg3NlZXUnpHdz09" target="_blank" rel="noopener noreferrer">
                <button
                    className="flex items-center px-6 py-2 border border-white text-white rounded-br-2xl rounded-tl-2xl hover:bg-white hover:text-black transition-colors duration-300">
                    <span className="mr-4 font-light">채용 공고</span>
                    <svg width="30" viewBox="0 0 50 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 13H49V14H0V13Z" fill="currentColor"/>
                        <path d="M34 0L49.0942 13.1212L48.4381 13.8759L33.3439 0.75471L34 0Z" fill="currentColor"/>
                    </svg>
                </button>
            </a>

        </div>
    </section>
  );
}
