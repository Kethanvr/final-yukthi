"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/navigation/BottomNav";
import { FloatingScanButton } from "@/components/navigation/FloatingScanButton";
import { FilterChips } from "@/components/history/FilterChips";
import { getAllScanResults } from "@/lib/mockData/scanResults";
import { ProductCategory } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function HistoryPage() {
  const router = useRouter();
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
    <div className="min-h-screen pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Scan History</h1>

        {/* Search */}
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-4 space-y-4">
        {/* Filters */}
        <FilterChips
          categories={["All", "Food", "Cosmetic", "Medicine", "Unsafe"]}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Results */}
        {filteredResults.length > 0 ? (
          <div className="space-y-3">
            {filteredResults.map((scan) => (
              <Card
                key={scan.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 overflow-hidden"
                onClick={() => router.push(`/results/${scan.id}`)}
              >
                <CardContent className="p-0">
                  <div className="flex gap-4 p-4">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image
                        src={scan.product.imageUrl}
                        alt={scan.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 line-clamp-1">
                            {scan.product.name}
                          </h3>
                          <p className="text-sm text-gray-500">{scan.product.brand}</p>
                        </div>
                        <Badge
                          className={
                            scan.verdict.badge === "SAFE"
                              ? "bg-green-500 hover:bg-green-600"
                              : scan.verdict.badge === "CAUTION"
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-red-500 hover:bg-red-600"
                          }
                        >
                          {scan.verdict.badge === "SAFE" ? "🟢" : scan.verdict.badge === "CAUTION" ? "🟡" : "🔴"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <span>👤</span>
                          {scan.profileName}
                        </span>
                        <span>•</span>
                        <span>{formatDate(scan.scannedAt)}</span>
                      </div>
                    </div>

                    {/* Chevron */}
                    <div className="flex items-center text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600">
                {searchQuery ? "Try a different search" : "Start scanning products to build your history"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <FloatingScanButton />
      <BottomNav />
    </div>
  );
}
