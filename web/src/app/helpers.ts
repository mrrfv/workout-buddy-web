import { Settings } from "@/context/SettingsContext";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createOllama } from "ai-sdk-ollama";

export function getAI(settings: Settings) {
    if (settings.aiProvider === "OpenRouter") {
        return createOpenRouter({
            apiKey: settings.openRouterApiKey,
        }).chat;
    } else {
        return createOllama({ baseURL: settings.aiEndpoint });
    }
}