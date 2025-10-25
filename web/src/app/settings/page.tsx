"use client";

import { SettingsComponent } from "./component";

export default function Settings() {
  return (
    <>
      <div className="min-h-screen bg-gray-900">
        <h1 className="text-2xl font-bold pt-12 text-center">Settings</h1>
        <div className="flex justify-center font-sans px-4 py-8">
          <div className="mt-8 w-full max-w-md bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <SettingsComponent />
          </div>
        </div>
      </div>
    </>
  );
}