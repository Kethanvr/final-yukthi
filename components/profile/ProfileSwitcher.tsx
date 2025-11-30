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
        className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 md:px-4 md:py-2 hover:bg-gray-50 transition-colors min-h-[44px]"
      >
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-500 flex items-center justify-center text-white font-semibold text-xs md:text-sm">
          {currentProfile.name.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium text-gray-900 text-sm md:text-base hidden sm:inline">{currentProfile.name}</span>
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
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed md:absolute top-auto md:top-full bottom-0 md:bottom-auto left-0 md:left-auto right-0 md:right-0 md:mt-2 w-full md:w-64 max-w-sm md:max-w-none mx-auto md:mx-0 bg-white border-t md:border border-gray-200 rounded-t-2xl md:rounded-lg shadow-xl md:shadow-lg z-50 py-2 max-h-[60vh] md:max-h-none overflow-y-auto">
            <div className="md:hidden px-4 py-2 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">Select Profile</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="py-2">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => {
                    onProfileChange(profile);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors min-h-[60px] ${
                    profile.id === currentProfile.id ? "bg-slate-50" : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-slate-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-medium text-gray-900">{profile.name}</div>
                    <div className="text-xs text-gray-500">
                      {profile.age} years • {profile.biologicalSex}
                    </div>
                  </div>
                  {profile.id === currentProfile.id && (
                    <svg
                      className="w-5 h-5 text-slate-600 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
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


