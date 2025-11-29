import { UserProfile } from "../types";

export const mockProfiles: UserProfile[] = [
  {
    id: "profile-1",
    name: "Grandma",
    dateOfBirth: "1952-03-15",
    age: 72,
    biologicalSex: "Female",
    isChild: false,
    isBaby: false,
    isPregnant: false,
    isBreastfeeding: false,
    
    chronicConditions: ["Type 2 Diabetes", "Hypertension (High BP)"],
    isLowImmunity: false,
    
    foodAllergies: [],
    dietaryPreferences: ["Vegetarian"],
    nutritionalGoals: ["Low Sodium", "Low Sugar"],
    
    skinType: "Dry",
    skinSensitivity: "Medium",
    dermatologicalConditions: [],
    cosmeticAllergies: ["Fragrance/Perfume"],
    
    drugAllergies: ["Aspirin/NSAIDs"],
    currentMedications: ["Metformin", "ACE Inhibitors"],
    
    alertSensitivity: "Strict",
    expiryReminders: true,
    emergencyContact: {
      name: "Daughter",
      phone: "+91-9876543210",
    },
    
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grandma",
    createdAt: "2024-01-15T08:30:00Z",
  },
  {
    id: "profile-2",
    name: "Baby Arjun",
    dateOfBirth: "2024-05-15",
    age: 0,
    biologicalSex: "Male",
    isChild: true,
    isBaby: true,
    isPregnant: false,
    isBreastfeeding: false,
    
    chronicConditions: [],
    isLowImmunity: true,
    
    foodAllergies: [],
    dietaryPreferences: [],
    nutritionalGoals: [],
    
    skinType: "Normal",
    skinSensitivity: "High",
    dermatologicalConditions: [],
    cosmeticAllergies: [],
    
    drugAllergies: [],
    currentMedications: [],
    
    alertSensitivity: "Strict",
    expiryReminders: true,
    
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Baby",
    createdAt: "2024-05-20T10:00:00Z",
  },
  {
    id: "profile-3",
    name: "Kethan",
    dateOfBirth: "1994-08-22",
    age: 30,
    biologicalSex: "Male",
    isChild: false,
    isBaby: false,
    isPregnant: false,
    isBreastfeeding: false,
    
    chronicConditions: [],
    isLowImmunity: false,
    
    foodAllergies: ["Peanuts"],
    dietaryPreferences: ["Vegetarian"],
    nutritionalGoals: ["High Protein", "Muscle Gain"],
    
    skinType: "Oily",
    skinSensitivity: "Low",
    dermatologicalConditions: ["Acne-Prone"],
    cosmeticAllergies: [],
    
    drugAllergies: [],
    currentMedications: [],
    
    alertSensitivity: "Moderate",
    expiryReminders: true,
    
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kethan",
    createdAt: "2024-01-10T12:00:00Z",
  },
  {
    id: "profile-4",
    name: "Priya",
    dateOfBirth: "1990-12-05",
    age: 34,
    biologicalSex: "Female",
    isChild: false,
    isBaby: false,
    isPregnant: true,
    isBreastfeeding: false,
    
    chronicConditions: ["PCOS"],
    isLowImmunity: false,
    
    foodAllergies: ["Shellfish"],
    dietaryPreferences: ["Vegetarian"],
    nutritionalGoals: ["High Fiber"],
    
    skinType: "Combination",
    skinSensitivity: "High",
    dermatologicalConditions: ["Sensitive Skin"],
    cosmeticAllergies: ["Parabens", "Essential Oils"],
    
    drugAllergies: [],
    currentMedications: [],
    
    alertSensitivity: "Strict",
    expiryReminders: true,
    
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    createdAt: "2024-02-01T09:15:00Z",
  },
];

// Helper functions
export function getProfileById(id: string): UserProfile | undefined {
  return mockProfiles.find((p) => p.id === id);
}

export function getProfileByName(name: string): UserProfile | undefined {
  return mockProfiles.find((p) => p.name === name);
}

export function getAllProfiles(): UserProfile[] {
  return mockProfiles;
}


