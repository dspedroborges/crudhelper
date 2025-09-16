import { useEffect, useRef, useState } from "react";
import type { SelectOption, SelectProps } from "./Types";

export default function Select({ className = "", bottomClassName = "", value = "", imageClassName = "", searchClassName = "", selectedPosition = "before", bgColorSelected, isExpanded = false, showSearch = true, isAbsolute = false, absoluteClassName = "bg-white", id, name, placeholder, onChange, multiple, options }: SelectProps) {
    const [expanded, setExpanded] = useState(isExpanded);
    const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);
    const [searchParam, setSearchParam] = useState("");
    // const [selectedValues, setSelectedValues] = useState("");
    const [selectedLabels, setSelectedLabels] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let preSelectedOptions = [], preSelectedValues = [], preSelectedLabels = [];
        for (let i = 0; i < options.length; i++) {
            if (value.search(options[i].value) !== -1) {
                preSelectedOptions.push(options[i]);
                preSelectedValues.push(options[i].value);
                preSelectedLabels.push(options[i].label);
            }
        }
        // setSelectedValues(preSelectedValues.join(", "));
        setSelectedLabels(preSelectedLabels.join(", "));
        setSelectedOptions(preSelectedOptions);
    }, []);

    useEffect(() => {
        let newSelectedValues = [], newSelectedLabels = [];
        for (let i = 0; i < selectedOptions.length; i++) {
            newSelectedValues.push(selectedOptions[i].value);
            newSelectedLabels.push(selectedOptions[i].label);
        }
        let newStr = newSelectedValues.join(", ");
        // setSelectedValues(newStr);
        setSelectedLabels(newSelectedLabels.join(", "));
        if (onChange) onChange(String(name), newStr);
    }, [selectedOptions]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setExpanded(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const isSelected = (option: SelectOption) => {
        for (let i = 0; i < selectedOptions.length; i++) {
            if (selectedOptions[i].value == option.value) {
                return true;
            }
        }

        return false;
    }

    const handleSelection = (option: SelectOption) => {
        if (multiple) {
            if (!isSelected(option)) {
                setSelectedOptions([...selectedOptions, option]);
            } else {
                setSelectedOptions(selectedOptions.filter(e => e.value !== option.value));
            }
        } else {
            if (!isSelected(option)) {
                setSelectedOptions([option]);
            } else {
                setSelectedOptions(selectedOptions.filter(e => e.value !== option.value));
            }

            setExpanded(false);
        }
    }

    const handleSearch = (param: string) => {
        setSearchParam(param);
    }

    return (
        <div className="relative" ref={containerRef}>
            <div
                id={id}
                className={className ? className + " cursor-pointer flex justify-between select-none" : "cursor-pointer flex justify-between select-none"}
                onClick={() => setExpanded(!expanded)}
            >
                <span>{selectedLabels || placeholder || "Choose an option..."}</span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`size-6 ${expanded ? "rotate-180" : ""}`}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
            {
                expanded && (
                    <div className={`${isAbsolute && "absolute z-50 top-full w-full" + " " + absoluteClassName}`}>
                        {
                            showSearch && (
                                <div>
                                    <input type="text" placeholder="Search here..." value={searchParam} onChange={(e) => handleSearch(e.target.value)} className={searchClassName} />
                                </div>
                            )
                        }
                        <div className={bottomClassName}>
                            {
                                options.map((o, i) => {
                                    if (o.value.toLocaleLowerCase().search(searchParam) !== -1 || o.label.toLocaleLowerCase().search(searchParam) !== -1) {
                                        return <div
                                            onClick={() => handleSelection(o)}
                                            className={(o.className ?? "") + " cursor-pointer flex gap-2 items-center select-none" + (isSelected(o) && (" " + bgColorSelected))}
                                            key={i}
                                        >
                                            {
                                                selectedPosition == "before" && (
                                                    <>
                                                        {
                                                            isSelected(o) ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle flex-shrink-0" viewBox="0 0 16 16">
                                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                                                </svg>
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle flex-shrink-0" viewBox="0 0 16 16">
                                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                                </svg>
                                                            )
                                                        }
                                                    </>
                                                )
                                            }
                                            {
                                                o.image && (
                                                    <img src={o.image} className={`${imageClassName !== "" ? imageClassName : "w-6 h-6"}`} />
                                                )
                                            }
                                            <div className="flex flex-col">
                                                <span className="font-bold">{o.label}</span>
                                                <span className="text-gray-500">{o.description}</span>
                                            </div>

                                            {
                                                selectedPosition == "after" && (
                                                    <>
                                                        {
                                                            isSelected(o) ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle flex-shrink-0" viewBox="0 0 16 16">
                                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                                                </svg>
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle flex-shrink-0" viewBox="0 0 16 16">
                                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                                </svg>
                                                            )
                                                        }
                                                    </>
                                                )
                                            }
                                        </div>
                                    }
                                })
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}