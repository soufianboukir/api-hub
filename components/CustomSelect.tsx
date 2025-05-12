import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    } from "@/components/ui/select";
  
interface CustomSelectProps<T> {
    value: string;
    onChange: (value: string) => void;
    options: T[];
    labelKey?: keyof T;
    valueKey?: keyof T;
    placeholder?: string;
}
  
export const CustomSelect = <T extends Record<string, unknown>>({
    value,
    onChange,
    options,
    labelKey = "label",
    valueKey = "value",
    placeholder = "Select an option",
}: CustomSelectProps<T>) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="w-full">
                {options.map((option, index) => (
                    <SelectItem
                        key={index}
                        value={String(option[valueKey])}
                    >
                        {option[labelKey]}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
  
