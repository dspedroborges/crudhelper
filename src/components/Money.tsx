import { useEffect, useState } from "react";
import type { MoneyProps } from "./Types";

export default function Money({ className, id, name, value = "", placeholder, onChange, locale = "pt-BR" }: MoneyProps) {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (rawValue: string) => {
        const digits = rawValue.replace(/\D/g, "");
        const numberValue = parseInt(digits || "0", 10);

        const formattedValue = (numberValue / 100).toLocaleString(locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        setInputValue(formattedValue);
        if (onChange) onChange(String(name), formattedValue);
    };

    return (
        <input
            type="text"
            id={id}
            name={name}
            className={className}
            value={inputValue}
            placeholder={placeholder}
            onChange={(e) => handleChange(e.target.value)}
        />
    );
}