import { useState, useEffect } from "react";

export default function useLoginStorage(key, initialState) {
    const [value, setValue ] = useState(initialState);
    useEffect(() => {
        const stored = localStorage.getItem(key);
        setValue(stored !== "" ? JSON.parse(stored) : initialState);
    },[initialState, key, setValue]);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];

}