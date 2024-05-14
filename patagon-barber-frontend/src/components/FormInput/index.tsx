import { ChangeEvent } from 'react'

export function FormInput({
  name,
  label,
  placeholder,
  required,
  onChange
}: {
  name: string
  label: string
  placeholder: string
  required: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label className="flex flex-col" htmlFor={name}>
      {label}
      <input
        className="bg-blue-300 p-2 rounded-lg text-black font-semibold"
        name={name}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
      />
    </label>
  )
}
