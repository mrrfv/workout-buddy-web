"use client";

import { useSettings } from "@/context/SettingsContext";
import Link from "next/link";

export function DynamicLandingButtons() {
    const { settings, setSettings } = useSettings();

    return (
        <>
            <div className="flex flex-row">
                {settings.aiModel ? (
                    <>
                    <Link href="/workout" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-bold mr-4">Work Out</Link>
                    <Link href="/settings" className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-bold mr-4">Settings</Link>
                    </>
                ) : (
                    <Link href="/get-started" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-bold">Get Started</Link>
                )}
            </div>
        </>
    );
};