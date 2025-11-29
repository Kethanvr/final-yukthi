"use client";

import { UserProfile } from "@/lib/types";
import { mockProfiles } from "@/lib/mockData/profiles";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AppContextType {
  currentProfile: UserProfile | null;
  allProfiles: UserProfile[];
  setCurrentProfile: (profile: UserProfile) => void;
  addProfile: (profile: UserProfile) => void;
  updateProfile: (profile: UserProfile) => void;
  deleteProfile: (profileId: string) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentProfile, setCurrentProfileState] = useState<UserProfile | null>(null);
  const [allProfiles, setAllProfiles] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load profiles from localStorage or use mock data
      const storedProfiles = localStorage.getItem("instascan_profiles");
      if (storedProfiles) {
        const profiles = JSON.parse(storedProfiles);
        setAllProfiles(profiles);
      } else {
        setAllProfiles(mockProfiles);
        localStorage.setItem("instascan_profiles", JSON.stringify(mockProfiles));
      }

      // Load current profile
      const storedCurrentProfileId = localStorage.getItem("instascan_current_profile");
      if (storedCurrentProfileId) {
        const profiles = storedProfiles ? JSON.parse(storedProfiles) : mockProfiles;
        const profile = profiles.find((p: UserProfile) => p.id === storedCurrentProfileId);
        if (profile) {
          setCurrentProfileState(profile);
        } else if (profiles.length > 0) {
          setCurrentProfileState(profiles[0]);
          localStorage.setItem("instascan_current_profile", profiles[0].id);
        }
      } else if (allProfiles.length > 0 || mockProfiles.length > 0) {
        const firstProfile = allProfiles[0] || mockProfiles[0];
        setCurrentProfileState(firstProfile);
        localStorage.setItem("instascan_current_profile", firstProfile.id);
      }

      setIsLoading(false);
    }
  }, []);

  const setCurrentProfile = (profile: UserProfile) => {
    setCurrentProfileState(profile);
    localStorage.setItem("instascan_current_profile", profile.id);
  };

  const addProfile = (profile: UserProfile) => {
    const updatedProfiles = [...allProfiles, profile];
    setAllProfiles(updatedProfiles);
    localStorage.setItem("instascan_profiles", JSON.stringify(updatedProfiles));
  };

  const updateProfile = (profile: UserProfile) => {
    const updatedProfiles = allProfiles.map((p) =>
      p.id === profile.id ? profile : p
    );
    setAllProfiles(updatedProfiles);
    localStorage.setItem("instascan_profiles", JSON.stringify(updatedProfiles));
    
    // Update current profile if it's the one being updated
    if (currentProfile?.id === profile.id) {
      setCurrentProfileState(profile);
    }
  };

  const deleteProfile = (profileId: string) => {
    const updatedProfiles = allProfiles.filter((p) => p.id !== profileId);
    setAllProfiles(updatedProfiles);
    localStorage.setItem("instascan_profiles", JSON.stringify(updatedProfiles));
    
    // If deleting current profile, switch to another one
    if (currentProfile?.id === profileId && updatedProfiles.length > 0) {
      setCurrentProfile(updatedProfiles[0]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentProfile,
        allProfiles,
        setCurrentProfile,
        addProfile,
        updateProfile,
        deleteProfile,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

