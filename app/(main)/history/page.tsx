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
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  UserIcon,
  FolderIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

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
    <div className="min-h-screen pb-20 lg:pb-6 bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 shadow-sm">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-5 md:mb-6">Scan History</h1>

          {/* Search */}
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-base md:text-lg border border-stone-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 shadow-sm transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
        {/* Filters */}
        <FilterChips
          categories={["All", "Food", "Cosmetic", "Medicine", "Unsafe"]}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Results - Single column mobile, 2 columns desktop */}
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {filteredResults.map((scan) => (
              <Card
                key={scan.id}
                className="cursor-pointer hover:shadow-md active:scale-[0.98] lg:active:scale-100 transition-all duration-200 overflow-hidden border border-gray-200 bg-white"
                onClick={() => router.push(`/results/${scan.id}`)}
              >
                <CardContent className="p-0">
                  <div className="flex gap-4 sm:gap-5 p-4 sm:p-5 md:p-6">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100 shadow-sm">
                      <Image
                        src={scan.product.imageUrl}
                        alt={scan.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base sm:text-lg md:text-xl text-slate-900 line-clamp-2 mb-1">
                              {scan.product.name}
                            </h3>
                            <p className="text-sm sm:text-base text-slate-600">{scan.product.brand}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <div
                              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-sm ${
                                scan.verdict.badge === "SAFE"
                                  ? "bg-slate-600"
                                  : scan.verdict.badge === "CAUTION"
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                              }`}
                            >
                              {scan.verdict.badge === "SAFE" ? (
                                <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              ) : scan.verdict.badge === "CAUTION" ? (
                                <ExclamationTriangleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              ) : (
                                <XCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 mt-2">
                        <span className="flex items-center gap-1.5">
                          <UserIcon className="w-4 h-4" />
                          <span className="font-medium">{scan.profileName}</span>
                        </span>
                        <span className="text-stone-400">•</span>
                        <span>{formatDate(scan.scannedAt)}</span>
                      </div>
                    </div>

                    {/* Chevron */}
                    <div className="flex items-center text-stone-400 flex-shrink-0 self-center">
                      <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 sm:p-12 md:p-16 lg:p-20 text-center">
              <FolderIcon className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto text-stone-300 mb-3 sm:mb-4 md:mb-5" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                No results found
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-slate-600">
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
