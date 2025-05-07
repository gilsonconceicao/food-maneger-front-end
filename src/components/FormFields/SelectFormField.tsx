import { useFormContext } from "@/contexts/FormContext";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SelectFormFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
};

export const SelectFormField = ({
  name,
  label,
  placeholder = "Selecione...",
  options,
}: SelectFormFieldProps) => {
  const { control, errors } = useFormContext();
 
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }: { field: ControllerRenderProps<FieldValues, string> }) => {
        return (
          <div>
            {label && (
              <label className="font-semibold block mb-1" htmlFor={name}>
                {label}
              </label>
            )}
  
            <Select
              onValueChange={field.onChange}
              value={field.value??""}
            >
              <SelectTrigger id={name} className="w-full">
                <SelectValue placeholder={placeholder}/>
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
  
            {errors[name] && (
              <span className="text-[12px] text-red-500">
                {errors[name]?.message as string}
              </span>
            )}
          </div>
        )
      }}
    />
  );
};
