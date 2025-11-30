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
    <div className="min-h-screen pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-4 py-3 sm:py-4 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Scan History</h1>

        {/* Search */}
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4">
        {/* Filters */}
        <FilterChips
          categories={["All", "Food", "Cosmetic", "Medicine", "Unsafe"]}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Results */}
        {filteredResults.length > 0 ? (
          <div className="space-y-2 sm:space-y-3">
            {filteredResults.map((scan) => (
              <Card
                key={scan.id}
                className="cursor-pointer hover:shadow-lg active:scale-[0.98] transition-all duration-200 overflow-hidden"
                onClick={() => router.push(`/results/${scan.id}`)}
              >
                <CardContent className="p-0">
                  <div className="flex gap-3 sm:gap-4 p-3 sm:p-4">
                    {/* Product Image */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image
                        src={scan.product.imageUrl}
                        alt={scan.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-1">
                            {scan.product.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500">{scan.product.brand}</p>
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
                          {scan.verdict.badge === "SAFE" ? (
                            <CheckCircleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          ) : scan.verdict.badge === "CAUTION" ? (
                            <ExclamationTriangleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          ) : (
                            <XCircleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          )}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <UserIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          {scan.profileName}
                        </span>
                        <span>•</span>
                        <span>{formatDate(scan.scannedAt)}</span>
                      </div>
                    </div>

                    {/* Chevron */}
                    <div className="flex items-center text-gray-400">
                      <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 sm:p-12 text-center">
              <FolderIcon className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
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
