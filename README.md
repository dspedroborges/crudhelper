# Motivation

CRUD is present in virtually every system, and its steps are well known: creating forms, displaying data in tables or cards, updating them with the same structure as the creation form, and deleting records.

The CRUD Helper is a set of components that makes this process easier. It allows you to create forms using JSON (with the FormMaker component) and display, update, and delete them with the Table component.

Since the styling the made through classes, it works well with Tailwind and Bootstrap.

The developer only needs to define which fields will exist and create the functions that feed the Table, along with onUpdate and onDelete.

# Preview

Visit [CRUD Helper](https://crudhelper.vercel.app/) for a demo.

# Usage

You can create a simple form using the following structure:

```
export const formStructure: FormMakerProps = {
  fields: [
    {
      label: "Name",
      type: "text",
      details: {
        mask: ""
      }
    },
    {
      label: "Category",
      type: "select",
      details: {
        options: [
          { label: "Option 1", value: "1" },
          { label: "Option 2", value: "2" }
        ],
        multiple: false
      }
    },
    {
      label: "Description",
      type: "textarea",
      details: {}
    },
    {
      label: "Quantity",
      type: "number",
      details: {}
    },
    {
      label: "Price",
      type: "money",
      details: {}
    }
  ],
  onSubmit: (obj) => {
    console.log("Form data:", obj);
  }
};
```

Then, pass the structure to the FormMaker component:

```
<FormMaker
  {...formStructure}
/>
```

# Available Fields

| Field    | Attributes | Description |
|----------|------------|-------------|
| **Text** | `mask` *(required)* | Formatting rule for the input value |
|          | `id, name, value, placeholder, className` | Common input attributes |
|          | `onChange(name, value)` | Callback fired on value change |
| **Select** | `options` *(required)* | List of options `{ label, value, image?, description?, className? }` |
|          | `multiple` *(required)* | Allow multiple selection |
|          | `id, name, value, placeholder, className` | Common input attributes |
|          | `onChange(name, value)` | Callback fired on value change |
|          | `bottomClassName, imageClassName, searchClassName` | Custom styling |
|          | `bgColorSelected` | Background color for selected items |
|          | `selectedPosition` | `"before" \| "after" \| "none"` |
|          | `showSearch` | Enable a search bar inside the dropdown |
|          | `isExpanded` | Keep dropdown expanded |
|          | `isAbsolute, absoluteClassName` | Positioning options |
| **Textarea** | `id, name, value, placeholder, className` | Common input attributes |
|              | `onChange(name, value)` | Callback fired on value change |
| **Number** | `min, max` | Minimum and maximum values |
|            | `id, name, value, placeholder, className` | Common input attributes |
|            | `onChange(name, value)` | Callback fired on value change |
| **Money**  | `locale` | `"pt-BR"` or `"en-US"` |
|            | `id, name, value, placeholder, className` | Common input attributes |
|            | `onChange(name, value)` | Callback fired on value change |

---

⚡ Each field also requires a **`label`** (the text shown to the user).

# Table

To display the data in a table, assuming you already have data (an array of objects), use:

```
<Table
  data={data}
  onUpdate={(id: number | string, obj: Record<string, any>) => handleUpdate(id, obj)}
  onDelete={(id: number | string) => handleDelete(id)}
  formStructure={formStructure}
/>
```
# Types

For a better understanding of available fields and customization options, here are the types:

```
export type BasicDetails = {
    className?: string;
    id?: string;
    name?: string;
    value?: string;
    placeholder?: string;
    onChange?: (name: string, value: string) => void;
};

export type SelectOption = {
    image?: string;
    label: string;
    value: string;
    description?: string;
    className?: string;
};

export type SelectProps = BasicDetails & {
    options: SelectOption[];
    multiple: boolean;
    bottomClassName?: string;
    imageClassName?: string;
    searchClassName?: string;
    bgColorSelected?: string;
    selectedPosition?: "before" | "after" | "none";
    showSearch?: boolean;
    isExpanded?: boolean;
    isAbsolute?: boolean;
    absoluteClassName?: string;
};

export type TextProps = BasicDetails & {
    mask: string;
};

export type MoneyProps = BasicDetails & {
    locale?: "pt-BR" | "en-US";
};

export type NumberProps = BasicDetails & {
    min?: number;
    max?: number;
};

export type Field =
    | {
        label: string;
        type: "text";
        details: TextProps;
    }
    | {
        label: string;
        type: "select";
        details: SelectProps;
    }
    | {
        label: string;
        type: "textarea";
        details: BasicDetails;
    }
    | {
        label: string;
        type: "number";
        details: NumberProps;
    }
    | {
        label: string;
        type: "money";
        details: MoneyProps;
    }

export type FormMakerProps = {
    fields: Field[];
    onSubmit: (obj: Record<string, string|number>) => void;
    formClassName?: string;
    labelClassName?: string;
    inputAreaClassName?: string;
    buttonClassName?: string;
    buttonText?: string;
};

export type TableProps = {
  data: Record<string, any>[];
  onUpdate?: (id: number | string, obj: Record<string, any>) => void;
  onDelete?: (id: number | string) => void;
  formStructure?: FormMakerProps;
  tableClassName?: string;
  thClassName?: string;
  tdClassName?: string;
  updateButtonClassName?: string;
  deleteButtonClassName?: string;
};
```