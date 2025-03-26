import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isActive = (href) => (router.asPath === href ? 'text-primary' : 'hover:text-gray-700');

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
    <header className={`fixed top-0 left-0 right-0 flex justify-between items-center px-[100px] py-1 bg-white shadow-md transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
      {/* 로고 */}
      <Link href="/" className="text-primary text-[48px] font-bold font-pistara">
        waveware
      </Link>

      {/* 메뉴 */}
      <nav>
        <ul className="flex space-x-8 text-lg">
          <li><a href="#company" className={isActive('#company')}>Company</a></li>
          <li><a href="#technology" className={isActive('#technology')}>Technology</a></li>
          <li><a href="#history" className={isActive('#history')}>History</a></li>
          <li><a href="#career" className={isActive('#career')}>Career</a></li>
          <li><a href="#contact" className={isActive('#contact')}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
