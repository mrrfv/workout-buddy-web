import { useSettings } from "../../context/SettingsContext";

export function SettingsComponent() {
    const { settings, setSettings } = useSettings();

    function updateSetting(key: any, value: any) {
        console.log(key, value);

        // Use functional update to avoid reading stale settings
        setSettings(prev => {
            // If switching to Local Model, ensure aiEndpoint is set to default
            if (key === "aiProvider" && value === "Local Model") {
                return { ...prev, aiProvider: value, aiEndpoint: "http://localhost:11434" };
            }

            // Otherwise just update the single key
            return { ...prev, [key]: value };
        });
    }

    return (
        <>
            <div className="flex flex-row justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-medium">AI Provider</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mr-2">Pick between locally hosted Ollama or OpenRouter.</p>
                </div>
                <select
                    className="w-40 h-6 bg-white text-black"
                    value={settings.aiProvider}
                    onChange={e => updateSetting("aiProvider", e.target.value)}
                >
                    <option>Local Model</option>
                    <option>Custom Endpoint</option>
                    <option>OpenRouter</option>
                </select>
            </div>
            {settings.aiProvider === "Custom Endpoint" && (
                <div className="flex flex-row justify-between items-center mb-4">
                    <div>
                        <h2 className="text-lg font-medium">AI Endpoint</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Sets the custom endpoint for the Ollama API (e.g. https://ollama.yourdomain.com).</p>
                    </div>
                    <input
                        type="text"
                        className="w-40 h-6 bg-white text-black"
                        value={settings.aiEndpoint}
                        onChange={e => updateSetting("aiEndpoint", e.target.value)}
                    />
                </div>
            )}
            {settings.aiProvider === "OpenRouter" && (
                <>
                <p className="text-sm text-red-600 dark:text-yellow-400 mb-2">OpenRouter and providers may train models on your screenshots. Please check your logging settings before continuing. It's advised to only share the tab containing the video with Workout Buddy instead of the whole screen.</p>
                <div className="flex flex-row justify-between items-center mb-4">
                    <div>
                        <h2 className="text-lg font-medium">OpenRouter API Key</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Your OpenRouter API key for accessing their models.</p>
                    </div>
                    <input
                        type="text"
                        className="w-40 h-6 bg-white text-black"
                        value={settings.openRouterApiKey}
                        onChange={e => updateSetting("openRouterApiKey", e.target.value)}
                    />
                </div>
                </>
            )}
            <div className="flex flex-row justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-medium">AI Model</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Sets the AI model to use (e.g. ministral-3:3b).</p>
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
        </>
    )
};