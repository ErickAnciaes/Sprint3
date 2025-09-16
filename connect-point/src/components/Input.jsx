"use client"

export default function Input({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-lg text-white">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`border-2 border-white rounded-md h-10 bg-transparent text-white px-3 placeholder-gray-400 focus:outline-none focus:border-orange-500 ${className}`}
      />
    </div>
  )
}
