import ProjectCard from "./ProjectCard";
import React from 'react'

const ProjectList = ({projects}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
        />
      ))}

    </div>
  )
}

export default ProjectList
