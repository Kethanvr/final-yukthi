"use client";

import { ProductCategory } from "@/lib/types";

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
    All: { icon: "📱", label: "All" },
    Food: { icon: "🥗", label: "Food" },
    Cosmetic: { icon: "💄", label: "Cosmetic" },
    Medicine: { icon: "💊", label: "Medicine" },
    Unsafe: { icon: "🔴", label: "Unsafe" },
  };

  return (
    <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-3 scrollbar-hide lg:overflow-x-visible lg:flex-wrap">
      {categories.map((category) => {
        const config = categoryConfig[category];
        const isSelected = selectedCategory === category;

        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`flex items-center gap-1.5 md:gap-2 px-4 md:px-5 lg:px-6 py-2 md:py-2.5 rounded-full whitespace-nowrap transition-colors min-h-[44px] ${
              isSelected
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span className="text-base md:text-lg">{config.icon}</span>
            <span className="text-sm md:text-base font-medium">{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}


