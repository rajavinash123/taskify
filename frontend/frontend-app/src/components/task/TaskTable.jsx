import StatusBadge from "./StatusBadget";
import React from "react";

function TaskTable({ tasks, editable = false, onStatusChange }) {
  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Task</th>
            <th className="p-4 text-left">Assigned To</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Due Date</th>
            {editable && <th className="p-4 text-left">Action</th>}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const assignedToName =
              task.assignedTo?.name || task.assignedTo || "Unassigned";

            return (
              <tr key={task._id} className="border-t">
                <td className="p-4">{task.title}</td>
                <td className="p-4">{assignedToName}</td>
                <td className="p-4">
                  <StatusBadge status={task.status} />
                </td>
                <td className="p-4">{formatDate(task.dueDate)}</td>
                {editable && (
                  <td className="p-4">
                    <select
                      value={task.status}
                      onChange={(e) => onStatusChange(task._id, e.target.value)}
                      className="rounded-md border border-gray-300 bg-white px-3 py-2"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;