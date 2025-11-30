"use client";

import { ProductCategory } from "@/lib/types";
import { CATEGORY_HEROICONS } from "@/lib/constants/categories";

interface FilterChipsProps {
  categories: (ProductCategory | "All" | "Unsafe")[];
  selectedCategory: ProductCategory | "All" | "Unsafe";
  onCategoryChange: (category: ProductCategory | "All" | "Unsafe") => void;
}

export function FilterChips({
  categories,
  selectedCategory,
  onCategoryChange,
}: FilterChipsProps) {
  const categoryConfig = {
    All: { label: "All", icon: null },
    Food: { label: "Food", icon: CATEGORY_HEROICONS.Food },
    Cosmetic: { label: "Cosmetics", icon: CATEGORY_HEROICONS.Cosmetic },
    Medicine: { label: "Medicine", icon: CATEGORY_HEROICONS.Medicine },
    Unsafe: { label: "Unsafe", icon: null },
  };

  return (
    <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-3 scrollbar-hide lg:overflow-x-visible lg:flex-wrap">
      {categories.map((category) => {
        const config = categoryConfig[category];
        const isSelected = selectedCategory === category;
        const IconComponent = config.icon;

        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`flex items-center justify-center gap-1.5 px-4 md:px-5 py-2 md:py-2.5 rounded-full whitespace-nowrap transition-all min-h-[40px] text-sm md:text-base font-medium ${
              isSelected
                ? "bg-blue-600 text-white hover:bg-blue-700 border border-blue-600"
                : "bg-white text-[#1E1F23] border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            {IconComponent && <IconComponent className="w-4 h-4" />}
            <span>{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}


