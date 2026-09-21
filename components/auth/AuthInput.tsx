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
        className="mb-2 block text-sm font-semibold text-[#14213D]"
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
          rounded-xl
          border
          border-[#D8D5CC]
          bg-[#F8F7F3]
          px-4
          py-3.5
          text-[#14213D]
          outline-none
          transition-all
          placeholder:text-[#9A9DA5]
          hover:border-[#C8C5BC]
          focus:border-[#C9A227]
          focus:bg-white
          focus:ring-4
          focus:ring-[#C9A227]/10
        "
      />
    </div>
  );
}