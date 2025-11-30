"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ClockIcon,
  BellIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  ClockIcon as ClockIconSolid,
  BellIcon as BellIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/home", label: "Home", Icon: HomeIcon, IconSolid: HomeIconSolid },
    { href: "/history", label: "History", Icon: ClockIcon, IconSolid: ClockIconSolid },
    { href: "/reminders", label: "Reminders", Icon: BellIcon, IconSolid: BellIconSolid },
    { href: "/profile", label: "Profile", Icon: UserIcon, IconSolid: UserIconSolid },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="max-w-screen-xl mx-auto px-2">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const IconComponent = isActive ? item.IconSolid : item.Icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full min-h-[44px] transition-colors ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <IconComponent className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}


