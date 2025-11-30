import { Product } from "@/lib/types";
import { CATEGORY_ICONS } from "@/lib/constants/categories";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="aspect-square relative bg-stone-100">
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          {CATEGORY_ICONS[product.category]}
        </div>
      </div>
      <div className="p-4">
        <div className="text-xs text-slate-500 mb-1">{product.brand}</div>
        <h3 className="font-semibold text-slate-900 line-clamp-2">
          {product.name}
        </h3>
        <div className="mt-2 text-xs text-slate-600">
          {product.category}
        </div>
      </div>
    </div>
  );
}


