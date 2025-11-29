"use client";

import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/navigation/BottomNav";
import { FloatingScanButton } from "@/components/navigation/FloatingScanButton";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { useApp } from "@/lib/context/AppContext";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  const router = useRouter();
  const { currentProfile, allProfiles, setCurrentProfile } = useApp();

  if (!currentProfile) {
    return null;
  }

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white px-4 py-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-bold mb-4">
            {currentProfile.name.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold">{currentProfile.name}</h1>
          <p className="text-blue-100">
            {currentProfile.age} years • {currentProfile.biologicalSex}
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Health Profile */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">🏥 Health Profile</h2>
          
          {currentProfile.chronicConditions.length > 0 && (
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Medical Conditions
              </div>
              <div className="flex flex-wrap gap-2">
                {currentProfile.chronicConditions.map((condition) => (
                  <span
                    key={condition}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          )}

          {currentProfile.foodAllergies.length > 0 && (
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Food Allergies
              </div>
              <div className="flex flex-wrap gap-2">
                {currentProfile.foodAllergies.map((allergy) => (
                  <span
                    key={allergy}
                    className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          )}

          {currentProfile.drugAllergies.length > 0 && (
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Drug Allergies
              </div>
              <div className="flex flex-wrap gap-2">
                {currentProfile.drugAllergies.map((allergy) => (
                  <span
                    key={allergy}
                    className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          )}

          {currentProfile.dietaryPreferences.length > 0 && (
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                Dietary Preferences
              </div>
              <div className="flex flex-wrap gap-2">
                {currentProfile.dietaryPreferences.map((pref) => (
                  <span
                    key={pref}
                    className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Skin Profile */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">💄 Skin Profile</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">Skin Type</div>
              <div className="font-medium">{currentProfile.skinType}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Sensitivity</div>
              <div className="font-medium">{currentProfile.skinSensitivity}</div>
            </div>
          </div>
        </div>

        {/* Family Profiles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">👨‍👩‍👧‍👦 Family Profiles</h2>
          <div className="space-y-3">
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
            className="w-full mt-4"
          >
            + Add New Profile
          </Button>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">⚙️ Settings</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Alert Sensitivity</span>
              <span className="text-gray-900 font-medium">
                {currentProfile.alertSensitivity}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Expiry Reminders</span>
              <span className="text-gray-900 font-medium">
                {currentProfile.expiryReminders ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
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
            variant="danger"
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </div>

      <FloatingScanButton />
      <BottomNav />
    </div>
  );
}

