"use client";

import { useApp } from "@/lib/context/AppContext";
import { ProfileSwitcher } from "@/components/profile/ProfileSwitcher";
import { BottomNav } from "@/components/navigation/BottomNav";
import { getAllScanResults } from "@/lib/mockData/scanResults";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  CameraIcon,
  ChartBarIcon,
  ExclamationTriangleIcon as WarningIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { CATEGORY_HEROICONS } from "@/lib/constants/categories";

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
    setScanResults(getAllScanResults());
  }, []);

  if (isLoading || !currentProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin w-12 h-12 border-4 border-slate-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const myScans = scanResults.filter((s) => s.profileId === currentProfile.id);
  const unsafeCount = myScans.filter((s) => s.verdict.badge === "UNSAFE").length;
  const recentScans = scanResults.slice(0, 3);

  return (
    <div className="min-h-screen pb-20 lg:pb-24 bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center mb-4 sm:mb-5">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-0.5 text-slate-900">InstaScan</h1>
              <p className="text-slate-600 text-xs sm:text-sm font-medium">AI Safety Scanner</p>
            </div>
            <ProfileSwitcher
              profiles={allProfiles}
              currentProfile={currentProfile}
              onProfileChange={setCurrentProfile}
            />
          </div>

          {/* Stats Grid - 3 horizontal cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <Card className="bg-white border border-slate-200">
              <CardContent className="p-4 text-center">
                <ChartBarIcon className="w-5 h-5 text-slate-600 mb-2 mx-auto" />
                <div className="text-2xl font-bold text-slate-900 mb-1">{myScans.length}</div>
                <div className="text-xs font-medium text-slate-600">Total Scans</div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-slate-200">
              <CardContent className="p-4 text-center">
                <WarningIcon className="w-5 h-5 text-slate-600 mb-2 mx-auto" />
                <div className="text-2xl font-bold text-slate-900 mb-1">{unsafeCount}</div>
                <div className="text-xs font-medium text-slate-600">Unsafe Items</div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-slate-200">
              <CardContent className="p-4 text-center">
                <UserGroupIcon className="w-5 h-5 text-slate-600 mb-2 mx-auto" />
                <div className="text-2xl font-bold text-slate-900 mb-1">{allProfiles.length}</div>
                <div className="text-xs font-medium text-slate-600">Profiles Active</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10 space-y-4 sm:space-y-6 md:space-y-8">
        {/* Recent Scans */}
        {recentScans.length > 0 ? (
          <div>
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Recent Scans</h2>
              <button
                onClick={() => router.push("/history")}
                className="text-slate-600 text-xs sm:text-sm font-medium hover:text-slate-900 hover:underline active:opacity-70 min-h-[44px] flex items-center px-2"
              >
                View All →
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {recentScans.map((scan) => {
                const CategoryIcon = CATEGORY_HEROICONS[scan.product.category];
                return (
                  <Card
                    key={scan.id}
                    className="cursor-pointer hover:shadow-sm transition-shadow overflow-hidden border border-slate-200 bg-white"
                    onClick={() => router.push(`/results/${scan.id}`)}
                  >
                    <div className="aspect-square relative bg-slate-50 overflow-hidden border-b border-slate-200">
                      <Image
                        src={scan.product.imageUrl}
                        alt={scan.product.name}
                        fill
                        className="object-cover grayscale-[0.3]"
                      />
                      <div className="absolute top-2 left-2">
                        <div className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded border border-slate-200 flex items-center justify-center">
                          <CategoryIcon className="w-4 h-4 text-slate-700" />
                        </div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center border-2 border-white ${
                            scan.verdict.badge === "SAFE"
                              ? "bg-green-600"
                              : scan.verdict.badge === "CAUTION"
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                        >
                          {scan.verdict.badge === "SAFE" ? (
                            <CheckCircleIcon className="w-4 h-4 text-white" />
                          ) : scan.verdict.badge === "CAUTION" ? (
                            <ExclamationTriangleIcon className="w-4 h-4 text-white" />
                          ) : (
                            <XCircleIcon className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-semibold text-sm line-clamp-2 text-slate-900 mb-1">
                        {scan.product.name}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium">{scan.product.brand}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <Card className="border border-slate-200">
            <CardContent className="p-8 sm:p-12 text-center">
              <CameraIcon className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-slate-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                No scans yet
              </h3>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                Start by scanning your first product
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
