import { useFormContext } from "@/contexts/FormContext";
import { Controller, ControllerRenderProps, FieldValues } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type TextFormFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  mask?: "cpf" | "phone";
  icon?: ReactNode; 
};

export const TextFormField = ({
  name,
  label,
  placeholder,
  type = "text",
  mask,
  icon,
}: TextFormFieldProps) => {
  const { control, errors } = useFormContext();

  const maskPattern =
    mask === "cpf"
      ? "000.000.000-00"
      : mask === "phone"
      ? "(00) 00000-0000"
      : undefined;

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

          <div className="relative">
            {icon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                {icon}
              </div>
            )}

            {maskPattern ? (
              <IMaskInput
                {...field}
                id={name}
                mask={maskPattern}
                unmask={false}
                onAccept={(value) => field.onChange(value)}
                className={cn(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent py-1 pr-3 text-base shadow-xs transition-[color,box-shadow] outline-none pl-10",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                )}
                placeholder={placeholder}
                type={type}
                value={field.value ?? ""}
              />
            ) : (
              <Input
                {...field}
                id={name}
                placeholder={placeholder}
                type={type}
                value={field.value ?? ""}
                className={icon ? "pl-10" : undefined} 
              />
            )}
          </div>

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
