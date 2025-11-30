"use client";

import { UserProfile } from "@/lib/types";
import { useState } from "react";

interface AvatarProps {
  profile: UserProfile;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

// Get neutral avatar styling based on profile
function getAvatarStyle(profile: UserProfile) {
  // Use neutral colors - subtle gray/blue palette
  const bgColor = "bg-slate-100";
  const borderColor = "border-slate-300";
  const textColor = "text-slate-700";
  
  return { bgColor, borderColor, textColor };
}

const sizeClasses = {
  sm: "w-12 h-12 text-sm",
  md: "w-16 h-16 text-base",
  lg: "w-24 h-24 text-2xl",
  xl: "w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-3xl md:text-4xl lg:text-5xl",
};

// Get first letter of name for fallback
function getInitial(name: string): string {
  if (!name) return "?";
  return name.charAt(0).toUpperCase();
}

export function Avatar({ profile, size = "md", className = "" }: AvatarProps) {
  const avatarStyle = getAvatarStyle(profile);
  const sizeClass = sizeClasses[size];
  const [imageError, setImageError] = useState(false);
  
  // Check if profile has an image URL and it hasn't errored
  const hasImage = profile.avatarUrl && profile.avatarUrl.trim() !== "" && !imageError;
  
  return (
    <div
      className={`${sizeClass} ${avatarStyle.bgColor} ${avatarStyle.borderColor} border-2 rounded-full flex items-center justify-center shadow-sm overflow-hidden ${className}`}
    >
      {hasImage ? (
        <img
          src={profile.avatarUrl!}
          alt={profile.name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className={`${avatarStyle.textColor} font-semibold`}>
          {getInitial(profile.name)}
        </span>
      )}
    </div>
  );
}

