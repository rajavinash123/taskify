import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ProjectList from "../components/project/ProjectList";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Projects() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchUsers();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to load projects", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/auth/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to load users", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      setCreating(true);
      await axios.post("/api/projects/create", formData);
      setFormData({ name: "", description: "" });
      await fetchProjects();
      alert("Project created successfully");
    } catch (error) {
      console.error("Unable to create project", error);
      alert("Project creation failed");
    } finally {
      setCreating(false);
    }
  };

  const handleAddMember = async (projectId, userId) => {
    try {
      await axios.post(`/api/projects/${projectId}/add-member`, { userId });
      await fetchProjects();
      alert("Member added successfully");
    } catch (error) {
      console.error("Failed to add member", error);
      alert("Unable to add member");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-6">Projects</h1>
          {user?.role === "admin" && (
            <div className="bg-white rounded-xl shadow p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Create Project</h2>
              <form onSubmit={handleCreateProject} className="grid gap-4">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Project name"
                  className="rounded-md border border-gray-300 px-4 py-2"
                  required
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Project description"
                  className="rounded-md border border-gray-300 px-4 py-2"
                />
                <button
                  type="submit"
                  disabled={creating}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
                >
                  {creating ? "Creating..." : "Create Project"}
                </button>
              </form>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Project List</h2>
          {loading ? (
            <div>Loading projects...</div>
          ) : (
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project._id} className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-xl font-bold">{project.name}</h3>
                  <p className="mt-2 text-gray-600">{project.description}</p>
                  <p className="mt-4 text-sm text-gray-700">
                    Members: {project.members?.length || 0}
                  </p>
                  <div className="mt-2 text-sm text-gray-600">
                    {project.members?.map((member) => (
                      <span key={member._id} className="inline-block mr-3">
                        {member.name}
                      </span>
                    ))}
                  </div>
                  {user?.role === "admin" && (
                    <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
                      <select
                        className="rounded-md border border-gray-300 px-4 py-2"
                        onChange={(e) => handleAddMember(project._id, e.target.value)}
                        defaultValue=""
                      >
                        <option value="">Add member</option>
                        {users.map((member) => (
                          <option key={member._id} value={member._id}>
                            {member.name} ({member.email})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Projects;