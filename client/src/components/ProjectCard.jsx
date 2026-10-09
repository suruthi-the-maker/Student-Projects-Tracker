import { Link } from "react-router-dom";
import { CalendarDays, Users, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function ProjectCard({ project, onDelete }) {
  const deadline = project.deadline ? new Date(project.deadline).toLocaleDateString() : "No deadline";
  return <article className="project-card">
    <div className="project-card-top"><span className="project-mark"><CheckCircle2 size={19}/></span><button className="text-button danger-text" onClick={() => onDelete(project._id)}>Delete</button></div>
    <Link to={`/projects/${project._id}`} className="project-title">{project.title}<ArrowUpRight size={17}/></Link>
    <p className="project-description">{project.description || "No description added yet."}</p>
    <div className="progress-label"><span>Progress</span><strong>{project.progress || 0}%</strong></div>
    <div className="progress-track"><div className="progress-fill" style={{width:`${project.progress || 0}%`}}/></div>
    <div className="project-meta"><span><CheckCircle2 size={15}/>{project.completedCount || 0}/{project.taskCount || 0} tasks</span><span><CalendarDays size={15}/>{deadline}</span></div>
    <div className="project-card-footer"><span><Users size={15}/> {project.teamMembers?.length || 0} members</span><Link to={`/projects/${project._id}`} className="small-link">View project →</Link></div>
  </article>;
}