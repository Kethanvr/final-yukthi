import { ScanResult } from "@/lib/types";
import { SafetyBadge } from "../scan/SafetyBadge";
import { CATEGORY_ICONS } from "@/lib/constants/categories";

interface HistoryCardProps {
  scanResult: ScanResult;
  onClick?: () => void;
}

export function HistoryCard({ scanResult, onClick }: HistoryCardProps) {
  const { product, verdict, profileName, scannedAt } = scanResult;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex gap-4">
        {/* Product Icon */}
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
          {CATEGORY_ICONS[product.category]}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">{product.brand}</p>
            </div>
            <SafetyBadge badge={verdict.badge} size="sm" />
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
            <span>👤 {profileName}</span>
            <span>•</span>
            <span>{formatDate(scannedAt)}</span>
          </div>
        </div>

        {/* Chevron */}
        <div className="flex items-center text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}


