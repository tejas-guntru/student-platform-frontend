import {
  ChangeEventHandler,
  HTMLInputAutoCompleteAttribute,
} from "react";

interface AuthInputProps {
  id: string;
  label: string;
  type: "text" | "email" | "password";
  value: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  minLength?: number;
  maxLength?: number;
}

export default function AuthInput({
  id,
  label,
  type,
  value,
  placeholder,
  onChange,
  autoComplete,
  minLength,
  maxLength,
}: AuthInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="
          mb-2
          block
          text-sm
          font-semibold
          text-[#173B63]
        "
      >
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        minLength={minLength}
        maxLength={maxLength}
        className="
          w-full
          rounded-2xl
          border
          border-[#D5E7F5]

          bg-white/90

          px-4
          py-3.5

          text-[15px]
          text-[#173B63]

          shadow-[0_4px_16px_rgba(8,119,232,0.03)]

          outline-none

          transition-all
          duration-200

          placeholder:text-[#94A9BC]

          hover:border-[#ADD6F3]
          hover:bg-white

          focus:border-[#1689F5]
          focus:bg-white

          focus:ring-4
          focus:ring-[#1689F5]/10

          focus:shadow-[0_8px_24px_rgba(8,119,232,0.08)]
        "
      />
    </div>
  );
}