import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    required: boolean;
    disabled: boolean;
}

const Input = ({
    label,
    name,
    type,
    value,
    onChange,
    placeholder,
    required,
    disabled,
}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
        <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
            </label>
            <div className="relative">
                <input
                    type={isPassword ? (showPassword ? "text" : "password") : type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 pr-10"
                    placeholder={placeholder}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Input;