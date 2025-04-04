import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuColor, setMenuColor] = useState("text-white");
  const [isVisible, setIsVisible] = useState(false);

  // 네비게이션 아이템 정의
  const NAV_ITEMS = [
    { href: "/company", label: "Company" },
    // { href: "/technology", label: "Technology" }, // 원본에서 주석 처리됨
    { href: "/history", label: "History" },
    { href: "/career", label: "Career" },
    { href: "/contact", label: "Contact" },
  ];

  // 초기 애니메이션 딜레이 - 지연 후 헤더 표시
  useEffect(() => {
    // 초기 로드 시 헤더를 숨겨둡니다
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500); // 애니메이션 이후에 나타나도록 설정

    return () => clearTimeout(timer);
  }, []);

  // 네비게이션 링크 활성화 상태 확인
  const isActive = (href) => {
    const baseStyle = `transition-colors duration-300 ${menuColor}`;

    if (href.startsWith("#")) {
      return router.asPath === href
        ? baseStyle
        : `${baseStyle} hover:opacity-80`;
    }

    return router.asPath.startsWith("/" + href)
      ? baseStyle
      : `${baseStyle} hover:opacity-80`;
  };

  // 스크롤 이벤트와 메뉴 색상 변경 처리
  useEffect(() => {
    // 메인 페이지가 아닌 경우 메뉴 색상을 검은색으로 설정
    if (router.pathname !== "/") {
      setMenuColor("text-black");
      return;
    }

    const handleScroll = () => {
      if (typeof window === "undefined") return;

      // 헤더 표시/숨김 로직
      setShowHeader(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);

      // 현재 스크롤 위치 (화면 중앙 기준)
      const viewportHeight = window.innerHeight;
      const currentScrollMiddle = window.scrollY + viewportHeight / 2;

      // 특정 섹션에서 흰색 텍스트가 필요한지 확인
      const sections = document.querySelectorAll(".w-full.min-h-screen");
      const isInWhiteTextSection = Array.from(sections).some(
        (section, index) => {
          // 첫 번째와 다섯 번째 섹션만 확인 (HeroSection과 Career)
          if (index !== 0 && index !== 4) return false;

          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          return (
            currentScrollMiddle >= sectionTop &&
            currentScrollMiddle <= sectionBottom
          );
        }
      );

      // 메뉴 색상 업데이트
      setMenuColor(isInWhiteTextSection ? "text-white" : "text-black");
    };

    // 초기화 및 이벤트 리스너 설정
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, router.pathname]);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 
        flex justify-between items-center 
        px-[100px] py-1 
        transition-all duration-500 z-10
        ${showHeader ? "translate-y-0" : "-translate-y-full"}
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* 로고 */}
      <Link
        href="/"
        className="text-primary text-[48px] font-bold font-pistara"
      >
        waveware
      </Link>

      {/* 네비게이션 메뉴 */}
      <nav>
        <ul className="flex space-x-8 text-lg">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={isActive(item.href)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
