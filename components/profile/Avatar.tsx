"use client";

import { UserProfile } from "@/lib/types";

interface AvatarProps {
  profile: UserProfile;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

// Generate a cartoon avatar based on profile data
function getAvatarStyle(profile: UserProfile) {
  // Use name hash to get consistent colors
  const nameHash = profile.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Different avatar styles based on age and sex
  const isChild = profile.age < 18;
  const isElderly = profile.age > 60;
  
  // Color palettes for different profiles
  const colors = [
    { bg: "bg-blue-400", border: "border-blue-500" },
    { bg: "bg-purple-400", border: "border-purple-500" },
    { bg: "bg-pink-400", border: "border-pink-500" },
    { bg: "bg-green-400", border: "border-green-500" },
    { bg: "bg-yellow-400", border: "border-yellow-500" },
    { bg: "bg-indigo-400", border: "border-indigo-500" },
  ];
  
  const colorIndex = nameHash % colors.length;
  const selectedColor = colors[colorIndex];
  
  // Emoji/character based on profile
  let emoji = "👤";
  if (isChild) {
    emoji = profile.biologicalSex === "Male" ? "👦" : "👧";
  } else if (isElderly) {
    emoji = profile.biologicalSex === "Male" ? "👴" : "👵";
  } else {
    emoji = profile.biologicalSex === "Male" ? "🧑" : "👩";
  }
  
  return { ...selectedColor, emoji };
}

const sizeClasses = {
  sm: "w-12 h-12 text-2xl",
  md: "w-16 h-16 text-3xl",
  lg: "w-24 h-24 text-5xl",
  xl: "w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-6xl md:text-7xl lg:text-8xl",
};

export function Avatar({ profile, size = "md", className = "" }: AvatarProps) {
  const avatarStyle = getAvatarStyle(profile);
  const sizeClass = sizeClasses[size];
  
  return (
    <div
      className={`${sizeClass} ${avatarStyle.bg} ${avatarStyle.border} border-4 rounded-full flex items-center justify-center shadow-lg ${className}`}
    >
      <span className="select-none">{avatarStyle.emoji}</span>
    </div>
  );
}

