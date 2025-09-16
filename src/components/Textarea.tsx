import { useEffect, useState } from "react";
import type { BasicDetails } from "./Types";

export default function Textarea({ className, id, name, value = "", placeholder, onChange }: BasicDetails) {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (value: string) => {
        setInputValue(value);
        if (onChange) onChange(String(name), value);
    }
    
    return (
        <textarea
            id={id}
            name={name}
            className={className}
            value={inputValue}
            placeholder={placeholder}
            onChange={(e) => handleChange(e.target.value)}
        ></textarea>
    )
}