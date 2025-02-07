import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export const TaskFilter = ({ currentFilter, onFilterChange }) => {
  const filterOptions = ["All", "Pending", "In Progress", "Completed"]

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-white/80">Filter by status:</span>
      <Select value={currentFilter} onValueChange={onFilterChange}>
        <SelectTrigger className="w-40 bg-white/10 border border-white/30 text-white">
          <SelectValue placeholder="Filter tasks" />
        </SelectTrigger>
        <SelectContent className="bg-[#1a237e] border border-white/30">
          {filterOptions.map((option) => (
            <SelectItem key={option} value={option} className="text-white hover:bg-white/20">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

