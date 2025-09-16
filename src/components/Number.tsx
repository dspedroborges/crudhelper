import { useEffect, useState } from "react";
import type { NumberProps } from "./Types";

export default function NumberInput({ className, id, name, value = "", placeholder, min=0, max=999, onChange }: NumberProps) {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (value: string) => {
        setInputValue(value);
        if (onChange) onChange(String(name), value);
    }

    return (
        <input
            type="number"
            id={id}
            name={name}
            className={className}
            value={inputValue}
            placeholder={placeholder}
            min={min}
            max={max}
            onChange={(e) => handleChange(e.target.value)}
        />
    )
}
