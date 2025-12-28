// components/ui/ViewToggle.tsx
import { Grid, List } from "lucide-react";

export default function ViewToggle({ viewMode, setViewMode }: { viewMode: "grid" | "list"; setViewMode: (v: "grid" | "list") => void }) {
  return (
    <div className="flex bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-xl p-2">
      <button
        onClick={() => setViewMode("grid")}
        className={`p-3 rounded-xl transition-all ${viewMode === "grid" ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg" : "text-gray-600"}`}
      >
        <Grid size={22} />
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`p-3 rounded-xl transition-all ${viewMode === "list" ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg" : "text-gray-600"}`}
      >
        <List size={22} />
      </button>
    </div>
  );
}