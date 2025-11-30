"use client";

import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/navigation/BottomNav";
import { FloatingScanButton } from "@/components/navigation/FloatingScanButton";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { useApp } from "@/lib/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/profile/Avatar";

export default function ProfilePage() {
  const router = useRouter();
  const { currentProfile, allProfiles, setCurrentProfile } = useApp();

  if (!currentProfile) {
    return null;
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-6 bg-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
        <div className="max-w-screen-xl mx-auto text-center">
          <div className="mx-auto mb-4 md:mb-5 lg:mb-6">
            <Avatar profile={currentProfile} size="xl" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900">{currentProfile.name}</h1>
          <p className="text-blue-600 text-base md:text-lg lg:text-xl mt-2">
            {currentProfile.age} years • {currentProfile.biologicalSex}
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        {/* Desktop: 2-column grid, Mobile: single column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Health Profile */}
          <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-4 md:p-5 lg:p-6">
            <h2 className="font-semibold text-blue-900 mb-4 md:mb-5 text-base md:text-lg lg:text-xl">
              Health Profile
            </h2>

            {currentProfile.chronicConditions.length > 0 && (
              <div className="mb-4 md:mb-5">
                <div className="text-sm md:text-base font-medium text-blue-700 mb-2 md:mb-3">
                  Medical Conditions
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {currentProfile.chronicConditions.map((condition) => (
                    <span
                      key={condition}
                      className="px-3 py-1 md:px-4 md:py-1.5 bg-blue-100 text-blue-700 text-sm md:text-base rounded-full"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {currentProfile.foodAllergies.length > 0 && (
              <div className="mb-4 md:mb-5">
                <div className="text-sm md:text-base font-medium text-blue-700 mb-2 md:mb-3">
                  Food Allergies
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {currentProfile.foodAllergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="px-3 py-1 md:px-4 md:py-1.5 bg-red-100 text-red-700 text-sm md:text-base rounded-full"
                    >
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {currentProfile.drugAllergies.length > 0 && (
              <div className="mb-4 md:mb-5">
                <div className="text-sm md:text-base font-medium text-blue-700 mb-2 md:mb-3">
                  Drug Allergies
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {currentProfile.drugAllergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="px-3 py-1 md:px-4 md:py-1.5 bg-red-100 text-red-700 text-sm md:text-base rounded-full"
                    >
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {currentProfile.dietaryPreferences.length > 0 && (
              <div>
                <div className="text-sm md:text-base font-medium text-blue-700 mb-2 md:mb-3">
                  Dietary Preferences
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {currentProfile.dietaryPreferences.map((pref) => (
                    <span
                      key={pref}
                      className="px-3 py-1 md:px-4 md:py-1.5 bg-blue-100 text-blue-700 text-sm md:text-base rounded-full"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Skin Profile */}
          <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-4 md:p-5 lg:p-6">
            <h2 className="font-semibold text-blue-900 mb-4 md:mb-5 text-base md:text-lg lg:text-xl">Skin Profile</h2>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div>
                <div className="text-sm md:text-base text-blue-600 mb-1">Skin Type</div>
                <div className="font-medium text-base md:text-lg">{currentProfile.skinType}</div>
              </div>
              <div>
                <div className="text-sm md:text-base text-blue-600 mb-1">Sensitivity</div>
                <div className="font-medium text-base md:text-lg">
                  {currentProfile.skinSensitivity}
                </div>
              </div>
            </div>
          </div>

          {/* Family Profiles */}
          <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-4 md:p-5 lg:p-6 lg:col-span-2">
            <h2 className="font-semibold text-blue-900 mb-4 md:mb-5 text-base md:text-lg lg:text-xl">
              Family Profiles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {allProfiles.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onClick={() => setCurrentProfile(profile)}
                />
              ))}
            </div>
            <Button
              onClick={() => router.push("/wizard")}
              variant="outline"
              className="w-full mt-4 md:mt-5"
            >
              + Add New Profile
            </Button>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-4 md:p-5 lg:p-6">
            <h2 className="font-semibold text-blue-900 mb-4 md:mb-5 text-base md:text-lg lg:text-xl">Settings</h2>
            <div className="space-y-3 md:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-700 text-sm md:text-base">Alert Sensitivity</span>
                <span className="text-blue-900 font-medium text-sm md:text-base">
                  {currentProfile.alertSensitivity}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-700 text-sm md:text-base">Expiry Reminders</span>
                <span className="text-blue-900 font-medium text-sm md:text-base">
                  {currentProfile.expiryReminders ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 md:space-y-4 lg:col-span-2">
            <Button
              onClick={() => router.push("/wizard")}
              variant="outline"
              className="w-full"
            >
              Edit Profile
            </Button>
            <Button
              onClick={() => {
                localStorage.clear();
                router.push("/login");
              }}
              variant="destructive"
              className="w-full"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <FloatingScanButton />
      <BottomNav />
    </div>
  );
}
