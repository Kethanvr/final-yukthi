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
    All: { label: "All" },
    Food: { label: "Food" },
    Cosmetic: { label: "Cosmetic" },
    Medicine: { label: "Medicine" },
    Unsafe: { label: "Unsafe" },
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
            className={`flex items-center justify-center px-5 md:px-6 py-2.5 md:py-3 rounded-full whitespace-nowrap transition-all min-h-[44px] font-medium shadow-sm ${
              isSelected
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md scale-105"
                : "bg-white text-blue-700 border border-blue-300 hover:bg-blue-50 hover:border-blue-400"
            }`}
          >
            <span className="text-sm md:text-base font-medium">{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}


