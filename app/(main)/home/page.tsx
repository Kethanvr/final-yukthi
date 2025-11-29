"use client";

import { useApp } from "@/lib/context/AppContext";
import { ProfileSwitcher } from "@/components/profile/ProfileSwitcher";
import { BottomNav } from "@/components/navigation/BottomNav";
import { FloatingScanButton } from "@/components/navigation/FloatingScanButton";
import { getAllScanResults } from "@/lib/mockData/scanResults";
import { HistoryCard } from "@/components/history/HistoryCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const { currentProfile, allProfiles, setCurrentProfile, isLoading } = useApp();
  const [scanResults, setScanResults] = useState(getAllScanResults());

  useEffect(() => {
    if (!isLoading && !currentProfile) {
      router.push("/login");
    }
  }, [currentProfile, isLoading, router]);

  useEffect(() => {
    // Refresh scan results
    setScanResults(getAllScanResults());
  }, []);

  if (isLoading || !currentProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const myScans = scanResults.filter((s) => s.profileId === currentProfile.id);
  const unsafeCount = myScans.filter((s) => s.verdict.badge === "UNSAFE").length;
  const recentScans = scanResults.slice(0, 5);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white px-4 py-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">InstaScan</h1>
              <p className="text-blue-100">Smart Safety Scanner</p>
            </div>
            <ProfileSwitcher
              profiles={allProfiles}
              currentProfile={currentProfile}
              onProfileChange={setCurrentProfile}
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">{myScans.length}</div>
              <div className="text-sm text-blue-100">Total Scans</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">{unsafeCount}</div>
              <div className="text-sm text-blue-100">Unsafe Items</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">{allProfiles.length}</div>
              <div className="text-sm text-blue-100">Profiles</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Welcome Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-blue-900 mb-1">
            Welcome, {currentProfile.name}! 👋
          </h2>
          <p className="text-sm text-blue-800">
            Tap the camera button to scan your first product
          </p>
        </div>

        {/* Recent Scans */}
        {recentScans.length > 0 ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Recent Scans</h2>
              <button
                onClick={() => router.push("/history")}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <HistoryCard
                  key={scan.id}
                  scanResult={scan}
                  onClick={() => router.push(`/results/${scan.id}`)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📷</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No scans yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start by scanning your first product
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <FloatingScanButton />
      <BottomNav />
    </div>
  );
}


