import { TaskForm } from "./TaskForm"
import { TaskList } from "./TaskList"
import { useTaskManager } from "../hooks/useTaskManager"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"

export const TaskManager = () => {
  const { tasks, filter, setFilter, addTask, updateTask, deleteTask } = useTaskManager()

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a237e] to-[#0d47a1] p-6">
      <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border-none shadow-2xl">
        <CardHeader className="border-b border-white/20">
          <CardTitle className="text-3xl font-bold text-white">Task Manager</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <TaskForm onSubmit={addTask} />
          <TaskList
            tasks={tasks}
            filter={filter}
            onFilterChange={setFilter}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        </CardContent>
      </Card>
    </div>
  )
}

