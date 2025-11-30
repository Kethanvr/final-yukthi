"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ClockIcon,
  BellIcon,
  UserIcon,
  CameraIcon,
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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 shadow-sm" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="max-w-screen-xl mx-auto px-2">
        <div className="flex justify-around items-center h-16 lg:h-20 relative">
          {navItems.slice(0, 2).map((item) => {
            const isActive = pathname.startsWith(item.href);
            const IconComponent = isActive ? item.IconSolid : item.Icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full min-h-[44px] transition-colors active:scale-95 ${
                  isActive
                    ? "text-slate-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <IconComponent className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
          
          {/* Center Scan Button - Enhanced */}
          <Link
            href="/camera"
            className="absolute left-1/2 -translate-x-1/2 -top-7 lg:-top-8 w-16 h-16 lg:w-20 lg:h-20 bg-slate-700 hover:bg-slate-800 active:bg-slate-900 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all active:scale-90 z-10 border-4 border-white"
            aria-label="Scan Product"
          >
            <CameraIcon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
          </Link>

          {navItems.slice(2).map((item) => {
            const isActive = pathname.startsWith(item.href);
            const IconComponent = isActive ? item.IconSolid : item.Icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full min-h-[44px] transition-colors active:scale-95 ${
                  isActive
                    ? "text-slate-600"
                    : "text-slate-600 hover:text-slate-900"
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


