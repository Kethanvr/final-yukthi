import { SafetyBadge as SafetyBadgeType } from "@/lib/types";

interface SafetyBadgeProps {
  badge: SafetyBadgeType;
  score?: number;
  size?: "sm" | "md" | "lg";
}

export function SafetyBadge({ badge, score, size = "md" }: SafetyBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  const badgeConfig = {
    SAFE: {
      bg: "bg-green-100",
      text: "text-green-800",
      icon: "🟢",
      label: "SAFE",
    },
    CAUTION: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      icon: "🟡",
      label: "CAUTION",
    },
    UNSAFE: {
      bg: "bg-red-100",
      text: "text-red-800",
      icon: "🔴",
      label: "UNSAFE",
    },
  };

  const config = badgeConfig[badge];

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${config.bg} ${config.text} ${sizeClasses[size]}`}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
      {score !== undefined && size !== "sm" && (
        <span className="ml-1 opacity-75">({score}/100)</span>
      )}
    </div>
  );
}

