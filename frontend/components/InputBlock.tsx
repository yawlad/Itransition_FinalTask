import { useState } from "react";

interface InputBlockData {
  type: string;
  onChange: (value: string) => void;
  header?: string;
  placeholder?: string;
  error?: string;
}

export default function InputBlock({
  type,
  onChange,
  header,
  placeholder,
  error,
}: InputBlockData) {
  const [val, setVal] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVal(value);
    onChange(value);
  };

  return (
    <div className="flex flex-col gap-1 relative">
      <h5 className="text-sm">{header}</h5>
      <input
        type={type}
        placeholder={placeholder}
        className={`rounded-full px-4 py-1 focus:outline-none text-main ${
          error ? "outline-red-500" : ""
        }`}
        onChange={handleInputChange}
      />
      <span className="text-xs text-red-500">{error}</span>
    </div>
  );
}
