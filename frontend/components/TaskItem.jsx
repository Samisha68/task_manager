import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { motion } from "framer-motion"

export const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(task)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleStatusChange = (value) => {
    setEditedTask((prev) => ({
      ...prev,
      status: value,
    }))
  }

  const handleSave = () => {
    onUpdate(task.id, editedTask)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTask(task)
    setIsEditing(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative shadow-lg rounded-lg border-none bg-white/10 backdrop-blur-md transition-all hover:shadow-2xl">
        <CardContent className="p-6">
          {isEditing ? (
            <div className="space-y-4">
              <Input
                type="text"
                name="name"
                value={editedTask.name}
                onChange={handleInputChange}
                placeholder="Task name"
                className="w-full border-gray-300 focus:ring-blue-500"
              />
              <Input
                type="text"
                name="description"
                value={editedTask.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full border-gray-300 focus:ring-blue-500"
              />
              <div className="flex gap-4">
                <Input
                  type="date"
                  name="dueDate"
                  value={editedTask.dueDate}
                  onChange={handleInputChange}
                  className="flex-1 border-gray-300 focus:ring-blue-500"
                />
                <Select
                  value={editedTask.status}
                  onValueChange={handleStatusChange}
                  className="w-32 border-gray-300 focus:ring-blue-500"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-x-2">
                <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="text-gray-700 border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-white">{task.name}</h2>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="bg-white/10 text-white hover:bg-white/20"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(task.id)}
                    className="bg-red-500/80 text-white hover:bg-red-600/80"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <p className="text-white/80 mb-4">{task.description}</p>
              <div className="flex justify-between items-center text-sm text-white/60">
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                <span
                  className={`px-3 py-1 rounded-full ${
                    task.status === "Completed"
                      ? "bg-green-500/20 text-green-300"
                      : task.status === "In Progress"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-yellow-500/20 text-yellow-300"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

