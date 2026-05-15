import { Settings } from "@/context/SettingsContext";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createOllama } from "ai-sdk-ollama";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export function getAI(settings: Settings) {
    switch (settings.aiProvider) {
        case "OpenRouter":
            return createOpenRouter({
                apiKey: settings.aiApiKey,
            }).chat;
        case "OpenAI Compatible":
            return createOpenAICompatible({
                name: settings.aiModel,
                baseURL: settings.aiEndpoint,
                apiKey: settings.aiApiKey,
                includeUsage: true,
                supportsStructuredOutputs: true,
            });
        default:
            return createOllama({ baseURL: settings.aiEndpoint });
    }
}