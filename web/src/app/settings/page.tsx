"use client";
import { useSettings } from "../../context/SettingsContext";

export default function Settings() {
  const { settings, setSettings } = useSettings();

  function updateSetting(key: keyof typeof settings, value: any) {
    setSettings({ ...settings, [key]: value });
  }

  return (
    <>
      <h1 className="text-2xl font-bold mt-12">Settings</h1>
      <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="mt-8 w-full max-w-2xl">
          <div className="flex flex-row justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-medium">AI Provider</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pick between locally hosted Ollama (fast and private) or a slower free model.</p>
            </div>
            <select
              className="w-40 h-6 bg-white text-black"
              value={settings.aiProvider}
              onChange={e => updateSetting("aiProvider", e.target.value)}
            >
              <option>Local Model</option>
              <option>Cloud Model</option>
            </select>
          </div>
          <div className="flex flex-row justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-medium">AI Model</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sets the AI model to use.</p>
            </div>
            <input
              type="text"
              className="w-40 h-6 bg-white text-black"
              value={settings.aiModel}
              onChange={e => updateSetting("aiModel", e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-medium">Notification Sound</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enable or disable sound notifications when the countdown ends.</p>
            </div>
            <input
              type="checkbox"
              className="w-6 h-6"
              checked={settings.notificationSound}
              onChange={e => updateSetting("notificationSound", e.target.checked)}
            />
          </div>
          <div className="flex flex-row justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-medium">Capture Interval (seconds)</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Set the time interval between each screen capture.</p>
            </div>
            <input
              type="number"
              className="w-20 p-1 border border-gray-300 rounded"
              value={settings.captureInterval}
              min={1}
              onChange={e => updateSetting("captureInterval", Number(e.target.value))}
            />
          </div>
          <div className="flex flex-row justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-medium">Reject Countdowns Higher Than (seconds)</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Set the maximum countdown time to consider valid. Helps filter out bogus detections.</p>
            </div>
            <input
              type="number"
              className="w-20 p-1 border border-gray-300 rounded"
              value={settings.maxCountdown}
              min={20}
              onChange={e => updateSetting("maxCountdown", Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </>
  );
}