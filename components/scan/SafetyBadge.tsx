import { SafetyBadge as SafetyBadgeType } from "@/lib/types";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

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

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const badgeConfig = {
    SAFE: {
      bg: "bg-green-100",
      text: "text-green-800",
      Icon: CheckCircleIcon,
      label: "SAFE",
    },
    CAUTION: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      Icon: ExclamationTriangleIcon,
      label: "CAUTION",
    },
    UNSAFE: {
      bg: "bg-red-100",
      text: "text-red-800",
      Icon: XCircleIcon,
      label: "UNSAFE",
    },
  };

  const config = badgeConfig[badge];
  const IconComponent = config.Icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${config.bg} ${config.text} ${sizeClasses[size]}`}
    >
      <IconComponent className={iconSizes[size]} />
      <span>{config.label}</span>
      {score !== undefined && size !== "sm" && (
        <span className="ml-1 opacity-75">({score}/100)</span>
      )}
    </div>
  );
}


