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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Product Image */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
          {CATEGORY_ICONS[product.category]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-gray-500">{product.brand}</div>
          <h1 className="text-xl font-bold text-gray-900 mt-1">
            {product.name}
          </h1>
          <div className="text-sm text-gray-600 mt-1">{product.category}</div>
        </div>
      </div>

      {/* Safety Badge */}
      <div className="mb-4">
        <SafetyBadge badge={badge} score={score} size="lg" />
      </div>

      {/* AI Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <span className="text-blue-600 text-xl flex-shrink-0">🤖</span>
          <div>
            <div className="text-xs font-semibold text-blue-900 mb-1">
              AI Analysis for {profileName}
            </div>
            <p className="text-sm text-blue-800">{summaryText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

