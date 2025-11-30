"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getScanResultById } from "@/lib/mockData/scanResults";
import { ScanResult, DataPoint } from "@/lib/types";
import { ResultHeader } from "@/components/scan/ResultHeader";
import { ProfileSwitcher } from "@/components/profile/ProfileSwitcher";
import { useApp } from "@/lib/context/AppContext";
import { analyzeSafety } from "@/lib/utils/safetyAnalysis";
import { InlineChat } from "@/components/chat/InlineChat";
import {
  BoltIcon,
  ChartBarIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const scanId = params.scanId as string;
  const { currentProfile, allProfiles, setCurrentProfile } = useApp();
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  useEffect(() => {
    const result = getScanResultById(scanId);
    if (result) {
      // Re-analyze for current profile
      if (currentProfile) {
        const reanalyzed = analyzeSafety(result.product, currentProfile);
        setScanResult({ ...reanalyzed, id: result.id, scannedAt: result.scannedAt });
      } else {
        setScanResult(result);
      }
    }
  }, [scanId, currentProfile]);

  if (!scanResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const { product, verdict, dataPoints } = scanResult;

  const groupedDataPoints = {
    critical: dataPoints.filter((d) => d.status === "CRITICAL"),
    highRisk: dataPoints.filter((d) => d.status === "HIGH_RISK"),
    warning: dataPoints.filter((d) => d.status === "WARNING"),
    safe: dataPoints.filter((d) => d.status === "SAFE"),
  };

  return (
    <div className="min-h-screen pb-6 lg:pb-8">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between sticky top-0 z-10 lg:top-16">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-base md:text-lg lg:text-xl"
        >
          ←
        </button>
        {currentProfile && (
          <ProfileSwitcher
            profiles={allProfiles}
            currentProfile={currentProfile}
            onProfileChange={setCurrentProfile}
          />
        )}
      </div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        {/* Desktop: 2-column layout, Mobile: single column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {/* Left Column - Product Info & Header */}
          <div className="lg:col-span-1 space-y-6 md:space-y-8">
            {/* Header */}
            <ResultHeader
              product={product}
              badge={verdict.badge}
              score={verdict.score}
              summaryText={verdict.summaryText}
              profileName={scanResult.profileName}
            />

            {/* Recommendation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-5 lg:p-6">
              <h2 className="font-semibold text-gray-900 mb-2 md:mb-3 text-base md:text-lg lg:text-xl">💡 Recommendation</h2>
              <p className="text-gray-700 text-sm md:text-base lg:text-lg">{verdict.recommendation}</p>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">

            {/* Data Points */}
            {groupedDataPoints.critical.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 md:p-5 lg:p-6">
                <h3 className="font-semibold text-red-700 mb-3 md:mb-4 text-base md:text-lg lg:text-xl">Critical Issues</h3>
                <div className="space-y-2 md:space-y-3">
                  {groupedDataPoints.critical.map((dp, i) => (
                    <DataPointCard key={i} dataPoint={dp} />
                  ))}
                </div>
              </div>
            )}

            {groupedDataPoints.highRisk.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 md:p-5 lg:p-6">
                <h3 className="font-semibold text-amber-700 mb-3 md:mb-4 text-base md:text-lg lg:text-xl">High Risk</h3>
                <div className="space-y-2 md:space-y-3">
                  {groupedDataPoints.highRisk.map((dp, i) => (
                    <DataPointCard key={i} dataPoint={dp} />
                  ))}
                </div>
              </div>
            )}

            {groupedDataPoints.warning.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 md:p-5 lg:p-6">
                <h3 className="font-semibold text-amber-700 mb-3 md:mb-4 flex items-center gap-2 text-base md:text-lg lg:text-xl">
                  <BoltIcon className="w-5 h-5 md:w-6 md:h-6" />
                  Warnings
                </h3>
                <div className="space-y-2 md:space-y-3">
                  {groupedDataPoints.warning.map((dp, i) => (
                    <DataPointCard key={i} dataPoint={dp} />
                  ))}
                </div>
              </div>
            )}

            {/* Category-Specific Details */}
            {product.category === "Food" && product.nutrition && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-5 lg:p-6">
                <h3 className="font-semibold text-gray-900 mb-4 md:mb-5 flex items-center gap-2 text-base md:text-lg lg:text-xl">
                  <ChartBarIcon className="w-5 h-5 md:w-6 md:h-6" />
                  Nutrition Facts
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <NutritionItem label="Calories" value={product.nutrition.calories} />
                  <NutritionItem label="Sugar" value={product.nutrition.sugar} />
                  <NutritionItem label="Sodium" value={product.nutrition.sodium} />
                  <NutritionItem label="Fat" value={product.nutrition.fat} />
                </div>
                <div className="text-xs md:text-sm text-gray-500 mt-2 md:mt-3">
                  Per serving: {product.nutrition.servingSize}
                </div>
              </div>
            )}

            {product.category === "Medicine" && product.medicineInfo && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-5 lg:p-6">
                <h3 className="font-semibold text-gray-900 mb-4 md:mb-5 flex items-center gap-2 text-base md:text-lg lg:text-xl">
                  <BeakerIcon className="w-5 h-5 md:w-6 md:h-6" />
                  Medicine Info
                </h3>
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <div className="text-sm md:text-base font-medium text-gray-700 mb-1">Active Ingredient</div>
                    <div className="text-gray-900 text-sm md:text-base lg:text-lg">{product.medicineInfo.activeIngredient}</div>
                  </div>
                  <div>
                    <div className="text-sm md:text-base font-medium text-gray-700 mb-1">Purpose</div>
                    <div className="text-gray-900 text-sm md:text-base lg:text-lg">{product.medicineInfo.purpose}</div>
                  </div>
                  <div>
                    <div className="text-sm md:text-base font-medium text-gray-700 mb-1">Max Daily Dose</div>
                    <div className="text-gray-900 text-sm md:text-base lg:text-lg">{product.medicineInfo.maxDailyDose}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Inline Chat */}
            <div className="mt-6 md:mt-8">
              <InlineChat scanId={scanId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DataPointCard({ dataPoint }: { dataPoint: DataPoint }) {
  return (
    <div className="bg-white rounded-lg p-3 md:p-4">
      <div className="flex justify-between items-start mb-1 md:mb-2">
        <span className="font-medium text-gray-900 text-sm md:text-base lg:text-lg">{dataPoint.label}</span>
        <span className="text-sm md:text-base text-gray-700">{dataPoint.value}</span>
      </div>
      {dataPoint.explanation && (
        <p className="text-sm md:text-base text-gray-600">{dataPoint.explanation}</p>
      )}
    </div>
  );
}

function NutritionItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 md:p-4">
      <div className="text-xs md:text-sm text-gray-600">{label}</div>
      <div className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mt-1">{value}</div>
    </div>
  );
}


