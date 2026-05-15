import useLocalStorage from "@/app/useLocalStorage";
import { useEffect } from "react";

export default function Streak() {
    const [streak, setStreak] = useLocalStorage("streak", 1);
    const [lastUseDate, setLastUseDate] = useLocalStorage("streakLastUseDate", new Date().toDateString());
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Check if the last use date was yesterday
    useEffect(() => {
        if (lastUseDate === yesterday.toDateString()) {
            // Increment the streak
            setStreak(streak + 1);
            setLastUseDate(today.toDateString());
            console.log("Streak incremented to", streak + 1);

        } else if (lastUseDate !== today.toDateString()) {
            // Reset the streak if the last use date was not today
            setStreak(1);
            setLastUseDate(today.toDateString());
            console.log("Streak reset to 1");
        }
    }, []);

    return <>
    <div className="bg-amber-700 text-white p-4 rounded-lg mb-8 grid grid-cols-2">
        <div>
            <p className="font-light text-sm tracking-wider uppercase">Streak</p>
            <p>Keep coming here every day to continue building good habits.</p>
        </div>
        <p className="font-bold text-3xl text-end">{streak} day{streak > 1 ? 's' : ''}</p>
    </div>
    </>
}