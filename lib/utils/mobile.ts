/**
 * Mobile utilities for resolution, zoom detection, and viewport handling
 */

export interface DeviceInfo {
  screenWidth: number;
  screenHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  pixelRatio: number;
  zoomLevel: number;
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  orientation: "portrait" | "landscape";
}

// Detect device resolution and zoom level
export function getDeviceInfo(): DeviceInfo {
  if (typeof window === "undefined") {
    return {
      screenWidth: 0,
      screenHeight: 0,
      viewportWidth: 0,
      viewportHeight: 0,
      pixelRatio: 1,
      zoomLevel: 1,
      isMobile: false,
      isIOS: false,
      isAndroid: false,
      orientation: "portrait",
    };
  }

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const pixelRatio = window.devicePixelRatio || 1;
  
  // Calculate zoom level
  const zoomLevel = Math.round((viewportWidth / window.outerWidth) * 100) / 100;
  
  // Detect mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Detect specific platforms
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  
  // Detect orientation
  const orientation = viewportWidth > viewportHeight ? "landscape" : "portrait";

  return {
    screenWidth,
    screenHeight,
    viewportWidth,
    viewportHeight,
    pixelRatio,
    zoomLevel,
    isMobile,
    isIOS,
    isAndroid,
    orientation,
  };
}

// Log device info to console
export function logDeviceInfo(): void {
  const info = getDeviceInfo();
  
  console.group("📱 Device Information");
  console.log(`Screen Resolution: ${info.screenWidth}x${info.screenHeight}`);
  console.log(`Viewport Size: ${info.viewportWidth}x${info.viewportHeight}`);
  console.log(`Pixel Ratio: ${info.pixelRatio}x (${info.pixelRatio > 1 ? "Retina" : "Standard"})`);
  console.log(`Zoom Level: ${info.zoomLevel * 100}%`);
  console.log(`Device Type: ${info.isMobile ? "Mobile" : "Desktop"}`);
  if (info.isIOS) console.log(`Platform: iOS`);
  if (info.isAndroid) console.log(`Platform: Android`);
  console.log(`Orientation: ${info.orientation}`);
  console.groupEnd();
}

// Get viewport height fix for mobile browsers (handles URL bar)
export function getViewportHeight(): string {
  if (typeof window === "undefined") return "100vh";
  
  // For mobile browsers, use actual viewport height
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  
  return `calc(var(--vh, 1vh) * 100)`;
}

// Prevent input zoom on iOS
export function preventInputZoom(): void {
  if (typeof document === "undefined") return;
  
  // Add viewport meta tag to prevent zoom on input focus
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute(
      "content",
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    );
  }
}

// Allow zoom (reverses preventInputZoom)
export function allowZoom(): void {
  if (typeof document === "undefined") return;
  
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute(
      "content",
      "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
    );
  }
}

// Check if device is mobile
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Get safe area insets (for iOS notch)
export function getSafeAreaInsets() {
  return {
    top: "env(safe-area-inset-top, 0px)",
    right: "env(safe-area-inset-right, 0px)",
    bottom: "env(safe-area-inset-bottom, 0px)",
    left: "env(safe-area-inset-left, 0px)",
  };
}

