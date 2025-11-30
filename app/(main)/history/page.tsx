"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/navigation/BottomNav";
import { FilterChips } from "@/components/history/FilterChips";
import { getAllScanResults } from "@/lib/mockData/scanResults";
import { ProductCategory } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  UserIcon,
  FolderIcon,
} from "@heroicons/react/24/solid";
import { SafetyBadge } from "@/components/scan/SafetyBadge";

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
    const diffMonths = Math.floor(diffDays / 30);

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffMonths === 1) return "Last month";
    if (diffMonths < 12) return `${diffMonths} months ago`;
    return date.toLocaleDateString();
  };

  const extractKeyRisk = (scan: typeof scanResults[0]): string => {
    // First, try to extract from dataPoints (CRITICAL or HIGH_RISK)
    const criticalDataPoint = scan.dataPoints.find(
      (dp) => dp.status === "CRITICAL" || dp.status === "HIGH_RISK"
    );
    
    if (criticalDataPoint) {
      // Format: "Tartrazine (E102) — unsafe for kids" or "19g sugar per serving — risky for diabetes"
      if (criticalDataPoint.explanation) {
        return criticalDataPoint.explanation;
      }
      // Fallback to label and value
      return `${criticalDataPoint.label}: ${criticalDataPoint.value}`;
    }

    // Fallback to summaryText, but make it more concise
    const summary = scan.verdict.summaryText;
    
    // If summary contains "UNSAFE" or "CAUTION", extract the key part
    if (summary.includes("UNSAFE") || summary.includes("CAUTION")) {
      // Try to extract the key issue after the badge text
      const parts = summary.split(/UNSAFE|CAUTION/);
      if (parts.length > 1 && parts[1].trim()) {
        return parts[1].trim().replace(/^for\s+\w+\.\s*/i, "").replace(/\.$/, "");
      }
    }

    // For SAFE products, return a simple message
    if (scan.verdict.badge === "SAFE") {
      return "No allergens for this profile";
    }

    // Default: return a shortened version of summary
    return summary.length > 80 ? summary.substring(0, 77) + "..." : summary;
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-6 bg-[#F7F9FC]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E9F0] px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 shadow-sm">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E1F23] mb-4 sm:mb-5 md:mb-6">Safety History</h1>

          {/* Search */}
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-base md:text-lg border border-[#E5E9F0] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all bg-white text-[#1E1F23]"
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
            {filteredResults.map((scan) => {
              const keyRisk = extractKeyRisk(scan);
              return (
                <Card
                  key={scan.id}
                  className="cursor-pointer hover:shadow-lg active:scale-[0.98] lg:active:scale-100 transition-all duration-200 overflow-hidden border border-[#E5E9F0] bg-white rounded-lg shadow-sm"
                  onClick={() => router.push(`/results/${scan.id}`)}
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex gap-3 sm:gap-4">
                      {/* Small Thumbnail */}
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
                        {/* Badge and Product Name Row */}
                        <div className="flex items-start gap-2 mb-2">
                          <SafetyBadge badge={scan.verdict.badge} size="sm" />
                          <h3 className="font-bold text-base sm:text-lg text-[#1E1F23] line-clamp-2 flex-1">
                            {scan.product.name}
                          </h3>
                        </div>

                        {/* Category • Brand */}
                        <p className="text-sm text-[#6C7585] mb-2">
                          {scan.product.category} • {scan.product.brand}
                        </p>

                        {/* Key Risk Explanation */}
                        <p className="text-sm text-[#1E1F23] mb-3 line-clamp-2">
                          {keyRisk}
                        </p>

                        {/* Timestamp • Profile Name */}
                        <div className="flex items-center gap-2 text-xs text-[#6C7585]">
                          <span>{formatDate(scan.scannedAt)}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <UserIcon className="w-3 h-3" />
                            <span>Profile: {scan.profileName}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border border-[#E5E9F0] bg-white">
            <CardContent className="p-8 sm:p-12 md:p-16 lg:p-20 text-center">
              <FolderIcon className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto text-gray-300 mb-3 sm:mb-4 md:mb-5" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1E1F23] mb-2">
                No results found
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-[#6C7585]">
                {searchQuery ? "Try a different search" : "Start scanning products to build your history"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
