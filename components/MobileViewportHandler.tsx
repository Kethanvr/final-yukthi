"use client";

import { useEffect } from "react";
import { logDeviceInfo, getViewportHeight } from "@/lib/utils/mobile";

export function MobileViewportHandler() {
  useEffect(() => {
    // Log device info on mount
    logDeviceInfo();
    
    // Set viewport height CSS variable for mobile
    const updateVH = () => {
      getViewportHeight();
    };
    
    updateVH();
    
    // Update on resize and orientation change
    window.addEventListener("resize", updateVH);
    window.addEventListener("orientationchange", updateVH);
    
    // Re-log on resize for debugging
    const handleResize = () => {
      console.log("🔄 Viewport resized:");
      logDeviceInfo();
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", updateVH);
      window.removeEventListener("orientationchange", updateVH);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return null;
}

