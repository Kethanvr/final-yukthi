"use client";

import { UserProfile } from "@/lib/types";
import { useState } from "react";
import { Avatar } from "./Avatar";

interface ProfileSwitcherProps {
  profiles: UserProfile[];
  currentProfile: UserProfile;
  onProfileChange: (profile: UserProfile) => void;
}

export function ProfileSwitcher({
  profiles,
  currentProfile,
  onProfileChange,
}: ProfileSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-md px-2 py-1.5 hover:bg-slate-50 transition-colors min-h-[36px]"
      >
        <Avatar profile={currentProfile} size="sm" className="flex-shrink-0" />
        <span className="font-medium text-slate-700 text-xs sm:text-sm hidden sm:inline">{currentProfile.name}</span>
        <svg
          className={`w-3.5 h-3.5 text-slate-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed md:absolute top-auto md:top-full bottom-0 md:bottom-auto left-0 md:left-auto right-0 md:right-0 md:mt-2 w-full md:w-64 max-w-full md:max-w-none mx-auto md:mx-0 bg-white border-t md:border border-slate-200 rounded-t-lg md:rounded-lg shadow-lg z-[9999] max-h-[80vh] md:max-h-none overflow-y-auto">
            <div className="md:hidden px-4 py-3 border-b border-slate-200 bg-white sticky top-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900 text-base">Select Profile</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="py-1 md:py-1">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => {
                    onProfileChange(profile);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 md:px-3 py-3 md:py-2.5 hover:bg-slate-50 transition-colors min-h-[60px] md:min-h-[52px] ${
                    profile.id === currentProfile.id ? "bg-slate-50 border-l-4 border-l-slate-700 md:border-l-0" : ""
                  }`}
                >
                  <div className="flex-shrink-0">
                    <Avatar profile={profile} size="sm" className="hidden md:flex" />
                    <Avatar profile={profile} size="sm" className="md:hidden" />
                  </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="font-semibold text-slate-900 text-sm md:text-xs">{profile.name}</div>
                      <div className="text-xs md:text-[10px] text-slate-600 mt-0.5 font-medium">
                      {profile.age} years • {profile.biologicalSex}
                    </div>
                  </div>
                  {profile.id === currentProfile.id && (
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 md:w-4 md:h-4 text-slate-700"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}


