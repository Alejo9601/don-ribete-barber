import { ChangeEvent } from 'react'

export function FormInput({
  type = 'text',
  name,
  label = '',
  placeholder,
  required = false,
  maxLength,
  onChange
}: {
  type?: string
  name?: string
  label?: string
  placeholder?: string
  required?: boolean
  maxLength?: number
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label className="flex flex-col" htmlFor={name}>
      {label}
      <input
        className="bg-blue-300 p-2 rounded-lg text-black font-semibold"
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        onChange={onChange}
      />
    </label>
  )
}
