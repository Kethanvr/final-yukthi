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
      bg: "bg-green-600",
      text: "text-white",
      label: "SAFE",
    },
    CAUTION: {
      bg: "bg-amber-500",
      text: "text-white",
      label: "CAUTION",
    },
    UNSAFE: {
      bg: "bg-red-600",
      text: "text-white",
      label: "UNSAFE",
    },
  };

  const config = badgeConfig[badge];

  return (
    <div
      className={`inline-flex items-center rounded-md font-semibold ${config.bg} ${config.text} ${sizeClasses[size]}`}
    >
      <span>{config.label}</span>
      {score !== undefined && size !== "sm" && (
        <span className="ml-1 opacity-90">({score}/100)</span>
      )}
    </div>
  );
}


