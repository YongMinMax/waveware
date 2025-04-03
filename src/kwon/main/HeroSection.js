import React from "react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full"
      style={{
        height: "calc(100vh)",
        borderBottomRightRadius: "140px",
        overflow: "hidden",
      }}
    >
      {/* 배경 비디오 */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/20250313_hero_dg_v_1.mp4" type="video/mp4" />
      </video>

      {/* 컨텐츠 오버레이 */}
      <div className="relative container h-full flex items-center text-white">
        <div className="flex gap-x-28 items-center">
          {/* 텍스트 그룹 */}
          <div className="flex flex-col items-start pb-10 animate-slide-up">
            <span className="text-[32px]">WE ARE</span>
            <h1 className="text-[62px] font-bold">WAVEWARE</h1>
          </div>

          {/* 구분선 */}
          <div className="w-[400px]">
            <div className="w-[400px] h-[10px] bg-white font-medium animate-grow"></div>
          </div>

          {/* 설명 텍스트 */}
          <div className="text-[30px] pt-20 animate-slide-up">
            <p>메타데이터를 처리하고</p>
            <p>과학적 발전을 지원하며</p>
            <p>2D/3D 데이터 시각화를 수행합니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
