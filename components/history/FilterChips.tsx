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
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const config = categoryConfig[category];
        const isSelected = selectedCategory === category;

        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              isSelected
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span>{config.icon}</span>
            <span className="text-sm font-medium">{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}

