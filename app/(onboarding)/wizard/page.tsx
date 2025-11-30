"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { UserProfile, BiologicalSex, SkinType, SensitivityLevel, AlertSensitivity } from "@/lib/types";
import { useApp } from "@/lib/context/AppContext";
import { CHRONIC_CONDITIONS, DERMATOLOGICAL_CONDITIONS, CURRENT_MEDICATIONS } from "@/lib/constants/conditions";
import { FOOD_ALLERGENS, COSMETIC_ALLERGENS, DRUG_ALLERGENS, DIETARY_PREFERENCES, NUTRITIONAL_GOALS } from "@/lib/constants/allergens";
import { BottomNav } from "@/components/navigation/BottomNav";
import { CameraIcon } from "@heroicons/react/24/outline";

export default function OnboardingWizardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editProfileId = searchParams.get("edit");
  const { addProfile, updateProfile, allProfiles } = useApp();
  const [step, setStep] = useState(1);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: "",
    dateOfBirth: "",
    age: 0,
    biologicalSex: "Male",
    isChild: false,
    isBaby: false,
    isPregnant: false,
    isBreastfeeding: false,
    chronicConditions: [],
    isLowImmunity: false,
    foodAllergies: [],
    dietaryPreferences: [],
    nutritionalGoals: [],
    skinType: "Normal",
    skinSensitivity: "Low",
    dermatologicalConditions: [],
    cosmeticAllergies: [],
    drugAllergies: [],
    currentMedications: [],
    alertSensitivity: "Moderate",
    expiryReminders: true,
    avatarUrl: "",
  });

  // Load existing profile if editing
  useEffect(() => {
    if (editProfileId && allProfiles.length > 0) {
      const existingProfile = allProfiles.find((p) => p.id === editProfileId);
      if (existingProfile) {
        setFormData(existingProfile);
        setAvatarPreview(existingProfile.avatarUrl || null);
      }
    }
  }, [editProfileId, allProfiles.length]);

  const totalSteps = 6;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        updateFormData({ avatarUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save or update profile
      if (editProfileId) {
        // Update existing profile
        const profile: UserProfile = {
          ...formData,
          id: editProfileId,
          avatarUrl: avatarPreview || formData.avatarUrl || "",
        } as UserProfile;
        updateProfile(profile);
        router.push("/profile");
      } else {
        // Create new profile
        const profile: UserProfile = {
          ...formData,
          id: `profile-${Date.now()}`,
          createdAt: new Date().toISOString(),
          avatarUrl: avatarPreview || formData.avatarUrl || "",
        } as UserProfile;
        addProfile(profile);
        router.push("/home");
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateFormData = (data: Partial<UserProfile>) => {
    setFormData({ ...formData, ...data });
  };

  const toggleArrayItem = (key: keyof UserProfile, item: string) => {
    const currentArray = (formData[key] as string[]) || [];
    if (currentArray.includes(item)) {
      updateFormData({ [key]: currentArray.filter((i) => i !== item) });
    } else {
      updateFormData({ [key]: [...currentArray, item] });
    }
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Identity & Demographics</h2>
              <p className="text-slate-600 mt-1">Tell us about yourself</p>
            </div>
            
            {/* Avatar Upload */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-2 border-slate-300"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center">
                    <span className="text-4xl font-semibold text-slate-600">
                      {formData.name ? formData.name.charAt(0).toUpperCase() : "?"}
                    </span>
                  </div>
                )}
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer shadow-lg transition-colors"
                >
                  <CameraIcon className="w-5 h-5" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-slate-500">Tap to upload profile photo</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Profile Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
                placeholder="e.g., Grandma, Baby, John"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => {
                  const age = calculateAge(e.target.value);
                  updateFormData({
                    dateOfBirth: e.target.value,
                    age,
                    isChild: age < 18,
                    isBaby: age < 1,
                  });
                }}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900"
              />
              {formData.age! > 0 && (
                <p className="text-sm text-slate-600 mt-1">Age: {formData.age} years</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Biological Sex
              </label>
              <div className="flex gap-2">
                {["Male", "Female", "Other"].map((sex) => (
                  <button
                    key={sex}
                    onClick={() => updateFormData({ biologicalSex: sex as BiologicalSex })}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors font-medium ${
                      formData.biologicalSex === sex
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-300 hover:border-slate-400 text-slate-700 bg-white"
                    }`}
                  >
                    {sex}
                  </button>
                ))}
              </div>
            </div>

            {formData.biologicalSex === "Female" && formData.age! >= 15 && (
              <>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="pregnant"
                    checked={formData.isPregnant}
                    onChange={(e) => updateFormData({ isPregnant: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="pregnant" className="text-sm font-medium text-slate-700">
                    Currently Pregnant
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="breastfeeding"
                    checked={formData.isBreastfeeding}
                    onChange={(e) => updateFormData({ isBreastfeeding: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="breastfeeding" className="text-sm font-medium text-slate-700">
                    Currently Breastfeeding
                  </label>
                </div>
              </>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Medical History</h2>
              <p className="text-slate-600 mt-1">Select any conditions that apply</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Chronic Conditions
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CHRONIC_CONDITIONS.map((condition) => (
                  <button
                    key={condition}
                    onClick={() => toggleArrayItem("chronicConditions", condition)}
                    className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                      formData.chronicConditions?.includes(condition)
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-300 hover:border-slate-400 bg-white text-slate-700"
                    }`}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="lowImmunity"
                checked={formData.isLowImmunity}
                onChange={(e) => updateFormData({ isLowImmunity: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="lowImmunity" className="text-sm font-medium text-slate-700">
                Low Immunity / Autoimmune Disease
              </label>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Food Safety</h2>
              <p className="text-slate-600 mt-1">Allergies and dietary preferences</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Food Allergies
              </label>
              <div className="grid grid-cols-2 gap-2">
                {FOOD_ALLERGENS.map((allergen) => (
                  <button
                    key={allergen}
                    onClick={() => toggleArrayItem("foodAllergies", allergen)}
                    className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                      formData.foodAllergies?.includes(allergen)
                        ? "border-red-600 bg-red-50 text-red-700"
                        : "border-slate-300 hover:border-slate-400 bg-white text-slate-700"
                    }`}
                  >
                    {allergen}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Dietary Preferences
              </label>
              <div className="grid grid-cols-2 gap-2">
                {DIETARY_PREFERENCES.map((pref) => (
                  <button
                    key={pref}
                    onClick={() => toggleArrayItem("dietaryPreferences", pref)}
                    className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                      formData.dietaryPreferences?.includes(pref)
                        ? "border-green-600 bg-green-50 text-green-700"
                        : "border-slate-300 hover:border-slate-400 bg-white text-slate-700"
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nutritional Goals (Optional)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {NUTRITIONAL_GOALS.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => toggleArrayItem("nutritionalGoals", goal)}
                    className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                      formData.nutritionalGoals?.includes(goal)
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-300 hover:border-slate-400 bg-white text-slate-700"
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Cosmetic & Skin Profile</h2>
              <p className="text-slate-600 mt-1">Help us recommend safe products</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Skin Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["Oily", "Dry", "Combination", "Normal"].map((type) => (
                  <button
                    key={type}
                    onClick={() => updateFormData({ skinType: type as SkinType })}
                    className={`px-4 py-3 rounded-lg border-2 transition-colors font-medium ${
                      formData.skinType === type
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-300 hover:border-slate-400 bg-white text-slate-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Skin Sensitivity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Low", "Medium", "High"].map((level) => (
                  <button
                    key={level}
                    onClick={() => updateFormData({ skinSensitivity: level as SensitivityLevel })}
                    className={`px-4 py-3 rounded-lg border-2 transition-colors font-medium ${
                      formData.skinSensitivity === level
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-300 hover:border-slate-400 bg-white text-slate-700"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Skin Conditions
              </label>
              <div className="grid grid-cols-2 gap-2">
                {DERMATOLOGICAL_CONDITIONS.map((condition) => (
                  <button
                    key={condition}
                    onClick={() => toggleArrayItem("dermatologicalConditions", condition)}
                    className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                      formData.dermatologicalConditions?.includes(condition)
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-300 hover:border-slate-400 bg-white text-slate-700"
                    }`}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Cosmetic Allergies
              </label>
              <div className="grid grid-cols-2 gap-2">
                {COSMETIC_ALLERGENS.map((allergen) => (
                  <button
                    key={allergen}
                    onClick={() => toggleArrayItem("cosmeticAllergies", allergen)}
                    className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                      formData.cosmeticAllergies?.includes(allergen)
                        ? "border-red-600 bg-red-50 text-red-700"
                        : "border-slate-300 hover:border-slate-400 bg-white text-slate-700"
                    }`}
                  >
                    {allergen}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Medicine Safety</h2>
              <p className="text-slate-600 mt-1">Drug allergies and current medications</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Drug Allergies
              </label>
              <div className="grid grid-cols-2 gap-2">
                {DRUG_ALLERGENS.map((allergen) => (
                  <button
                    key={allergen}
                    onClick={() => toggleArrayItem("drugAllergies", allergen)}
                    className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                      formData.drugAllergies?.includes(allergen)
                        ? "border-red-600 bg-red-50 text-red-700"
                        : "border-slate-300 hover:border-slate-400 bg-white text-slate-700"
                    }`}
                  >
                    {allergen}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Current Medications
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CURRENT_MEDICATIONS.map((med) => (
                  <button
                    key={med}
                    onClick={() => toggleArrayItem("currentMedications", med)}
                    className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                      formData.currentMedications?.includes(med)
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-300 hover:border-slate-400 bg-white text-slate-700"
                    }`}
                  >
                    {med}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">System Preferences</h2>
              <p className="text-slate-600 mt-1">Customize how the app works for you</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Alert Sensitivity
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["Strict", "Moderate"].map((level) => (
                  <button
                    key={level}
                    onClick={() => updateFormData({ alertSensitivity: level as AlertSensitivity })}
                    className={`px-4 py-3 rounded-lg border-2 transition-colors text-left ${
                      formData.alertSensitivity === level
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-300 hover:border-slate-400 bg-white"
                    }`}
                  >
                    <div className="font-medium text-slate-900">{level}</div>
                    <div className="text-xs text-slate-600 mt-1">
                      {level === "Strict" ? "Warn on everything" : "Major risks only"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="expiryReminders"
                checked={formData.expiryReminders}
                onChange={(e) => updateFormData({ expiryReminders: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="expiryReminders" className="text-sm font-medium text-slate-700">
                Enable Expiry Reminders
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Emergency Contact (Optional)
              </label>
              <input
                type="text"
                placeholder="Name"
                value={formData.emergencyContact?.name || ""}
                onChange={(e) =>
                  updateFormData({
                    emergencyContact: {
                      name: e.target.value,
                      phone: formData.emergencyContact?.phone || "",
                    },
                  })
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900 mb-2"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.emergencyContact?.phone || ""}
                onChange={(e) =>
                  updateFormData({
                    emergencyContact: {
                      name: formData.emergencyContact?.name || "",
                      phone: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isEditMode = !!editProfileId;

  return (
    <div className={`min-h-screen ${isEditMode ? 'pb-20 lg:pb-6' : ''} bg-slate-50`}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {!isEditMode && (
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">
              Create New Profile
            </h1>
            <p className="text-slate-600">
              Let's set up a health profile for better product safety recommendations
            </p>
          </div>
        )}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">
                Step {step} of {totalSteps}
              </span>
              <span className="text-sm text-slate-600">
                {Math.round((step / totalSteps) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="max-h-[60vh] overflow-y-auto pr-2 mb-6">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex gap-4 pt-6 border-t border-slate-200">
            {step > 1 && (
              <Button onClick={handleBack} variant="outline" className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50">
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!formData.name || !formData.dateOfBirth}
            >
              {step === totalSteps ? (editProfileId ? "Save Changes" : "Complete") : "Next"}
            </Button>
          </div>
        </div>
      </div>
      {isEditMode && <BottomNav />}
    </div>
  );
}


