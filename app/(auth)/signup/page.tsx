"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
        <div className="text-center mb-6 md:mb-8 lg:mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-3">
            Create Account
          </h1>
          <p className="text-gray-600 text-base md:text-lg lg:text-xl">
            Set up profiles for your family members
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10">
          <div className="space-y-4 md:space-y-5 mb-6 md:mb-8">
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2 md:mb-3">
                Email or Phone
              </label>
              <input
                type="text"
                placeholder="your@email.com"
                className="w-full px-4 md:px-5 lg:px-6 py-2.5 md:py-3 lg:py-3.5 text-base md:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] md:min-h-[48px]"
              />
            </div>
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2 md:mb-3">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 md:px-5 lg:px-6 py-2.5 md:py-3 lg:py-3.5 text-base md:text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] md:min-h-[48px]"
              />
            </div>
          </div>

          <Button
            onClick={() => router.push("/wizard")}
            className="w-full mb-4 md:mb-5 min-h-[48px] md:min-h-[52px] text-base md:text-lg"
            size="lg"
          >
            Sign Up
          </Button>

          <div className="relative my-6 md:my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm md:text-base">
              <span className="px-2 md:px-3 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <Button
            onClick={() => router.push("/wizard")}
            variant="outline"
            className="w-full min-h-[48px] md:min-h-[52px] text-base md:text-lg"
            size="lg"
          >
            Continue with Google
          </Button>

          <div className="mt-4 md:mt-6 text-center">
            <button
              onClick={() => router.push("/login")}
              className="text-blue-600 hover:underline text-sm md:text-base"
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


