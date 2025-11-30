"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getScanResultById } from "@/lib/mockData/scanResults";
import { ScanResult, DataPoint } from "@/lib/types";
import { ResultHeader } from "@/components/scan/ResultHeader";
import { ProfileSwitcher } from "@/components/profile/ProfileSwitcher";
import { useApp } from "@/lib/context/AppContext";
import { analyzeSafety } from "@/lib/utils/safetyAnalysis";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen pb-6">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
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

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <ResultHeader
          product={product}
          badge={verdict.badge}
          score={verdict.score}
          summaryText={verdict.summaryText}
          profileName={scanResult.profileName}
        />

        {/* Recommendation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-2">💡 Recommendation</h2>
          <p className="text-gray-700">{verdict.recommendation}</p>
        </div>

        {/* Data Points */}
        {groupedDataPoints.critical.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="font-semibold text-red-900 mb-3">🚨 Critical Issues</h3>
            <div className="space-y-2">
              {groupedDataPoints.critical.map((dp, i) => (
                <DataPointCard key={i} dataPoint={dp} />
              ))}
            </div>
          </div>
        )}

        {groupedDataPoints.highRisk.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h3 className="font-semibold text-orange-900 mb-3">⚠️ High Risk</h3>
            <div className="space-y-2">
              {groupedDataPoints.highRisk.map((dp, i) => (
                <DataPointCard key={i} dataPoint={dp} />
              ))}
            </div>
          </div>
        )}

        {groupedDataPoints.warning.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
              <BoltIcon className="w-5 h-5" />
              Warnings
            </h3>
            <div className="space-y-2">
              {groupedDataPoints.warning.map((dp, i) => (
                <DataPointCard key={i} dataPoint={dp} />
              ))}
            </div>
          </div>
        )}

        {/* Category-Specific Details */}
        {product.category === "Food" && product.nutrition && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5" />
              Nutrition Facts
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <NutritionItem label="Calories" value={product.nutrition.calories} />
              <NutritionItem label="Sugar" value={product.nutrition.sugar} />
              <NutritionItem label="Sodium" value={product.nutrition.sodium} />
              <NutritionItem label="Fat" value={product.nutrition.fat} />
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Per serving: {product.nutrition.servingSize}
            </div>
          </div>
        )}

        {product.category === "Medicine" && product.medicineInfo && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BeakerIcon className="w-5 h-5" />
              Medicine Info
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-gray-700">Active Ingredient</div>
                <div className="text-gray-900">{product.medicineInfo.activeIngredient}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Purpose</div>
                <div className="text-gray-900">{product.medicineInfo.purpose}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Max Daily Dose</div>
                <div className="text-gray-900">{product.medicineInfo.maxDailyDose}</div>
              </div>
            </div>
          </div>
        )}

        {/* Ask AI Button */}
        <Button
          onClick={() => router.push(`/chat/${scanId}`)}
          className="w-full"
          size="lg"
        >
          💬 Ask AI About This Product
        </Button>
      </div>
    </div>
  );
}

function DataPointCard({ dataPoint }: { dataPoint: DataPoint }) {
  return (
    <div className="bg-white rounded-lg p-3">
      <div className="flex justify-between items-start mb-1">
        <span className="font-medium text-gray-900">{dataPoint.label}</span>
        <span className="text-sm text-gray-700">{dataPoint.value}</span>
      </div>
      {dataPoint.explanation && (
        <p className="text-sm text-gray-600">{dataPoint.explanation}</p>
      )}
    </div>
  );
}

function NutritionItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="text-xs text-gray-600">{label}</div>
      <div className="text-lg font-semibold text-gray-900">{value}</div>
    </div>
  );
}


