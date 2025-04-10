import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NAV_ITEMS = [
  { href: "/company", label: "Company" },
  { href: "/history", label: "History" },
  { href: "/career", label: "Career" },
  { href: "/contact", label: "Contact" },
];

interface HeaderProps {
    isDark?: boolean;
}

export default function Header({ isDark }: HeaderProps) {
  const router = useRouter();

  const isActive = (href) => {
    return router.asPath.startsWith(href) ? 'text-primary' : 'hover:text-gray-500';
  };

  return (
    <header className={`fixed top-0 left-0 right-0 flex justify-between items-center px-[100px] py-1 transition-colors duration-500 z-50 translate-y-0
                      ${isDark ? '' : ' bg-white/90 backdrop-blur-sm'}
                      `}>

      {/* 로고 */}
      <Link href="/" className="text-primary text-[48px] font-bold font-pistara">
        waveware
      </Link>

      {/* 메뉴 */}
      <nav>
        <ul className={`flex space-x-8 text-lg transition-colors duration-300 ${isDark ? 'text-white' : ''}`}>
          {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={`${isActive(item.href)}`}>
                    {item.label}
                </Link>
              </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
