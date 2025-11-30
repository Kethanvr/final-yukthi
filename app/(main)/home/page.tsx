"use client";

import { useApp } from "@/lib/context/AppContext";
import { ProfileSwitcher } from "@/components/profile/ProfileSwitcher";
import { BottomNav } from "@/components/navigation/BottomNav";
import { FloatingScanButton } from "@/components/navigation/FloatingScanButton";
import { getAllScanResults } from "@/lib/mockData/scanResults";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  CameraIcon,
} from "@heroicons/react/24/solid";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const myScans = scanResults.filter((s) => s.profileId === currentProfile.id);
  const unsafeCount = myScans.filter((s) => s.verdict.badge === "UNSAFE").length;
  const recentScans = scanResults.slice(0, 6);

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white px-3 sm:px-4 py-6 sm:py-8 shadow-lg">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">InstaScan</h1>
              <p className="text-blue-100 text-xs sm:text-sm">Smart Safety Scanner</p>
            </div>
            <ProfileSwitcher
              profiles={allProfiles}
              currentProfile={currentProfile}
              onProfileChange={setCurrentProfile}
            />
          </div>

          {/* Stats Grid - Stack on very small screens */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1">{myScans.length}</div>
                <div className="text-[10px] sm:text-xs text-blue-100">Total Scans</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1">{unsafeCount}</div>
                <div className="text-[10px] sm:text-xs text-blue-100">Unsafe Items</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1">{allProfiles.length}</div>
                <div className="text-[10px] sm:text-xs text-blue-100">Profiles</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Welcome Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="text-3xl sm:text-4xl">👋</div>
              <div>
                <h2 className="font-semibold text-gray-900 text-base sm:text-lg">
                  Welcome back, {currentProfile.name}!
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Tap the camera button to scan a product
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Scans */}
        {recentScans.length > 0 ? (
          <div>
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Scans</h2>
              <button
                onClick={() => router.push("/history")}
                className="text-primary text-xs sm:text-sm font-medium hover:underline active:opacity-70 min-h-[44px] flex items-center"
              >
                View All →
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {recentScans.map((scan) => (
                <Card
                  key={scan.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow active:scale-95 transition-transform overflow-hidden"
                  onClick={() => router.push(`/results/${scan.id}`)}
                >
                  <div className="aspect-square relative bg-gray-100">
                    <Image
                      src={scan.product.imageUrl}
                      alt={scan.product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2">
                      <Badge
                        className={
                          scan.verdict.badge === "SAFE"
                            ? "bg-green-500"
                            : scan.verdict.badge === "CAUTION"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }
                      >
                        {scan.verdict.badge === "SAFE" ? (
                          <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : scan.verdict.badge === "CAUTION" ? (
                          <ExclamationTriangleIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <XCircleIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-2 sm:p-3">
                    <h3 className="font-semibold text-xs sm:text-sm line-clamp-2 text-gray-900">
                      {scan.product.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{scan.product.brand}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 sm:p-12 text-center">
              <CameraIcon className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                No scans yet
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Start by scanning your first product
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
