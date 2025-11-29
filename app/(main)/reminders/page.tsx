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
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Reminders</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("expiry")}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === "expiry"
                ? "border-blue-600 text-blue-600 font-medium"
                : "border-transparent text-gray-600"
            }`}
          >
            Expiry Tracker
          </button>
          <button
            onClick={() => setActiveTab("medicine")}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === "medicine"
                ? "border-blue-600 text-blue-600 font-medium"
                : "border-transparent text-gray-600"
            }`}
          >
            Medicine Intake
          </button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {activeTab === "expiry" ? (
          <div className="space-y-3">
            {expiryItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p
                      className={`text-sm ${
                        item.status === "urgent"
                          ? "text-red-600 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      Expires in {item.expiresIn}
                    </p>
                  </div>
                  <button className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                    Consumed
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {medicineSchedule.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.taken}
                      className="w-5 h-5"
                      onChange={() => {}}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.schedule}</p>
                    </div>
                  </div>
                  {item.taken && (
                    <span className="text-green-600 text-xl">✓</span>
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

