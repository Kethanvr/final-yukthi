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
    <div className="min-h-screen pb-20 lg:pb-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 lg:py-6 shadow-sm">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-5 lg:mb-6">Scan History</h1>

          {/* Search */}
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 md:py-3.5 lg:py-4 text-base md:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
          />
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {filteredResults.map((scan) => (
              <Card
                key={scan.id}
                className="cursor-pointer hover:shadow-lg active:scale-[0.98] lg:active:scale-100 transition-all duration-200 overflow-hidden"
                onClick={() => router.push(`/results/${scan.id}`)}
              >
                <CardContent className="p-0">
                  <div className="flex gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-5 lg:p-6">
                    {/* Product Image */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image
                        src={scan.product.imageUrl}
                        alt={scan.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2 md:mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-gray-900 line-clamp-2">
                            {scan.product.name}
                          </h3>
                          <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1">{scan.product.brand}</p>
                        </div>
                        <Badge
                          className={
                            scan.verdict.badge === "SAFE"
                              ? "bg-slate-500 hover:bg-slate-600"
                              : scan.verdict.badge === "CAUTION"
                              ? "bg-amber-500 hover:bg-amber-600"
                              : "bg-red-500 hover:bg-red-600"
                          }
                        >
                          {scan.verdict.badge === "SAFE" ? (
                            <CheckCircleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                          ) : scan.verdict.badge === "CAUTION" ? (
                            <ExclamationTriangleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                          ) : (
                            <XCircleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                          )}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 text-[10px] sm:text-xs md:text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <UserIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                          {scan.profileName}
                        </span>
                        <span>•</span>
                        <span>{formatDate(scan.scannedAt)}</span>
                      </div>
                    </div>

                    {/* Chevron */}
                    <div className="flex items-center text-gray-400">
                      <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 sm:p-12 md:p-16 lg:p-20 text-center">
              <FolderIcon className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto text-gray-300 mb-3 sm:mb-4 md:mb-5" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
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
