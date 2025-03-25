import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  
  const isActive = (href) => router.asPath === href ? 'text-primary' : 'hover:text-gray-700';

  return (
    <header className="flex justify-between items-center px-[100px] py-1 bg-white shadow-md">
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
