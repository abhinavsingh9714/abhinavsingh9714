interface SidebarSearchProps {
  value: string
  onChange: (value: string) => void
}

export function SidebarSearch({ value, onChange }: SidebarSearchProps) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search cards..."
      className="transition-default w-full rounded border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-small focus-ring"
      aria-label="Search resume cards"
    />
  )
}
