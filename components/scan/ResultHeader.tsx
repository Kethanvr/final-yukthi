import { Product } from "@/lib/types";
import { SafetyBadge } from "./SafetyBadge";
import { CATEGORY_ICONS } from "@/lib/constants/categories";

interface ResultHeaderProps {
  product: Product;
  badge: "SAFE" | "CAUTION" | "UNSAFE";
  score: number;
  summaryText: string;
  profileName: string;
}

export function ResultHeader({
  product,
  badge,
  score,
  summaryText,
  profileName,
}: ResultHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-4 md:p-5 lg:p-6">
      {/* Product Image - Horizontal layout on desktop */}
      <div className="flex items-start gap-3 md:gap-4 lg:gap-5 mb-4 md:mb-5 lg:mb-6">
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-stone-100 rounded-lg flex items-center justify-center text-2xl md:text-3xl lg:text-4xl flex-shrink-0">
          {CATEGORY_ICONS[product.category]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs md:text-sm lg:text-base text-slate-500">{product.brand}</div>
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900 mt-1 md:mt-2">
            {product.name}
          </h1>
          <div className="text-xs md:text-sm lg:text-base text-slate-600 mt-1">{product.category}</div>
        </div>
      </div>

      {/* Safety Badge */}
      <div className="mb-4 md:mb-5 lg:mb-6">
        <SafetyBadge badge={badge} score={score} size="lg" />
      </div>

      {/* AI Summary */}
      <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 md:p-4 lg:p-5">
        <div className="flex items-start gap-2 md:gap-3">
          <span className="text-slate-600 text-lg md:text-xl lg:text-2xl flex-shrink-0">🤖</span>
          <div className="flex-1 min-w-0">
            <div className="text-xs md:text-sm font-semibold text-slate-900 mb-1 md:mb-2">
              AI Analysis for {profileName}
            </div>
            <p className="text-xs md:text-sm lg:text-base text-slate-700">{summaryText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


