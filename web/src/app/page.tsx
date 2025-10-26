import { DynamicLandingButtons } from "./dynamic_buttons";
import Image from "next/image";

export default function Landing() {
    return (
        <>
            <section className="flex min-h-screen lg:flex-row flex-col items-center justify-center font-sans bg-gray-900">
                <Image src="/demo.webp" alt="Workout Buddy Demo" width={370} height={349} className="rounded-lg shadow-lg mb-8 lg:order-last lg:ml-8"/>
                <div>
                    <h1 className="text-4xl font-bold mb-4 text-center">Feel the burn. Don't burn your ears.</h1>
                    <p className="text-lg text-center max-w-xl mb-4 px-4">Workout Buddy combines workout videos with private vision language models (AI) to help you stay on track by analyzing your screen and providing timely notifications.</p>
                    <p className="text-lg text-center max-w-xl mb-8 px-4">Mute the video, <b>play your own music</b>, and let Workout Buddy alert you when it's time to switch exercises or take a break.</p>
                    <DynamicLandingButtons/>
                </div>
            </section>
        </>
    );
}