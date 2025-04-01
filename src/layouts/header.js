import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isActive = (href) => {
    // '#' 문자가 포함된 링크의 경우 정확히 일치하는지 확인
    if (href.startsWith('#')) {
      return router.asPath === href ? 'text-primary' : 'hover:text-gray-700';
    }
    // 일반 페이지 링크의 경우 경로가 시작하는지 확인
    return router.asPath.startsWith('/' + href) ? 'text-primary' : 'hover:text-gray-700';
  };

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) {
          // 스크롤을 내릴 때
          setShowHeader(false);
        } else {
          // 스크롤을 올릴 때
          setShowHeader(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className={`fixed top-0 left-0 right-0 flex justify-between items-center px-[100px] py-1 bg-white/90 backdrop-blur-sm shadow-md transition-transform duration-300 z-50 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
      {/* 로고 */}
      <Link href="/" className="text-primary text-[48px] font-bold font-pistara">
        waveware
      </Link>

      {/* 메뉴 */}
      <nav>
        <ul className="flex space-x-8 text-lg">
          <li><Link href="/company" className={isActive('company')}>Company</Link></li>
          {/*<li><Link href="/technology" className={isActive('technology')}>Technology</Link></li>*/}
          <li><Link href="/history" className={isActive('history')}>History</Link></li>
          <li><Link href="/career" className={isActive('career')}>Career</Link></li>
          <li><Link href="/contact" className={isActive('contact')}>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
