import { useEffect, useState } from "react";
import Select from "./Select";
import Text from "./Text";
import type { FormMakerProps } from "./Types";
import Textarea from "./Textarea";
import NumberInput from "./Number";
import Money from "./Money";

export default function FormMaker({ fields, formClassName = "", labelClassName = "", inputAreaClassName = "", buttonClassName = "", buttonText = "Send", onSubmit }: FormMakerProps) {
    const [currentFields, setCurrentFields] = useState<typeof fields>([]);
    const [formResult, setFormResult] = useState<Record<string, string | number>>({});

    useEffect(() => {
        let initialResult: Record<string, string | number> = {};
        for (let i = 0; i < fields.length; i++) {
            initialResult[String(fields[i].details.name)] = String(fields[i].details.value);
        }
        setFormResult(initialResult);
    }, []);

    useEffect(() => {
        setCurrentFields(fields);
    }, [fields]);

    const handleInputChange = (name: string, value: string) => {

        console.log("Trying to update: ", {name, value});

        setFormResult({ ...formResult, [name]: value });
        const newValues = JSON.parse(JSON.stringify(currentFields));

        for (let cf of newValues) {
            if (cf.details.name === name) {
                cf.details.value = value;
            }
        }

        setCurrentFields(newValues);
    }

    return (
        <>
            <form className={formClassName} onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formResult);
            }}>
                {
                    currentFields.map((field, i) => {
                        let id: string | undefined;
                        id = field.details.id;

                        return <div className={inputAreaClassName} key={i}>
                            <label className={labelClassName} htmlFor={id}>{field.label}</label>
                            {
                                field.type == "select" && (
                                    <Select {...field.details} onChange={handleInputChange} />
                                )
                            }
                            {
                                field.type == "text" && (
                                    <Text {...field.details} onChange={handleInputChange} />
                                )
                            }
                            {
                                field.type == "textarea" && (
                                    <Textarea {...field.details} onChange={handleInputChange} />
                                )
                            }
                            {
                                field.type == "number" && (
                                    <NumberInput {...field.details} onChange={handleInputChange} />
                                )
                            }
                            {
                                field.type == "money" && (
                                    <Money {...field.details} onChange={handleInputChange} />
                                )
                            }
                        </div>
                    })
                }

                <button className={buttonClassName}>{buttonText}</button>
            </form>
        </>
    );
}