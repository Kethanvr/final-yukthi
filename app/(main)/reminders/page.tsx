"use client";

import { useState } from "react";
import { BottomNav } from "@/components/navigation/BottomNav";
import { FloatingScanButton } from "@/components/navigation/FloatingScanButton";

export default function RemindersPage() {
  const [activeTab, setActiveTab] = useState<"expiry" | "medicine">("expiry");

  const expiryItems = [
    { id: "1", name: "Amul Taaza Milk", expiresIn: "2 days", status: "urgent" },
    { id: "2", name: "Kissan Jam", expiresIn: "3 months", status: "safe" },
  ];

  const medicineSchedule = [
    { id: "1", name: "Paracetamol", schedule: "After Lunch", taken: false },
    { id: "2", name: "Vitamin D", schedule: "Morning", taken: true },
  ];

  return (
    <div className="min-h-screen pb-20 lg:pb-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Reminders</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex gap-6 md:gap-8 lg:gap-10">
            <button
              onClick={() => setActiveTab("expiry")}
              className={`pb-3 md:pb-4 px-1 md:px-2 border-b-2 transition-colors min-h-[44px] flex items-center text-sm md:text-base lg:text-lg ${
                activeTab === "expiry"
                  ? "border-slate-600 text-slate-600 font-medium"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Expiry Tracker
            </button>
            <button
              onClick={() => setActiveTab("medicine")}
              className={`pb-3 md:pb-4 px-1 md:px-2 border-b-2 transition-colors min-h-[44px] flex items-center text-sm md:text-base lg:text-lg ${
                activeTab === "medicine"
                  ? "border-slate-600 text-slate-600 font-medium"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Medicine Intake
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        {activeTab === "expiry" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {expiryItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-5 lg:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3 md:mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-1 md:mb-2">{item.name}</h3>
                    <p
                      className={`text-sm md:text-base ${
                        item.status === "urgent"
                          ? "text-red-600 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      Expires in {item.expiresIn}
                    </p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 md:py-2.5 bg-slate-100 text-slate-700 text-sm md:text-base rounded-full hover:bg-slate-200 transition-colors min-h-[44px]">
                  Mark as Consumed
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {medicineSchedule.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-5 lg:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4 flex-1">
                    <input
                      type="checkbox"
                      checked={item.taken}
                      className="w-5 h-5 md:w-6 md:h-6 cursor-pointer"
                      onChange={() => {}}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-base md:text-lg">{item.name}</h3>
                      <p className="text-sm md:text-base text-gray-600 mt-1">{item.schedule}</p>
                    </div>
                  </div>
                  {item.taken && (
                    <span className="text-green-600 text-xl md:text-2xl flex-shrink-0">✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FloatingScanButton />
      <BottomNav />
    </div>
  );
}


