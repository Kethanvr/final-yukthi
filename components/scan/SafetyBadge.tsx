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
      bg: "bg-slate-100",
      text: "text-slate-700",
      Icon: CheckCircleIcon,
      label: "SAFE",
    },
    CAUTION: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      Icon: ExclamationTriangleIcon,
      label: "CAUTION",
    },
    UNSAFE: {
      bg: "bg-red-50",
      text: "text-red-700",
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


