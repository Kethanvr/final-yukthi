"use client";

import { useState } from "react";
import { BottomNav } from "@/components/navigation/BottomNav";

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
      <div className="bg-white border-b border-blue-200 px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900">Reminders</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-blue-200 px-4 md:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex gap-6 md:gap-8 lg:gap-10">
            <button
              onClick={() => setActiveTab("expiry")}
              className={`pb-3 md:pb-4 px-1 md:px-2 border-b-2 transition-colors min-h-[44px] flex items-center text-sm md:text-base lg:text-lg font-medium ${
                activeTab === "expiry"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-blue-600 hover:text-blue-800"
              }`}
            >
              Expiry Tracker
            </button>
            <button
              onClick={() => setActiveTab("medicine")}
              className={`pb-3 md:pb-4 px-1 md:px-2 border-b-2 transition-colors min-h-[44px] flex items-center text-sm md:text-base lg:text-lg font-medium ${
                activeTab === "medicine"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-blue-600 hover:text-blue-800"
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
                className="bg-white rounded-xl shadow-sm border border-blue-200 p-5 md:p-6 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-4 md:mb-5">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-blue-900 text-lg md:text-xl mb-2">{item.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.status === "urgent" ? "bg-red-500" : "bg-green-500"}`} />
                      <p
                        className={`text-sm md:text-base font-medium ${
                          item.status === "urgent"
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                      >
                        Expires in {item.expiresIn}
                      </p>
                    </div>
                  </div>
                </div>
                <button className="w-full px-4 py-3 bg-blue-50 text-blue-700 text-sm md:text-base rounded-lg hover:bg-blue-100 transition-colors min-h-[44px] font-medium border border-blue-200">
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
                className="bg-white rounded-xl shadow-sm border border-blue-200 p-5 md:p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 md:gap-5 flex-1">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={item.taken}
                        className="w-6 h-6 md:w-7 md:h-7 cursor-pointer accent-blue-600"
                        onChange={() => {}}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-blue-900 text-lg md:text-xl">{item.name}</h3>
                      <p className="text-sm md:text-base text-blue-600 mt-1.5 font-medium">{item.schedule}</p>
                    </div>
                  </div>
                  {item.taken && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}


