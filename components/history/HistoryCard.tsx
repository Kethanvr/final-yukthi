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
      className="bg-white rounded-lg shadow-sm border border-stone-200 p-3 md:p-4 lg:p-5 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] lg:active:scale-100"
    >
      <div className="flex gap-3 md:gap-4 lg:gap-5">
        {/* Product Icon */}
        <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-stone-100 rounded-lg flex items-center justify-center text-2xl md:text-3xl flex-shrink-0">
          {CATEGORY_ICONS[product.category]}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 md:gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 line-clamp-1 md:line-clamp-2 text-sm md:text-base lg:text-lg">
                {product.name}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 mt-1">{product.brand}</p>
            </div>
            <SafetyBadge badge={verdict.badge} size="sm" />
          </div>

          <div className="mt-2 md:mt-3 flex items-center gap-2 text-xs md:text-sm text-slate-600">
            <span>👤 {profileName}</span>
            <span>•</span>
            <span>{formatDate(scannedAt)}</span>
          </div>
        </div>

        {/* Chevron */}
        <div className="flex items-center text-stone-400 flex-shrink-0">
          <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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


