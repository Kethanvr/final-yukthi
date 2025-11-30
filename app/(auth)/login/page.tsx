"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/lib/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { allProfiles } = useApp();
  const [selectedProfileId, setSelectedProfileId] = useState("");

  const handleLogin = () => {
    if (selectedProfileId) {
      localStorage.setItem("instascan_current_profile", selectedProfileId);
      router.push("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
        <div className="text-center mb-6 md:mb-8 lg:mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-3">
            Welcome to InstaScan
          </h1>
          <p className="text-gray-600 text-base md:text-lg lg:text-xl">
            Smart product safety scanner for your family
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10">
          {allProfiles.length > 0 ? (
            <>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6">
                Select Profile
              </h2>
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {allProfiles.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => setSelectedProfileId(profile.id)}
                    className={`w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-lg border-2 transition-colors min-h-[64px] md:min-h-[72px] ${
                      selectedProfileId === profile.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg md:text-xl lg:text-2xl flex-shrink-0">
                      {profile.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="font-medium text-base md:text-lg lg:text-xl">
                        {profile.name}
                      </div>
                      <div className="text-sm md:text-base text-gray-600">
                        {profile.age} years • {profile.biologicalSex}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <Button
                onClick={handleLogin}
                disabled={!selectedProfileId}
                className="w-full min-h-[48px] md:min-h-[52px] text-base md:text-lg"
                size="lg"
              >
                Continue
              </Button>
              <div className="mt-4 md:mt-6 text-center">
                <button
                  onClick={() => router.push("/signup")}
                  className="text-blue-600 hover:underline text-sm md:text-base"
                >
                  Create New Profile
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg">
                Create your first profile to get started
              </p>
              <Button
                onClick={() => router.push("/wizard")}
                className="w-full min-h-[48px] md:min-h-[52px] text-base md:text-lg"
                size="lg"
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        <div className="mt-6 md:mt-8 text-center text-sm md:text-base text-gray-600">
          By continuing, you agree to our Terms & Privacy Policy
        </div>
      </div>
    </div>
  );
}
