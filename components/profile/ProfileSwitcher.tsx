"use client";

import { UserProfile } from "@/lib/types";
import { useState } from "react";

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
        className="flex items-center gap-2 bg-white border border-stone-200 rounded-full px-3 py-1.5 md:px-4 md:py-2 hover:bg-stone-50 transition-colors min-h-[44px]"
      >
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-500 flex items-center justify-center text-white font-semibold text-xs md:text-sm">
          {currentProfile.name.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium text-slate-900 text-sm md:text-base hidden sm:inline">{currentProfile.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed md:absolute top-auto md:top-full bottom-0 md:bottom-auto left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 md:right-0 md:mt-2 w-full md:w-64 max-w-md md:max-w-none mx-auto md:mx-0 bg-white border-t md:border border-stone-200 rounded-t-3xl md:rounded-lg shadow-2xl md:shadow-lg z-50 max-h-[70vh] md:max-h-none overflow-y-auto">
            <div className="md:hidden px-6 py-4 border-b border-stone-200 bg-white sticky top-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900 text-lg">Select Profile</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="py-2 md:py-2">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => {
                    onProfileChange(profile);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-6 md:px-4 py-4 md:py-3 hover:bg-stone-50 transition-colors min-h-[72px] md:min-h-[60px] ${
                    profile.id === currentProfile.id ? "bg-slate-50 border-l-4 border-l-slate-600 md:border-l-0" : ""
                  }`}
                >
                  <div className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-slate-600 flex items-center justify-center text-white font-semibold text-lg md:text-base flex-shrink-0 shadow-sm">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="font-semibold text-slate-900 text-base md:text-sm">{profile.name}</div>
                      <div className="text-sm md:text-xs text-slate-500 mt-0.5">
                      {profile.age} years • {profile.biologicalSex}
                    </div>
                  </div>
                  {profile.id === currentProfile.id && (
                    <div className="flex-shrink-0">
                      <svg
                        className="w-6 h-6 md:w-5 md:h-5 text-slate-600"
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


