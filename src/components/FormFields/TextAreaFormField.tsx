import { useFormContext } from "@/contexts/FormContext";
import { Controller, ControllerRenderProps, FieldValues } from "react-hook-form";
import { Textarea } from "../ui/textarea";

export type TextAreaFormFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  mask?: 'cpf' | 'phone';
};

export const TextAreaFormField = ({
  name,
  label,
  placeholder
}: TextAreaFormFieldProps) => {
  const { control, errors, submitting } = useFormContext();

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
          <Textarea
            {...field}
            id={name}
            placeholder={placeholder}
            disabled={submitting}
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
