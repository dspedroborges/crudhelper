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