import { useState, useEffect } from "react";

export default function useLocalStorage<T>(key: string, fallbackValue: T): [T, (value: T | ((val: T) => T)) => void] {
    const [value, setValue] = useState<T>(fallbackValue);

    useEffect(() => {
        const stored = localStorage.getItem(key);
        if (stored) setValue(JSON.parse(stored));
    }, [key]);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}