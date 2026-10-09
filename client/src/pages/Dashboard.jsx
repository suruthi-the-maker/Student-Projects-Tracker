import { useEffect, useState } from "react";
import { Plus, FolderKanban, ListTodo, CheckCircle2, Clock3, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";

export default function Dashboard({user}) {
  const [projects,setProjects]=useState([]);
  const [tasks,setTasks]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [showForm,setShowForm]=useState(false);
  const load=async()=>{setLoading(true);setError("");try{const [p,t]=await Promise.all([api.get("/projects"),api.get("/tasks")]);setProjects(p.data);setTasks(t.data);}catch(e){setError(e.response?.data?.message||"Could not load your dashboard.");}finally{setLoading(false);}};
  useEffect(()=>{load();},[]);
  const create=async data=>{try{await api.post("/projects",data);setShowForm(false);await load();}catch(e){setError(e.response?.data?.message||"Could not create project.");}};
  const remove=async id=>{if(!confirm("Delete this project and all its tasks?"))return;try{await api.delete(`/projects/${id}`);await load();}catch(e){setError(e.response?.data?.message||"Could not delete project.");}};
  const completed=tasks.filter(t=>t.status==="Completed").length;
  const inProgress=tasks.filter(t=>t.status==="In Progress").length;
  const pending=tasks.filter(t=>t.status==="Pending").length;
  return <div className="page-content"><header className="page-header"><div><span className="eyebrow">YOUR WORKSPACE</span><h1>Good things take <span>teamwork.</span></h1><p>Here's what's happening with your projects today.</p></div><button className="button button-primary" onClick={()=>setShowForm(true)}><Plus size={18}/> New project</button></header>
    <section className="welcome-banner"><div className="welcome-copy"><span className="welcome-tag"><Sparkles size={14}/> YOUR STUDENT WORKSPACE</span><h2>Make progress, one task at a time.</h2><p>Hey {user?.name?.split(" ")[0]||"there"}, organize your team's work and turn ideas into outcomes.</p></div><div className="welcome-art"><div className="art-circle circle-a"/><div className="art-circle circle-b"/><div className="art-note note-a"><CheckCircle2 size={18}/> Task completed</div><div className="art-note note-b"><FolderKanban size={18}/> Project on track</div><div className="art-center"><Sparkles size={32}/></div></div></section>
    <section className="stats-grid"><div className="stat-card"><span className="stat-icon purple"><FolderKanban size={19}/></span><div><span>Total projects</span><strong>{projects.length}</strong><small>Across your workspace</small></div></div><div className="stat-card"><span className="stat-icon blue"><ListTodo size={19}/></span><div><span>Total tasks</span><strong>{tasks.length}</strong><small>Tasks across all projects</small></div></div><div className="stat-card"><span className="stat-icon green"><CheckCircle2 size={19}/></span><div><span>Completed</span><strong>{completed}</strong><small>{tasks.length?Math.round(completed/tasks.length*100):0}% of all tasks</small></div></div><div className="stat-card"><span className="stat-icon orange"><Clock3 size={19}/></span><div><span>In progress</span><strong>{inProgress}</strong><small>{pending} tasks still pending</small></div></div></section>
    {error&&<div className="error-banner">{error}</div>}
    <section className="section-block"><div className="section-heading"><div><h2>Your projects</h2><p>Everything your team is working on.</p></div><Link to="/projects" className="small-link">View all <ArrowRight size={15}/></Link></div>
      {loading?<div className="loading-card">Loading your workspace…</div>:projects.length?<div className="project-grid">{projects.slice(0,3).map(p=><ProjectCard key={p._id} project={p} onDelete={remove}/>)}</div>:<div className="empty-state"><div className="empty-icon"><FolderKanban size={27}/></div><h3>Your first project starts here</h3><p>Create a project, invite your teammates, and track every task in one place.</p><button className="button button-primary" onClick={()=>setShowForm(true)}><Plus size={17}/> Create your first project</button></div>}
    </section>
    {showForm&&<ProjectForm onClose={()=>setShowForm(false)} onSubmit={create}/>}
  </div>;
}