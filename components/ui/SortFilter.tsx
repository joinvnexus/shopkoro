// components/ui/SortFilter.tsx
import { ChevronDown } from "lucide-react";

const sortOptions = [
  { value: "featured", label: "ফিচার্ড" },
  { value: "newest", label: "নতুন আগমন" },
  { value: "price-low", label: "দাম: কম থেকে বেশি" },
  { value: "price-high", label: "দাম: বেশি থেকে কম" },
];

export default function SortFilter({
  sortBy,
  setSortBy,
}: {
  sortBy: string,
  setSortBy: (v: string) => void,
}) {
  return (
    <div className="relative">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="appearance-none bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl px-6 py-4 pr-12 rounded-2xl shadow-xl font-medium text-gray-800 dark:text-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-500/30"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600"
        size={22}
      />
    </div>
  );
}
