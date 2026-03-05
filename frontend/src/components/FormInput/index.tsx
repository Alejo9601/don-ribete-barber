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
    <label className="flex flex-col gap-2" htmlFor={name}>
      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </span>
      <input
        className="h-9 rounded-2xl border border-zinc-200 bg-zinc-50 px-3.5 text-sm font-medium text-zinc-900 transition placeholder:text-zinc-400 focus:border-cyan-500 focus:bg-white"
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
