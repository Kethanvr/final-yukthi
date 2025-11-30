"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between text-white">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
        >
          ←
        </button>
        <h1 className="font-semibold">Scan Product</h1>
        <div className="w-10" />
      </div>

      {/* Camera View */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-80 h-80 border-4 border-white/50 rounded-lg relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white" />
            
            {isScanning && (
              <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                <LoadingSpinner size="lg" />
              </div>
            )}
          </div>
        </div>

        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-white">
          <CameraIcon className="w-16 h-16 mx-auto mb-2" />
          <p className="text-sm">
            {isScanning ? statusText : "Position product label within frame"}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      {isScanning && (
        <div className="px-4 mb-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Capture Button */}
      <div className="p-6 pb-8">
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


