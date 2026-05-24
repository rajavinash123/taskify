import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardStats from "../components/dashboard/DashboardStats";
import TaskTable from "../components/task/TaskTable";
import axios from "../api/axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/tasks");
        setTasks(response.data.slice(0, 5));
      } catch (error) {
        console.error("Failed to load recent tasks", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <DashboardStats />

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Recent Tasks</h2>
        {loading ? <div>Loading recent tasks...</div> : <TaskTable tasks={tasks} />}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;