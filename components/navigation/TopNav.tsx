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

export function TopNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/home", label: "Home", Icon: HomeIcon, IconSolid: HomeIconSolid },
    { href: "/history", label: "History", Icon: ClockIcon, IconSolid: ClockIconSolid },
    { href: "/reminders", label: "Reminders", Icon: BellIcon, IconSolid: BellIconSolid },
    { href: "/profile", label: "Profile", Icon: UserIcon, IconSolid: UserIconSolid },
  ];

  return (
    <nav className="hidden lg:block bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/home" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              InstaScan
            </span>
          </Link>
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const IconComponent = isActive ? item.IconSolid : item.Icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors min-h-[44px] ${
                    isActive
                      ? "bg-slate-50 text-slate-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

