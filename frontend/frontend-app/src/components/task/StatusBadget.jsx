function StatusBadge({ status }) {

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    "in-progress": "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700"
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;