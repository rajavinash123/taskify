import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  LogOut
} from "lucide-react";

import { Link } from "react-router-dom";

function Sidebar() {


  const handleLogout=()=>{
    localStorage.removeItem("token");
    window.location.href="/login"
  }

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-10">
        Taskify
        
      </h1>

      <nav className="space-y-4">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/projects"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FolderKanban size={20} />
          Projects
        </Link>

        <Link
          to="/tasks"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <CheckSquare size={20} />
          Tasks
        </Link>

        <Link
          to="/members"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <Users size={20} />
          Members
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 hover:text-red-400"
        >
          <LogOut size={20} />
          Logout
        </button>

      </nav>

    </div>
  );
}

export default Sidebar;