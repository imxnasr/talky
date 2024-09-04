"use client";

import { FC, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface InputProps {
  id?: string;
  type: "text" | "email" | "password";
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  required?: boolean;
}

export const Input: FC<InputProps> = ({ type, name, placeholder, value, onChange, required = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col my-1">
      <label className="mb-1 text-colorSecondary ml-1" htmlFor={name}>
        {name[0].toUpperCase() + name.substring(1)}:
      </label>
      <div className="bg-slateSecondary rounded-xl px-2 flex items-center">
        <input className="bg-transparent h-12 w-full" type={type === "password" ? (showPassword ? "text" : "password") : type} name={name || ""} id={name || ""} placeholder={placeholder || ""} required={required} value={value} onChange={onChange} />
        {type === "password" && (
          <button type="button" className="text-colorSecondary outline-none" onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};
