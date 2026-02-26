import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative flex-1">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
        <Search size={20} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by topic name..."
        className="w-full box box-shadow pl-12 pr-4 py-3 text-base outline-none focus:shadow-none transition-shadow"
      />
    </div>
  );
}

export default SearchInput;
