// Core Type Definitions for InstaScan

export type ProductCategory = "Food" | "Cosmetic" | "Medicine";
export type SafetyBadge = "SAFE" | "CAUTION" | "UNSAFE";
export type SkinType = "Oily" | "Dry" | "Combination" | "Normal";
export type SensitivityLevel = "Low" | "Medium" | "High";
export type AlertSensitivity = "Strict" | "Moderate";
export type BiologicalSex = "Male" | "Female" | "Other";

// User Profile
export interface UserProfile {
  id: string;
  name: string;
  dateOfBirth: string;
  age: number;
  biologicalSex: BiologicalSex;
  isChild: boolean;
  isBaby: boolean;
  isPregnant: boolean;
  isBreastfeeding: boolean;
  
  // Medical History
  chronicConditions: string[];
  isLowImmunity: boolean;
  
  // Food Safety
  foodAllergies: string[];
  dietaryPreferences: string[];
  nutritionalGoals: string[];
  
  // Cosmetic & Skin
  skinType: SkinType;
  skinSensitivity: SensitivityLevel;
  dermatologicalConditions: string[];
  cosmeticAllergies: string[];
  
  // Medicine Safety
  drugAllergies: string[];
  currentMedications: string[];
  
  // System Preferences
  alertSensitivity: AlertSensitivity;
  expiryReminders: boolean;
  emergencyContact?: {
    name: string;
    phone: string;
  };
  
  avatarUrl?: string;
  createdAt: string;
}

// Product Information
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  imageUrl: string;
  
  // Common fields
  ingredients: string[];
  
  // Food-specific
  nutrition?: {
    sugar: string;
    sodium: string;
    fat: string;
    saturatedFat: string;
    calories: string;
    servingSize: string;
  };
  
  fssai?: {
    status: "Approved" | "Not Found";
    isVeg: boolean;
    processedLevel: "Highly Processed" | "Processed" | "Whole Food";
    licenseNumber?: string;
  };
  
  additives?: Array<{
    code: string;
    name: string;
    type: string;
  }>;
  
  // Cosmetic-specific
  cosmeticInfo?: {
    hasParabens: boolean;
    hasSulfates: boolean;
    fragranceType: "Synthetic" | "Natural" | "None";
    comedogenicRating: number; // 0-5
    isPregnancySafe: boolean;
    isBabySafe: boolean;
  };
  
  // Medicine-specific
  medicineInfo?: {
    activeIngredient: string;
    dosage: string;
    purpose: string;
    maxDailyDose: string;
    contraindications: string[];
    sideEffects: string[];
    sugarContent?: string;
    sodiumContent?: string;
  };
  
  expiryDate?: string;
  batchNumber?: string;
}

// Data Point for Analysis
export interface DataPoint {
  label: string;
  value: string;
  status: "SAFE" | "WARNING" | "HIGH_RISK" | "CRITICAL";
  explanation?: string;
}

// Safety Verdict
export interface SafetyVerdict {
  badge: SafetyBadge;
  score: number; // 0-100
  summaryText: string;
  recommendation: string;
}

// Scan Result
export interface ScanResult {
  id: string;
  productId: string;
  product: Product;
  profileId: string;
  profileName: string;
  category: ProductCategory;
  verdict: SafetyVerdict;
  dataPoints: DataPoint[];
  scannedAt: string;
}

// Chat Message
export interface ChatMessage {
  id: string;
  role: "user" | "ai" | "system";
  text: string;
  timestamp: string;
}

// Chat Session
export interface ChatSession {
  id: string;
  scanId: string;
  profileId: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

// Reminder
export interface Reminder {
  id: string;
  type: "expiry" | "medicine";
  productId?: string;
  productName: string;
  description: string;
  dueDate?: string;
  schedule?: string; // For medicine intake
  isCompleted: boolean;
  createdAt: string;
}

// Onboarding Step Data
export interface OnboardingData {
  step: number;
  data: Partial<UserProfile>;
}


