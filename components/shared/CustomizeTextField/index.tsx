"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

type CustomizeTextFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  leftIcon?: React.ReactNode;
  as?: "input" | "textarea";
  rows?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function CustomizeTextField({
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
  className,
  as = "input",
  rows = 4,
  onChange,
  leftIcon,
}: CustomizeTextFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { onChange: registerOnChange, ...registerProps } = register(name);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (registerOnChange) registerOnChange(e);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (registerOnChange) {
      registerOnChange(e);
    }
  };

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-14 font-medium text-gray-700">{label}</label>
      )}
      <div>
        <div className="relative">
          {as == "textarea" ? (
            <Textarea
              id={name}
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              className={cn(
                error && "border-red-300 focus-visible:ring-red-300",
                "bg-gray-50",
                className,
              )}
              {...registerProps}
              onChange={handleTextareaChange}
            />
          ) : (
            <Input
              id={name}
              type={inputType}
              disabled={disabled}
              placeholder={placeholder}
              className={cn(
                leftIcon && "pl-9",
                isPassword && "pr-10",
                error && "border-red-300 focus-visible:ring-red-300",
                "h-10 bg-gray-50",
                className,
              )}
              {...registerProps}
              onChange={handleInputChange}
            />
          )}

          {leftIcon && as === "input" && (
            <div
              className={cn(
                "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none !text-gray-400 z-10 text-14 border-r-2 pr-2 my-2.5 border-gray-200 ",
                error && "border-red-300",
              )}
            >
              {leftIcon}
            </div>
          )}

          {isPassword && as === "input" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute cursor-pointer inset-y-0 right-0 pr-3 items-center text-gray-400 z-10"
              aria-label={showPassword ? "Show Password" : "Hide Password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-12 text-red-400 ps-2">{error as string}</p>
        )}
      </div>
    </div>
  );
}

export default CustomizeTextField;
