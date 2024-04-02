'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { NavPoints } from '@/models/Navigation';

import { DarkModeToggle } from './DarkModeToggle';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="flex py-2 px-8 bg-slate-50 dark:bg-slate-900 justify-between items-center fixed w-full rounded-b-2xl border shadow-sm">
      <Link className="text-lg" href="/">
        <span className="font-semibold text-green-600">Comfy</span>
        <span className="font-light text-orange-600">WishList</span>
      </Link>
      <nav>
        <ul className="flex gap-6 text-sm items-center text-center">
          {NavPoints.map(({ title, href, prefetch }) => (
            <li
              className={cn(pathname === href ? 'font-medium' : 'font-light')}
              key={href}
            >
              <Link href={href} prefetch={prefetch}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <DarkModeToggle />
    </header>
  );
};

export default Header;
