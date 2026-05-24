import React, { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import axios from "../../api/axios";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await axios.get("/api/dashboard/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Unable to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard title="Total Tasks" value={loading ? "..." : stats.totalTasks} />
      <StatsCard title="Completed Tasks" value={loading ? "..." : stats.completedTasks} />
      <StatsCard title="Pending Tasks" value={loading ? "..." : stats.pendingTasks} />
      <StatsCard title="Overdue Tasks" value={loading ? "..." : stats.overdueTasks} />
    </div>
  );
};

export default DashboardStats;