import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import TaskTable from "../components/task/TaskTable";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Tasks() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    assignedTo: "",
    dueDate: ""
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchProjectData();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to load tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectData = async () => {
    try {
      const [projectsResponse, usersResponse] = await Promise.all([
        axios.get("/api/projects"),
        axios.get("/api/auth/users")
      ]);
      setProjects(projectsResponse.data);
      setUsers(usersResponse.data);
    } catch (error) {
      console.error("Failed to load projects or users", error);
      alert("Unable to load projects or users. Please refresh the page or check your permissions.");
      setProjects([]);
      setUsers([]);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await axios.post("/api/tasks/create", formData);
      setFormData({
        title: "",
        description: "",
        projectId: "",
        assignedTo: "",
        dueDate: ""
      });
      await fetchTasks();
      alert("Task created successfully");
    } catch (error) {
      console.error("Unable to create task", error);
      alert("Task creation failed");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      await axios.patch(`/api/tasks/${taskId}/status`, { status });
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status } : task
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Unable to update task status");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Tasks</h1>
          {user?.role === "admin" && (
            <div className="bg-white rounded-xl shadow p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Create Task</h2>
              <form onSubmit={handleCreateTask} className="grid gap-4">
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Task title"
                  className="rounded-md border border-gray-300 px-4 py-2"
                  required
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Task description"
                  className="rounded-md border border-gray-300 px-4 py-2"
                />
                <select
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  className="rounded-md border border-gray-300 px-4 py-2"
                  required
                >
                  <option value="">Select project</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>
                <select
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  className="rounded-md border border-gray-300 px-4 py-2"
                  required
                >
                  <option value="">Assign to user</option>
                  {users.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.name} ({member.email})
                    </option>
                  ))}
                </select>
                <input
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="rounded-md border border-gray-300 px-4 py-2"
                  required
                />
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
                >
                  {saving ? "Saving..." : "Create Task"}
                </button>
              </form>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Task List</h2>
          {loading ? (
            <div>Loading tasks...</div>
          ) : (
            <TaskTable
              tasks={tasks}
              editable={Boolean(user)}
              onStatusChange={handleStatusChange}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Tasks;