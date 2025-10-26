"use client";

import Image from 'next/image'
import { SettingsComponent } from '../settings/component';
import { useState } from 'react';
import { generateText } from 'ai';
import { createOllama } from 'ai-sdk-ollama';
import { useSettings } from '@/context/SettingsContext';
import Link from 'next/link';

export default function GetStarted() {
    const [testing, setTesting] = useState(false);
    const {settings, setSettings} = useSettings();

    const testSettings = async () => {
        setTesting(true);
        console.log(settings);
        // Create ollama instance with current settings
        const ollama = createOllama({
            baseURL: settings.aiEndpoint,
        });

        // Run a simple ollama request to test settings
        await generateText({
            model: ollama(settings.aiModel),
            prompt: "Say 'Hello, World!'",
        })
        .then((resp) => {
            alert("Test completed. Model said: " + resp?.text);
        })
        .catch(err => {
            alert("Error during test: " + err.message);
        });
        setTesting(false);
    }

    return (
        <>
            <section className="flex min-h-screen flex-col items-center justify-center bg-gray-200 dark:bg-gray-900">
                <h1 className="text-4xl font-bold my-4 text-center">Get Started with Workout Buddy</h1>
                <p className="text-lg text-center max-w-xl mb-2 px-4">To begin, you need to set up Ollama - a local AI model server.</p>
                <p className="text-lg text-center max-w-xl mb-8 px-4">Follow the instructions below to install and run Ollama on your machine.</p>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-3xl w-full border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-row mb-6 justify-center items-center">
                        <Image
                            src="/ollama.webp"
                            alt="Ollama Logo"
                            className="mr-4"
                            width={40}
                            height={40}
                        />
                        <h1 className="text-3xl font-bold">Ollama Setup Instructions</h1>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Step 1: Install Ollama</h2>
                    <p className="mb-4">Download and install Ollama from the official website:</p>
                    <a href="https://ollama.com/download" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://ollama.com/download</a>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Step 2: Download a Model</h2>
                    <p className="mb-4">Open a terminal (e.g. Windows Terminal) and enter the following command to download a model (e.g., gemma3:4b):</p>
                    <pre className="bg-gray-200 dark:bg-gray-700 p-4 mb-4 rounded-lg overflow-x-auto"><code>ollama pull gemma3:4b</code></pre>
                    <p className="mb-4">You can replace <code>gemma3:4b</code> with any other <b>vision</b> model <a target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:underline' href="https://ollama.com/search?c=vision">available</a> on Ollama. The choice depends on your hardware capabilities.</p>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Step 3: Configure CORS</h2>
                    <p className="mb-4">Lastly, to allow Workout Buddy to communicate with Ollama, you need to enable CORS. Please follow the instructions <a href="https://objectgraph.com/blog/ollama-cors/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">here</a> to set up CORS properly. You may need to reboot or at least restart Ollama.</p>
                </div>
                <p className="text-lg text-center max-w-xl my-8 px-4">Now, it's time to configure settings and test them.</p>
                <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-3xl w-full border border-gray-200 dark:border-gray-700'>
                    <SettingsComponent />
                </div>
                <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-bold" onClick={testSettings} disabled={testing}>{testing ? "Testing..." : "Test Settings"}</button>
                <div className='flex flex-row flex-wrap justify-center items-center mt-8'>
                    <p className="text-lg text-center max-w-xl my-8 px-4">If the test is successful, grab a water bottle, and...</p>
                    <Link href="/workout" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 mb-4 rounded-lg font-bold">Go to Workout</Link>
                </div>
            </section>
        </>
    );
}