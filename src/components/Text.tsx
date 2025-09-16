import { useEffect, useState } from "react";
import type { TextProps } from "./Types";

export default function Text({ className, id, name, value = "", placeholder, onChange, mask }: TextProps) {
    const [inputValue, setInputValue] = useState("");
    
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value;
        let maskedValue = "";
        let i = 0;

        if (mask == "") maskedValue = input;    

        for (let m of mask || "") {
            let c = input[i];

            if (!c) break;

            if (m === "A") {
                if (/[a-zA-Z]/.test(c)) {
                    maskedValue += c.toUpperCase();
                    i++;
                } else {
                    break;
                }
            } else if (m === "9") {
                if (/[0-9]/.test(c)) {
                    maskedValue += c;
                    i++;
                } else {
                    break;
                }
            } else if (m === "*") {
                if (/[^a-zA-Z0-9]/.test(c)) {
                    maskedValue += c;
                    i++;
                } else {
                    break;
                }
            } else {
                maskedValue += m;
                if (c === m) {
                    i++;
                }
            }
        }

        if (onChange) onChange(String(name), maskedValue);

        setInputValue(maskedValue);
    };

    return (
        <input
            type="text"
            id={id}
            className={className}
            name={name}
            value={inputValue}
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
}
