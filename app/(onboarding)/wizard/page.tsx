"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { UserProfile, BiologicalSex, SkinType, SensitivityLevel, AlertSensitivity } from "@/lib/types";
import { useApp } from "@/lib/context/AppContext";
import { CHRONIC_CONDITIONS, DERMATOLOGICAL_CONDITIONS, CURRENT_MEDICATIONS } from "@/lib/constants/conditions";
import { FOOD_ALLERGENS, COSMETIC_ALLERGENS, DRUG_ALLERGENS, DIETARY_PREFERENCES, NUTRITIONAL_GOALS } from "@/lib/constants/allergens";

export default function OnboardingWizardPage() {
  const router = useRouter();
  const { addProfile } = useApp();
  const [step, setStep] = useState(1);
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
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save profile
      const profile: UserProfile = {
        ...formData,
        id: `profile-${Date.now()}`,
        createdAt: new Date().toISOString(),
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
      } as UserProfile;
      
      addProfile(profile);
      router.push("/home");
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
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Identity & Demographics</h2>
            <p className="text-gray-600">Tell us about yourself</p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
                placeholder="e.g., Grandma, Baby, John"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {formData.age! > 0 && (
                <p className="text-sm text-gray-600 mt-1">Age: {formData.age} years</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biological Sex
              </label>
              <div className="flex gap-2">
                {["Male", "Female", "Other"].map((sex) => (
                  <button
                    key={sex}
                    onClick={() => updateFormData({ biologicalSex: sex as BiologicalSex })}
                    className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
                      formData.biologicalSex === sex
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
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
                    className="w-4 h-4"
                  />
                  <label htmlFor="pregnant" className="text-sm font-medium">
                    Currently Pregnant
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="breastfeeding"
                    checked={formData.isBreastfeeding}
                    onChange={(e) => updateFormData({ isBreastfeeding: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="breastfeeding" className="text-sm font-medium">
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
            <h2 className="text-2xl font-bold">Medical History</h2>
            <p className="text-gray-600">Select any conditions that apply</p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        : "border-gray-300 hover:border-gray-400"
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
                className="w-4 h-4"
              />
              <label htmlFor="lowImmunity" className="text-sm font-medium">
                Low Immunity / Autoimmune Disease
              </label>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Food Safety</h2>
            <p className="text-gray-600">Allergies and dietary preferences</p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {allergen}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        : "border-gray-300 hover:border-gray-400"
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
            <h2 className="text-2xl font-bold">Cosmetic & Skin Profile</h2>
            <p className="text-gray-600">Help us recommend safe products</p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skin Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["Oily", "Dry", "Combination", "Normal"].map((type) => (
                  <button
                    key={type}
                    onClick={() => updateFormData({ skinType: type as SkinType })}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                      formData.skinType === type
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skin Sensitivity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Low", "Medium", "High"].map((level) => (
                  <button
                    key={level}
                    onClick={() => updateFormData({ skinSensitivity: level as SensitivityLevel })}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                      formData.skinSensitivity === level
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        : "border-gray-300 hover:border-gray-400"
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
            <h2 className="text-2xl font-bold">Medicine Safety</h2>
            <p className="text-gray-600">Drug allergies and current medications</p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {allergen}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        : "border-gray-300 hover:border-gray-400"
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
            <h2 className="text-2xl font-bold">System Preferences</h2>
            <p className="text-gray-600">Customize how the app works for you</p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alert Sensitivity
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["Strict", "Moderate"].map((level) => (
                  <button
                    key={level}
                    onClick={() => updateFormData({ alertSensitivity: level as AlertSensitivity })}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                      formData.alertSensitivity === level
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="font-medium">{level}</div>
                    <div className="text-xs text-gray-600">
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
                className="w-4 h-4"
              />
              <label htmlFor="expiryReminders" className="text-sm font-medium">
                Enable Expiry Reminders
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-2"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex gap-4 mt-8 pt-6 border-t">
            {step > 1 && (
              <Button onClick={handleBack} variant="outline" className="flex-1">
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1"
              disabled={!formData.name || !formData.dateOfBirth}
            >
              {step === totalSteps ? "Complete" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

