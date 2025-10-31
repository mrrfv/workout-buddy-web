"use client";

import { useState, useRef, useEffect } from 'react';
import { system_prompt } from '../vars';
import { generateObject } from 'ai';
import { createOllama } from 'ai-sdk-ollama';
import z from 'zod';
import { useSettings } from '@/context/SettingsContext';
import useSound from 'use-sound';
import { getAI } from '../helpers';

export default function Home() {
  const [captures, setCaptures] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const {settings, setSettings} = useSettings();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const aiRef = useRef(getAI(settings));
  const [playSound] = useSound("/ding.mp3");

  // Check if all settings are configured
  const settingsConfigured = settings.aiProvider && settings.aiModel;

  // Start screen capture
  const startCapturing = async () => {
    if (!settingsConfigured) {
      alert("Please configure your settings before starting screen capture.");
      return;
    } 

    // First get notification permission for later use
    if (Notification.permission !== "granted") {
      await Notification.requestPermission();
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCapturing(true);
    } catch (err) {
      console.error("Error accessing screen capture:", err);
    }
  };

  // Stop screen capture
  const stopCapturing = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCapturing(false);
  };

  // Capture a frame from the video stream
  const captureFrame = () => {
    if (videoRef.current && streamRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const image = canvas.toDataURL('image/png');
        setCaptures(prev => [...prev, image]);
      }
    }
  };

  // Perform a task with the captured images
  const performTask = async (images: string[]) => {
    console.log("Performing task with captured images:", images);

    // Save the process start time
    const taskStarted = Date.now();

    const input_images = images.map(img => ({
      type: 'image' as const,
      image: img,
    }));

    const result = await generateObject({
      model: aiRef.current(settings.aiModel),
      schema: z.object({
        image_comparison_and_analysis: z.string().min(100),
        images_are_relevant: z.boolean(),
        reasoning: z.string().min(15),
        time_remaining_in_seconds: z.number().min(0),
      }),
      messages: [
        { role: "system", content: system_prompt },
        {
          role: "user", content: [
            { type: "text" as const, text: "Analyze the following three screenshots and determine if a visible countdown is present within the content of what may be a workout video. Respond with a JSON object as specified in the system prompt." },
            ...input_images,
          ]
        },
      ],
    });

    console.log("Response:", result.object);

    // If time_remaining_in_seconds is present, wait for that duration before showing a notification
    if (result.object.time_remaining_in_seconds) {
      // Calculate how much time has already passed
      const elapsedTime = Date.now() - taskStarted;
      const waitTime = Math.max(0, result.object.time_remaining_in_seconds * 1000 - elapsedTime);
      return waitTime;      
    }

    // Reset captures after performing the task
    setCaptures([]);
  };

  // Set up interval for capturing frames
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCapturing && !isProcessing && !isWaiting) {
      interval = setInterval(() => {
        captureFrame();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCapturing, isProcessing, isWaiting]);

  // Check if 3 captures have been taken and perform the task
  useEffect(() => {
    if (captures.length === 3) {
      setIsProcessing(true);
      performTask(captures)
      .then((waitTime) => {
        if (waitTime && waitTime > 0) {
          setIsWaiting(true);
          setTimeout(() => {
            new Notification("Workout Buddy", {
              body: "Countdown complete!",
            });
            if (settings.notificationSound) {
              playSound({ forceSoundEnabled: true });
            }
            setIsWaiting(false);
          }, waitTime);
        }
      })
      .finally(() => {
        setIsProcessing(false);
        setCaptures([]);
      });
    }
  }, [captures]);

  useEffect(() => {
    if (isCapturing && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCapturing, streamRef.current]);

  // Recreate ollama client if settings change
  useEffect(() => {
    aiRef.current = getAI(settings);
  }, [settings]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 dark:bg-gray-900">
      <main className=" min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        {!isCapturing ? (
          <div className='text-center'>
            <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Ready? Set?</h1>
            <button className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg font-bold" onClick={startCapturing}>Start Screen Capture</button>
          </div>
        ) : (
          <>
          <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Go!</h1>
          <h2 className="text-lg font-medium mb-4 text-black dark:text-white mb-4">Workout Buddy is capturing your screen. Go ahead with your workout.</h2>
          <div className='flex flex-row justify-between items-center'>
          <h1 className="text-xl font-bold text-black dark:text-white">{isProcessing ? "Processing..." : isWaiting ? "Counting down..." : "Capturing..."}</h1>
          <button className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg font-bold" onClick={stopCapturing}>Stop Capture</button>
          </div>
          <div className="bg-gray-500 rounded-lg p-4 mt-8">
            <h1 className="text-2xl font-bold mb-4 text-white">Screen Capture Preview</h1>
            <div className="flex flex-row gap-4 mt-8 overflow-x-auto">
              <video
                ref={videoRef}
                autoPlay
                style={{ width: '100%', maxHeight: '100px', background: '#222', display: 'none' }}
              />
              {captures.map((capture, index) => (
                <img
                  key={index}
                  src={capture}
                  alt={`Capture ${index + 1}`}
                  style={{ maxWidth: '100%', maxHeight: '100px' }} />
              ))}
            </div>
          </div></>
        )}
      </main>
    </div>
  );
}
