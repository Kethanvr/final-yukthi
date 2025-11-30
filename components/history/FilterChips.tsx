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
            className={`flex items-center gap-2 md:gap-2.5 px-5 md:px-6 py-2.5 md:py-3 rounded-full whitespace-nowrap transition-all min-h-[44px] font-medium shadow-sm ${
              isSelected
                ? "bg-slate-600 text-white hover:bg-slate-700 shadow-md scale-105"
                : "bg-white text-slate-700 border border-stone-300 hover:bg-stone-50 hover:border-stone-400"
            }`}
          >
            <span className="text-lg md:text-xl">{config.icon}</span>
            <span className="text-sm md:text-base">{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}


