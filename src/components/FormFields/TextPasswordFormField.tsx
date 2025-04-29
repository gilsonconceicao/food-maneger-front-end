import { useState } from "react"
import { Controller } from "react-hook-form"
import { useFormContext } from "@/contexts/FormContext"
import { Input } from "../ui/input"
import { Eye, EyeOff } from "lucide-react"

export type TextPasswordFormFieldProps = {
    name: string
    label: string
    placeholder?: string
}

export const TextPasswordFormField = ({
    name,
    label,
    placeholder
}: TextPasswordFormFieldProps) => {
    const { control, errors } = useFormContext()
    const [showPassword, setShowPassword] = useState(false)

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="relative">
                    {label && (
                        <label className="font-semibold block mb-1" htmlFor={name}>
                            {label}
                        </label>
                    )}
                    <Input
                        {...field}
                        id={name}
                        placeholder={placeholder}
                        type={showPassword ? "text" : "password"}
                        className="pr-10" 
                        value={field.value || ""}
                    />
                    <button  type="button" className="absolute right-2 top-9.5 text-gray-500 hover:text-gray-700" onClick={() => setShowPassword(prev => !prev)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
             
                    {errors[name] && (
                        <span className="text-[12px] text-red-500">
                            {errors[name]?.message as string}
                        </span>
                    )}
                </div>
            )}
        />
    )
}
