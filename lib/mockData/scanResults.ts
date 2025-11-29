import { ScanResult } from "../types";

// This will be dynamically generated based on product and profile
// For now, storing some pre-computed results for quick access

export const mockScanHistory: ScanResult[] = [];

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

