import { TaskItem } from "./TaskItem"
import { TaskFilter } from "./TaskFilter"
import { motion, AnimatePresence } from "framer-motion"

export const TaskList = ({ tasks, filter, onFilterChange, onUpdateTask, onDeleteTask }) => {
  const filteredTasks = tasks.filter((task) => (filter === "All" ? true : task.status === filter))

  return (
    <div className="space-y-6">
      <TaskFilter currentFilter={filter} onFilterChange={onFilterChange} />

      <AnimatePresence>
        {filteredTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-8 text-white/70 font-medium"
          >
            No tasks found for the selected filter. Please try adjusting the filter.
          </motion.div>
        ) : (
          <motion.div className="space-y-4">
            {filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} onUpdate={onUpdateTask} onDelete={onDeleteTask} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

