"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/navigation/BottomNav";
import { FloatingScanButton } from "@/components/navigation/FloatingScanButton";
import { HistoryCard } from "@/components/history/HistoryCard";
import { FilterChips } from "@/components/history/FilterChips";
import { getAllScanResults } from "@/lib/mockData/scanResults";
import { ProductCategory } from "@/lib/types";
import { useApp } from "@/lib/context/AppContext";

export default function HistoryPage() {
  const router = useRouter();
  const { currentProfile } = useApp();
  const [scanResults, setScanResults] = useState(getAllScanResults());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "All" | "Unsafe">("All");

  useEffect(() => {
    setScanResults(getAllScanResults());
  }, []);

  const filteredResults = scanResults.filter((scan) => {
    const matchesSearch =
      scan.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.product.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Unsafe" && scan.verdict.badge === "UNSAFE") ||
      scan.product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Scan History</h1>

        {/* Search */}
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-4">
        {/* Filters */}
        <FilterChips
          categories={["All", "Food", "Cosmetic", "Medicine", "Unsafe"]}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Results */}
        {filteredResults.length > 0 ? (
          <div className="mt-4 space-y-3">
            {filteredResults.map((scan) => (
              <HistoryCard
                key={scan.id}
                scanResult={scan}
                onClick={() => router.push(`/results/${scan.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-600">
              {searchQuery ? "Try a different search" : "Start scanning products to build your history"}
            </p>
          </div>
        )}
      </div>

      <FloatingScanButton />
      <BottomNav />
    </div>
  );
}

