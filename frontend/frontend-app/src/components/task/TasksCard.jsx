import StatusBadge from "./StatusBadge";

function TaskCard({ task }) {

  return (
    <div className="bg-white shadow rounded-xl p-5">

      <h3 className="text-xl font-semibold">
        {task.title}
      </h3>

      <p className="text-gray-600 mt-2">
        {task.description}
      </p>

      <div className="mt-4 flex justify-between items-center">

        <StatusBadge status={task.status} />

        <p className="text-sm text-gray-500">
          Due: {task.dueDate}
        </p>

      </div>

    </div>
  );
}

export default TaskCard;