import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  title: string;
  path: string;
}

interface NavigationMenuProps {
  activeSection: string;
}

export default function NavigationMenu({ activeSection }: NavigationMenuProps) {
  const navItems: NavItem[] = [
    { id: 'about', title: '0. ABOUT', path: '#about' },
    { id: 'skills', title: '1. SKILLS', path: '#skills' },
    { id: 'work', title: '2. WORK', path: '#work' },
    { id: 'projects', title: '3. PROJECTS', path: '#projects' },
    { id: 'contact', title: '4. CONTACT', path: '#contact' },
    { id: 'resume', title: '5. RESUME', path: '#resume' },
  ];

  return (
    <nav className="fixed top-8 right-8 z-50 hidden md:block">
      <ul className="flex items-center space-x-8 text-responsive-h6">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link
              href={item.path}
              className={cn(
                "relative transition-colors duration-300 hover:text-secondary",
                activeSection === item.id ? "text-secondary" : "text-text"
              )}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function MobileNavigation({ activeSection }: NavigationMenuProps) {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end md:hidden">
      <div className="flex flex-col items-end space-y-4">
        {Array(6).fill(0).map((_, i) => (
          <Link
            key={i}
            href={`#${['about', 'skills', 'work', 'projects', 'contact', 'resume'][i]}`}
            className="block"
          >
            <div
              className={cn(
                "nav-dot",
                activeSection === ['about', 'skills', 'work', 'projects', 'contact', 'resume'][i] ? 'active' : ''
              )}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
