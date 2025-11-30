"use client";

import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/navigation/BottomNav";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { useApp } from "@/lib/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/profile/Avatar";
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const router = useRouter();
  const { currentProfile, allProfiles, setCurrentProfile } = useApp();

  if (!currentProfile) {
    return null;
  }

  // Get all allergies combined
  const allAllergies = [
    ...currentProfile.foodAllergies,
    ...currentProfile.drugAllergies,
    ...currentProfile.cosmeticAllergies,
  ];

  // Get protection status
  const protectionStatus = currentProfile.isBaby
    ? "Infant protection"
    : currentProfile.isLowImmunity
    ? "Low immunity protection"
    : null;

  // Get scan warnings level based on alert sensitivity
  const scanWarningsLevel =
    currentProfile.alertSensitivity === "Strict" ? "High" : "Moderate";

  return (
    <div className="min-h-screen pb-20 lg:pb-6 bg-slate-50">
      {/* Header Block */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
        <div className="max-w-screen-xl mx-auto text-center">
          <div className="mx-auto mb-4 md:mb-5 lg:mb-6 relative inline-block">
            <Avatar profile={currentProfile} size="xl" />
            <button
              onClick={() => router.push(`/wizard?edit=${currentProfile.id}`)}
              className="absolute bottom-0 right-0 md:right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 md:p-2.5 shadow-lg transition-colors"
              aria-label="Edit profile"
            >
              <PencilIcon className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900">
            {currentProfile.name}
          </h1>
          <p className="text-slate-600 text-base md:text-lg lg:text-xl mt-2">
            {currentProfile.age} years • {currentProfile.biologicalSex}
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10 space-y-6">
        {/* Health Snapshot Card (Primary Section) */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 md:p-6">
          <h2 className="font-semibold text-slate-900 mb-4 text-lg md:text-xl">
            Health Profile
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <ExclamationTriangleIcon className="w-4 h-4 text-slate-500" />
              <span className="text-slate-600">
                {currentProfile.skinSensitivity} Sensitivity
              </span>
            </div>
            {protectionStatus && (
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheckIcon className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600">{protectionStatus}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-600">Allergy:</span>
              <span className="text-slate-900 font-medium">
                {allAllergies.length > 0 ? allAllergies.join(", ") : "None"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-600">Conditions:</span>
              <span className="text-slate-900 font-medium">
                {currentProfile.chronicConditions.length > 0
                  ? currentProfile.chronicConditions.join(", ")
                  : "None"}
              </span>
            </div>
            {currentProfile.alertSensitivity === "Strict" && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded">
                  Strict risk filtering
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Skin Profile Block */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 md:p-6">
          <h2 className="font-semibold text-slate-900 mb-4 text-lg md:text-xl">
            Skin Profile
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-slate-600 mb-1">Skin Type</div>
              <div className="font-medium text-base text-slate-900">
                {currentProfile.skinType}
              </div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">Sensitivity</div>
              <div className="font-medium text-base text-slate-900">
                {currentProfile.skinSensitivity}
              </div>
            </div>
          </div>
        </div>

        {/* Linked Profiles Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 md:p-6">
          <h2 className="font-semibold text-slate-900 mb-4 text-lg md:text-xl">
            Linked Profiles
          </h2>
          <div className="space-y-3">
            {allProfiles
              .filter((p) => p.id !== currentProfile.id)
              .map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onClick={() => setCurrentProfile(profile)}
                  onEdit={() => router.push(`/wizard?edit=${profile.id}`)}
                />
              ))}
          </div>
          <Button
            onClick={() => router.push("/wizard")}
            variant="outline"
            className="mt-4 border-blue-500 text-blue-600 hover:bg-blue-50 rounded-full px-4 py-2"
          >
            + Add Family Member
          </Button>
        </div>

        {/* Safety & Alerts Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 md:p-6">
          <h2 className="font-semibold text-slate-900 mb-4 text-lg md:text-xl">
            Safety & Alerts
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-700">Alert Sensitivity</span>
              <span className="text-sm font-medium text-slate-900">
                {currentProfile.alertSensitivity}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-700">Expiry Reminders</span>
              <span className="text-sm font-medium text-slate-900">
                {currentProfile.expiryReminders ? "Enabled" : "Disabled"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-slate-700">Scan Warnings</span>
              <span className="text-sm font-medium text-slate-900">
                {scanWarningsLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="space-y-3 pt-2">
          {/* <Button
            onClick={() => router.push("/wizard")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Edit Profile
          </Button> */}
          <button
            onClick={() => {
              localStorage.clear();
              router.push("/login");
            }}
            className="w-full text-center text-sm text-slate-500 hover:text-slate-700 py-2"
          >
            Logout
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
