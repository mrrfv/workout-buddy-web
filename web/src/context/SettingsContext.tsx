"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type Settings = {
  aiProvider: string;
  aiEndpoint: string;
  aiModel: string;
  notificationSound: boolean;
  captureInterval: number;
  maxCountdown: number;
};

const defaultSettings: Settings = {
  aiProvider: "Local Model",
  aiEndpoint: "",
  aiModel: "",
  notificationSound: true,
  captureInterval: 1.1,
  maxCountdown: 60,
};

const SettingsContext = createContext<{
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}>({
  settings: defaultSettings,
  setSettings: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem("settings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}