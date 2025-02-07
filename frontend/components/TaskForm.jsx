import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export const TaskForm = ({ onSubmit }) => {
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    dueDate: "",
    status: "Pending",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTask.name.trim()) return

    onSubmit(newTask)
    setNewTask({
      name: "",
      description: "",
      dueDate: "",
      status: "Pending",
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleStatusChange = (value) => {
    setNewTask((prev) => ({
      ...prev,
      status: value,
    }))
  }

  return (
    <Card className="bg-white/20 backdrop-blur-md border-none shadow-xl rounded-xl overflow-hidden">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">Create a New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-2">
              Task Name
            </label>
            <Input
              id="taskName"
              type="text"
              name="name"
              placeholder="Enter task name"
              value={newTask.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Input
              id="taskDescription"
              type="text"
              name="description"
              placeholder="Brief description of the task"
              value={newTask.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div className="flex gap-6">
            <div className="flex-1">
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <Input
                id="dueDate"
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
            <div className="w-40">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <Select value={newTask.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a237e] border border-white/30">
                  <SelectItem value="Pending" className="text-white">
                    Pending
                  </SelectItem>
                  <SelectItem value="In Progress" className="text-white">
                    In Progress
                  </SelectItem>
                  <SelectItem value="Completed" className="text-white">
                    Completed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!newTask.name.trim()}
            >
              Add Task
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

