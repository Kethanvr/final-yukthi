import { ScanResult } from "../types";
import { mockProducts } from "./products";
import { mockProfiles } from "./profiles";
import { analyzeSafety } from "../utils/safetyAnalysis";

// Pre-populate with dummy scan results for demo
function generateInitialScans(): ScanResult[] {
  const scans: ScanResult[] = [];
  
  // Generate scans for different profiles and products
  const scanConfigs = [
    { productId: "prod-1", profileId: "profile-1", daysAgo: 1 },  // Grandma + Jam
    { productId: "prod-2", profileId: "profile-1", daysAgo: 2 },  // Grandma + Maggi
    { productId: "prod-5", profileId: "profile-1", daysAgo: 3 },  // Grandma + Mountain Dew
    { productId: "prod-12", profileId: "profile-2", daysAgo: 1 }, // Baby + Johnson's
    { productId: "prod-18", profileId: "profile-2", daysAgo: 2 }, // Baby + Honitus
    { productId: "prod-3", profileId: "profile-3", daysAgo: 1 },  // Kethan + Milk
    { productId: "prod-4", profileId: "profile-3", daysAgo: 2 },  // Kethan + Biscuits
    { productId: "prod-11", profileId: "profile-3", daysAgo: 3 }, // Kethan + The Ordinary
    { productId: "prod-7", profileId: "profile-4", daysAgo: 1 },  // Priya + Dove
    { productId: "prod-10", profileId: "profile-4", daysAgo: 2 }, // Priya + Mamaearth
    { productId: "prod-13", profileId: "profile-1", daysAgo: 4 }, // Grandma + Dolo
    { productId: "prod-6", profileId: "profile-3", daysAgo: 5 },  // Kethan + Dahi
    { productId: "prod-14", profileId: "profile-1", daysAgo: 6 }, // Grandma + Crocin
    { productId: "prod-8", profileId: "profile-4", daysAgo: 3 },  // Priya + Himalaya
    { productId: "prod-15", profileId: "profile-2", daysAgo: 4 }, // Baby + ORS
  ];
  
  scanConfigs.forEach(({ productId, profileId, daysAgo }) => {
    const product = mockProducts.find(p => p.id === productId);
    const profile = mockProfiles.find(p => p.id === profileId);
    
    if (product && profile) {
      const analysis = analyzeSafety(product, profile);
      const scanDate = new Date();
      scanDate.setDate(scanDate.getDate() - daysAgo);
      
      scans.push({
        ...analysis,
        id: `scan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        scannedAt: scanDate.toISOString(),
      });
    }
  });
  
  return scans;
}

// Initialize with pre-populated data
export const mockScanHistory: ScanResult[] = generateInitialScans();

// Helper to store scan results (simulates database)
export function saveScanResult(scanResult: ScanResult): void {
  mockScanHistory.unshift(scanResult); // Add to beginning
}

export function getScanResultById(id: string): ScanResult | undefined {
  return mockScanHistory.find((s) => s.id === id);
}

export function getScanResultsByProfile(profileId: string): ScanResult[] {
  return mockScanHistory.filter((s) => s.profileId === profileId);
}

export function getAllScanResults(): ScanResult[] {
  return mockScanHistory;
}

export function deleteScanResult(id: string): void {
  const index = mockScanHistory.findIndex((s) => s.id === id);
  if (index > -1) {
    mockScanHistory.splice(index, 1);
  }
}

// Clear all history
export function clearScanHistory(): void {
  mockScanHistory.length = 0;
}
