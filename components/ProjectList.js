import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'

// styles
import './ProjectList.css'

export default function ProjectList({ projects }) {
  console.log(projects)

  return (
    <div className="project-list">
      {projects.length === 0 && <p>Henüz proje yok!</p>}
      {projects.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Şu tarihe kadar: {project.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <p><strong>Görevlendirilenler:</strong></p>
            <ul>
              {project.assignedUsersList.map(user => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  )
}