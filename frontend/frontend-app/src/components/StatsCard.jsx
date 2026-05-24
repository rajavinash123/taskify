function ProjectCard({ project }) {

  return (
    <div className="bg-white rounded-xl shadow p-5">

      <h2 className="text-2xl font-bold">
        {project.name}
      </h2>

      <p className="text-gray-600 mt-2">
        {project.description}
      </p>

      <div className="mt-4">

        <p>
          Members: {project.members.length}
        </p>

      </div>

    </div>
  );
}

export default ProjectCard;