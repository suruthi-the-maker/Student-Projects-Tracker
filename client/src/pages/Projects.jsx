import { useEffect, useState } from "react";
import { Plus, Search, FolderKanban } from "lucide-react";
import api from "../services/api";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";

export default function Projects() {
  const [projects,setProjects]=useState([]);
  const [query,setQuery]=useState("");
  const [showForm,setShowForm]=useState(false);
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(true);
  const load=async()=>{try{setError("");const {data}=await api.get("/projects");setProjects(data);}catch(e){setError(e.response?.data?.message||"Could not load projects.");}finally{setLoading(false);}};
  useEffect(()=>{load();},[]);
  const create=async data=>{try{await api.post("/projects",data);setShowForm(false);await load();}catch(e){setError(e.response?.data?.message||"Could not create project.");}};
  const remove=async id=>{if(!confirm("Delete this project and all its tasks?"))return;try{await api.delete(`/projects/${id}`);await load();}catch(e){setError(e.response?.data?.message||"Could not delete project.");}};
  const filtered=projects.filter(p=>`${p.title} ${p.description}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="page-content"><header className="page-header"><div><span className="eyebrow">PROJECT LIBRARY</span><h1>My projects</h1><p>Ideas become milestones. Milestones become results.</p></div><button className="button button-primary" onClick={()=>setShowForm(true)}><Plus size={18}/> New project</button></header>
    <div className="search-bar"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects by name or description…"/></div>
    {error&&<div className="error-banner">{error}</div>}
    {loading?<div className="loading-card">Loading projects…</div>:filtered.length?<div className="project-grid">{filtered.map(p=><ProjectCard key={p._id} project={p} onDelete={remove}/>)}</div>:<div className="empty-state"><div className="empty-icon"><FolderKanban size={27}/></div><h3>{query?"No matching projects":"No projects yet"}</h3><p>{query?"Try a different search term.":"Create your first project to get started."}</p>{!query&&<button className="button button-primary" onClick={()=>setShowForm(true)}><Plus size={17}/> Create project</button>}</div>}
    {showForm&&<ProjectForm onClose={()=>setShowForm(false)} onSubmit={create}/>}
  </div>;
}