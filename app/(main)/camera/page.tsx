"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { extractProductData } from "@/lib/utils/productExtractor";
import { analyzeSafety } from "@/lib/utils/safetyAnalysis";
import { saveScanResult } from "@/lib/mockData/scanResults";
import { useApp } from "@/lib/context/AppContext";
import { CameraIcon } from "@heroicons/react/24/outline";

export default function CameraPage() {
  const router = useRouter();
  const { currentProfile } = useApp();
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");

  const handleScan = async () => {
    if (!currentProfile) {
      router.push("/login");
      return;
    }

    setIsScanning(true);
    setProgress(0);
    setStatusText("Capturing image...");

    // Simulate multi-stage processing
    setTimeout(() => {
      setProgress(30);
      setStatusText("Analyzing product...");
    }, 1000);

    setTimeout(() => {
      setProgress(60);
      setStatusText("Extracting ingredients...");
    }, 2000);

    setTimeout(() => {
      setProgress(80);
      setStatusText("Checking safety...");
    }, 3000);

    try {
      // Stage 1: Extract product data
      const product = await extractProductData(null);

      if (!product) {
        alert("Product not recognized. Please try again with better lighting.");
        setIsScanning(false);
        return;
      }

      // Stage 2: Analyze safety
      const scanResult = analyzeSafety(product, currentProfile);

      // Save to history
      saveScanResult(scanResult);

      setProgress(100);
      setStatusText("Complete!");

      // Navigate to results
      setTimeout(() => {
        router.push(`/results/${scanResult.id}`);
      }, 500);
    } catch (error) {
      console.error("Scan error:", error);
      alert("An error occurred. Please try again.");
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col lg:flex-row">
      {/* Header - Mobile only */}
      <div className="p-4 lg:hidden flex items-center justify-between text-white">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          ←
        </button>
        <h1 className="font-semibold text-lg">Scan Product</h1>
        <div className="w-10" />
      </div>

      {/* Desktop: Side-by-side layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left: Camera View */}
        <div className="flex-1 relative min-h-[400px] lg:min-h-screen">
          {/* Desktop Header */}
          <div className="hidden lg:flex p-6 items-center justify-between text-white absolute top-0 left-0 right-0 z-10">
            <button
              onClick={() => router.back()}
              className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors text-xl"
            >
              ←
            </button>
            <h1 className="font-semibold text-2xl">Scan Product</h1>
            <div className="w-12" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl aspect-square border-4 border-white/50 rounded-lg relative">
              <div className="absolute top-0 left-0 w-8 h-8 md:w-12 md:h-12 border-t-4 border-l-4 border-white" />
              <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 border-t-4 border-r-4 border-white" />
              <div className="absolute bottom-0 left-0 w-8 h-8 md:w-12 md:h-12 border-b-4 border-l-4 border-white" />
              <div className="absolute bottom-0 right-0 w-8 h-8 md:w-12 md:h-12 border-b-4 border-r-4 border-white" />

              {isScanning && (
                <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center rounded-lg">
                  <LoadingSpinner size="lg" />
                </div>
              )}
            </div>
          </div>

          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-white px-4 lg:hidden">
            <CameraIcon className="w-16 h-16 mx-auto mb-2" />
            <p className="text-sm">
              {isScanning ? statusText : "Position product label within frame"}
            </p>
          </div>
        </div>

        {/* Right: Instructions & Controls - Desktop only */}
        <div className="hidden lg:flex flex-col w-full lg:w-96 xl:w-[28rem] bg-gray-800 border-l border-gray-700 p-6 xl:p-8">
          <div className="flex-1">
            <h2 className="text-white text-2xl font-bold mb-4">How to Scan</h2>
            <div className="space-y-4 text-white/80 text-base">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  1
                </div>
                <p>
                  Position the product label clearly within the camera frame
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  2
                </div>
                <p>Ensure good lighting and the label is in focus</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  3
                </div>
                <p>Tap the capture button to scan and analyze</p>
              </div>
            </div>

            {/* Progress Bar - Desktop */}
            {isScanning && (
              <div className="mt-8">
                <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-white/80 text-sm text-center">
                  {statusText}
                </p>
              </div>
            )}
          </div>

          {/* Capture Button - Desktop */}
          <div className="mt-auto">
            <Button
              onClick={handleScan}
              disabled={isScanning}
              className="w-full py-6 text-lg font-semibold"
              size="lg"
            >
              {isScanning ? "Scanning..." : "Capture & Scan"}
            </Button>
            <p className="text-center text-white/60 text-sm mt-3">
              Demo Mode: Scans a random product
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar - Mobile */}
      {isScanning && (
        <div className="px-4 mb-4 lg:hidden">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Capture Button - Mobile */}
      <div className="p-6 pb-8 lg:hidden">
        <Button
          onClick={handleScan}
          disabled={isScanning}
          className="w-full py-4 text-lg"
          size="lg"
        >
          {isScanning ? "Scanning..." : "Capture & Scan"}
        </Button>
        <p className="text-center text-white/60 text-sm mt-3">
          Demo Mode: Scans a random product
        </p>
      </div>
    </div>
  );
}
