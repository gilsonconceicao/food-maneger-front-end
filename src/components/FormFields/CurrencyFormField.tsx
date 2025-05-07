import { useEffect, useState } from "react";
import { useFormContext } from "@/contexts/FormContext";
import { Controller, ControllerRenderProps, FieldValues } from "react-hook-form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export type CurrencyFormFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
};

const applyMaskCurrency = (numericValue: number) => {
  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const CurrencyFormField = ({
  name,
  label,
  placeholder,
}: CurrencyFormFieldProps) => {
  const { control, watch, errors } = useFormContext();
  const watchedValue = watch(name);
  const [displayValue, setDisplayValue] = useState(applyMaskCurrency((watchedValue || 0) / 100));

  useEffect(() => {
    setDisplayValue(applyMaskCurrency((watchedValue || 0) / 100));
  }, [watchedValue]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }: { field: ControllerRenderProps<FieldValues, string> }) => (
        <div>
          {label && (
            <label className="font-semibold block mb-1" htmlFor={name}>
              {label}
            </label>
          )}

          <Input
            {...field}
            id={name}
            placeholder={placeholder}
            value={displayValue}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^\d]/g, "");
              const numeric = parseFloat(rawValue.length > 0 ? rawValue : "0") / 100;
              setDisplayValue(applyMaskCurrency(numeric));
              field.onChange(numeric * 100); // valor real em centavos no form
            }}
            inputMode="numeric"
            type="text"
            className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            )}
          />

          {errors[name] && (
            <span className="text-[12px] text-red-500">
              {errors[name]?.message as string}
            </span>
          )}
        </div>
      )}
    />
  );
};
