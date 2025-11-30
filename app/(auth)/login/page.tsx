"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to InstaScan
          </h1>
          <p className="text-gray-600">
            Smart product safety scanner for your family
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {allProfiles.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Select Profile</h2>
              <div className="space-y-3 mb-6">
                {allProfiles.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => setSelectedProfileId(profile.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                      selectedProfileId === profile.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {profile.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{profile.name}</div>
                      <div className="text-sm text-gray-600">
                        {profile.age} years • {profile.biologicalSex}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <Button
                onClick={handleLogin}
                disabled={!selectedProfileId}
                className="w-full"
                size="lg"
              >
                Continue
              </Button>
              <div className="mt-4 text-center">
                <button
                  onClick={() => router.push("/signup")}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Create New Profile
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Create your first profile to get started
              </p>
              <Button
                onClick={() => router.push("/wizard")}
                className="w-full"
                size="lg"
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          By continuing, you agree to our Terms & Privacy Policy
        </div>
      </div>
    </div>
  );
}


