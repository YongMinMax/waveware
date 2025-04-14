import React, {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

const NAV_ITEMS = [
  {href: "/company", label: "Company"},
  {href: "/history", label: "History"},
  {href: "/career", label: "Career"},
  {href: "/contact", label: "Contact"},
];

interface HeaderProps {
  isDark?: boolean;
}

export default function Header({isDark}: HeaderProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href) => {
    return router.asPath.startsWith(href) ? 'text-primary' : 'hover:text-gray-500';
  };

  return (
    <header className={`fixed top-0 left-0 right-0 flex transition-colors duration-300 justify-between items-center px-4 md:px-[100px] py-1 z-50 translate-y-0
                      ${isMenuOpen ? 'bg-white' : isDark ? '' : ' bg-white/90 backdrop-blur-sm'}
                      `}>

      {/* 로고 */}
      <Link href="/" className="text-primary text-[48px] font-bold font-pistara">
        waveware
      </Link>

      {/* 데스크탑 네비게이션 */}
      <nav className={"hidden md:block"}>
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

      {/* 모바일 네비게이션 */}

      <button
        className="md:hidden text-3xl text-primary"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      <div
        className={`absolute top-full left-0 right-0 bg-white shadow-md md:hidden z-50 overflow-hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <ul className="flex flex-col items-center py-4 space-y-4 text-lg">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="block px-4 py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </header>
  );
}
