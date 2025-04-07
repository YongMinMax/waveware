import React, { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    // 모든 애니메이션이 끝난 후 비디오 재생 시작
    const timer = setTimeout(() => {
      setIsVideoReady(true);
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 2000); // 3초 후 비디오 재생

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden"
      style={{
        borderBottomRightRadius: "140px",
      }}
    >
      {/* 배경 비디오 - 처음에는 줌인되고 흐린 상태 */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-800
            ${isVideoReady ? "scale-100 blur-0" : "scale-110 blur-sm"}`}
          autoPlay={false}
          loop
          muted
          playsInline
        >
          <source src="/videos/bg_v_4.mp4" type="video/mp4" />
          {/* <source src="/videos/hero_bg_v_2_row.mp4" type="video/mp4" /> */}
        </video>
      </div>

      {/* 흰색 5분할 오버레이 화면 */}
      <div className="absolute inset-0 flex">
        {/* 1번 섹션 - 240px 고정 */}
        <div className="w-[240px] h-full bg-white transform translate-y-0 animate-section-up-1 relative">
          <div className="absolute right-0 top-0 w-[1px] h-full bg-[#F3F6FC] "></div>
        </div>
        {/* 2번 섹션 - 남은 공간 균등 분할 */}
        <div className="flex-1 h-full bg-white transform translate-y-0 animate-section-up-2 relative">
          <div className="absolute right-0 top-0 w-[1px] h-full bg-[#F3F6FC]"></div>
        </div>
        {/* 3번 섹션 - 남은 공간 균등 분할 */}
        <div className="flex-1 h-full bg-white transform translate-y-0 animate-section-up-3 relative">
          <div className="absolute right-0 top-0 w-[1px] h-full bg-[#F3F6FC]"></div>
        </div>
        {/* 4번 섹션 - 남은 공간 균등 분할 */}
        <div className="flex-1 h-full bg-white transform translate-y-0 animate-section-up-4 relative">
          <div className="absolute right-0 top-0 w-[1px] h-full bg-[#F3F6FC]"></div>
        </div>
        {/* 5번 섹션 - 240px 고정 */}
        <div className="w-[240px] h-full bg-white transform translate-y-0 animate-section-up-5"></div>
      </div>

      {/* 컨텐츠 오버레이 */}
      <div className="relative container h-full flex items-center text-white -mt-[55px]">
        <div className="flex gap-x-28 items-center">
          {/* 텍스트 그룹 */}
          <div className="flex flex-col items-start pb-10">
            <span
              className="text-[32px] opacity-0 animate-text-up"
              style={{ animationDelay: "1.3s" }}
            >
              WE ARE
            </span>
            <h1
              className="text-[72px] font-semibold opacity-0 animate-text-up"
              style={{ animationDelay: "1.4s" }}
            >
              WAVEWARE
            </h1>
          </div>

          {/* 구분선 */}
          <div className="w-[400px] overflow-hidden">
            <div
              className="w-[400px] h-[8px] bg-white font-medium animate-line-grow"
              style={{ animationDelay: "1.3s" }}
            ></div>
          </div>

          {/* 설명 텍스트 */}
          <div className="text-[30px] pt-20 whitespace-nowrap">
            <p
              className="opacity-0 animate-text-up"
              style={{ animationDelay: "1.5s" }}
            >
              메타 데이터를 통해
            </p>
            <p
              className="opacity-0 animate-text-up"
              style={{ animationDelay: "1.6s" }}
            >
              과학적 발전을 지원하며
            </p>
            <p
              className="opacity-0 animate-text-up"
              style={{ animationDelay: "1.7s" }}
            >
              2D/3D 데이터 시각화를
            </p>
            <p
              className="opacity-0 animate-text-up"
              style={{ animationDelay: "1.8s" }}
            >
              수행합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 스크롤 유도 UI */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in"
        style={{ animationDelay: "2s" }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-scroll-down"></div>
        </div>
        <span className="text-white text-sm">Scroll Down</span>
      </div>
    </section>
  );
}
