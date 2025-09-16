import type { FormMakerProps } from "./Types";

export const formStructure: FormMakerProps = {
  formClassName: "space-y-4 p-4 rounded m-5 flex flex-col",
  labelClassName: "block font-bold mb-1",
  inputAreaClassName: "w-full p-2",
  buttonClassName: "p-2 bg-green-600 text-white hover:bg-green-800 cursor-pointer rounded-xl",
  buttonText: "Send",
  fields: [
    {
      label: "Name",
      type: "text",
      details: {
        id: "name",
        name: "name",
        value: "",
        placeholder: "Type your name",
        className: "border p-2 rounded w-full",
        mask: "",
      },
    },
    {
      label: "Gender",
      type: "select",
      details: {
        multiple: false,
        id: "gender",
        name: "gender",
        placeholder: "Select your gender",
        className: "border rounded p-2",
        absoluteClassName: "bg-gray-200 p-2 rounded-b-xl shadow-md border-l border-r border-b border-gray-600",
        isAbsolute: true,
        bottomClassName: "bg-gray-200 p-2",
        showSearch: false,
        options: [
          {
            label: "Masculine",
            value: "m"
          },
          {
            label: "Feminine",
            value: "f"
          },
          {
            label: "Other",
            value: "o"
          },
        ]
      }
    },
    {
      label: "Skills",
      type: "select",
      details: {
        multiple: true,
        id: "skills",
        name: "skills",
        placeholder: "Select your skills",
        className: "border rounded p-2",
        absoluteClassName: "bg-gray-200 p-2 rounded-b-xl shadow-md border-l border-r border-b border-gray-600",
        isAbsolute: true,
        searchClassName: "w-full p-2 border border-gray-400 bg-white rounded-xl hover:border-gray-600 my-4",
        bottomClassName: "bg-gray-200 p-2",
        showSearch: true,
        options: [
          {
            label: "Javascript",
            value: "js"
          },
          {
            label: "Typescript",
            value: "ts"
          },
          {
            label: "React",
            value: "react"
          },
          {
            label: "Next.JS",
            value: "next"
          },
          {
            label: "Golang",
            value: "go"
          },
        ]
      }
    },
    {
      label: "Telephone",
      type: "text",
      details: {
        id: "tel",
        name: "tel",
        value: "",
        placeholder: "(99) 9 9999-9999",
        className: "border p-2 rounded w-full",
        mask: "(99) 9 9999-9999",
      },
    },
    {
      label: "Salary ($)",
      type: "money",
      details: {
        id: "salary",
        name: "salary",
        value: "",
        placeholder: "Type your wage",
        className: "border p-2 rounded w-full",
        locale: "en-US"
      },
    },
  ],
  onSubmit: (obj: Record<string, string | number>) => console.log("Form submitted:", obj),
};