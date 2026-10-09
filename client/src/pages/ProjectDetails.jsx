import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Plus, CalendarDays, Users, ListTodo, Pencil, Check, X } from "lucide-react";
import api from "../services/api";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

export default function ProjectDetails() {
  const {id}=useParams();
  const [project,setProject]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [showTaskForm,setShowTaskForm]=useState(false);
  const [editing,setEditing]=useState(false);
  const [editForm,setEditForm]=useState({});
  const load=async()=>{try{setError("");const {data}=await api.get(`/projects/${id}`);setProject(data);setEditForm({title:data.title,description:data.description||"",teamMembers:(data.teamMembers||[]).join(", "),deadline:data.deadline?data.deadline.slice(0,10):""});}catch(e){setError(e.response?.data?.message||"Could not load project.");}finally{setLoading(false);}};
  useEffect(()=>{load();},[id]);
  const createTask=async data=>{try{await api.post("/tasks",{...data,projectId:id});setShowTaskForm(false);await load();}catch(e){setError(e.response?.data?.message||"Could not create task.");}};
  const updateTask=async(taskId,updates)=>{try{await api.put(`/tasks/${taskId}`,updates);await load();}catch(e){setError(e.response?.data?.message||"Could not update task.");}};
  const deleteTask=async taskId=>{if(!confirm("Delete this task?"))return;try{await api.delete(`/tasks/${taskId}`);await load();}catch(e){setError(e.response?.data?.message||"Could not delete task.");}};
  const commentTask=async(taskId,text)=>{try{await api.post(`/tasks/${taskId}/comments`,{text});await load();}catch(e){setError(e.response?.data?.message||"Could not add comment.");}};
  const saveProject=async e=>{e.preventDefault();try{await api.put(`/projects/${id}`,{...editForm,teamMembers:editForm.teamMembers.split(",").map(s=>s.trim()).filter(Boolean),deadline:editForm.deadline||null});setEditing(false);await load();}catch(e){setError(e.response?.data?.message||"Could not save project.");}};
  if(loading)return <div className="page-content"><div className="loading-card">Loading project…</div></div>;
  if(!project)return <div className="page-content"><Link to="/projects" className="back-link"><ArrowLeft size={16}/> Back to projects</Link><div className="error-banner">{error||"Project not found."}</div></div>;
  const tasks=project.tasks||[], completed=tasks.filter(t=>t.status==="Completed").length;
  return <div className="page-content"><Link to="/projects" className="back-link"><ArrowLeft size={16}/> All projects</Link>{error&&<div className="error-banner">{error}</div>}
    <section className="detail-hero"><div className="detail-hero-top"><span className="eyebrow">PROJECT OVERVIEW</span><button className="button button-light" onClick={()=>setEditing(!editing)}>{editing?<X size={16}/>:<Pencil size={16}/>} {editing?"Cancel":"Edit project"}</button></div>
      {editing?<form className="form-stack edit-project-form" onSubmit={saveProject}><label>Project title<input required maxLength={120} value={editForm.title} onChange={e=>setEditForm({...editForm,title:e.target.value})}/></label><label>Description<textarea rows="3" maxLength={2000} value={editForm.description} onChange={e=>setEditForm({...editForm,description:e.target.value})}/></label><label>Team members (comma-separated)<input value={editForm.teamMembers} onChange={e=>setEditForm({...editForm,teamMembers:e.target.value})}/></label><label>Deadline<input type="date" value={editForm.deadline} onChange={e=>setEditForm({...editForm,deadline:e.target.value})}/></label><button className="button button-primary"><Check size={16}/> Save changes</button></form>:<><h1>{project.title}</h1><p>{project.description||"No project description yet."}</p><div className="detail-meta"><span><CalendarDays size={16}/>{project.deadline?new Date(project.deadline).toLocaleDateString():"No deadline set"}</span><span><Users size={16}/>{project.teamMembers?.length||0} team members</span><span><ListTodo size={16}/>{tasks.length} tasks</span></div></>}
      <div className="detail-progress"><div className="progress-label"><span>Overall progress</span><strong>{tasks.length?Math.round(completed/tasks.length*100):0}%</strong></div><div className="progress-track"><div className="progress-fill" style={{width:`${tasks.length?completed/tasks.length*100:0}%`}}/></div></div>
    </section>
    <section className="section-block task-section"><div className="section-heading"><div><h2>Tasks & milestones</h2><p>Keep each step moving forward.</p></div><button className="button button-primary" onClick={()=>setShowTaskForm(true)}><Plus size={17}/> Add task</button></div>
      {tasks.length?<div className="task-list">{tasks.map(t=><TaskCard key={t._id} task={t} onUpdate={updateTask} onDelete={deleteTask} onComment={commentTask}/>)}</div>:<div className="empty-state compact"><div className="empty-icon"><ListTodo size={25}/></div><h3>No tasks added yet</h3><p>Add your first task to start tracking project progress.</p><button className="button button-primary" onClick={()=>setShowTaskForm(true)}><Plus size={17}/> Add first task</button></div>}
    </section>
    <section className="section-block"><div className="section-heading"><div><h2>Team members</h2><p>People contributing to this project.</p></div></div><div className="team-chips">{project.teamMembers?.length?project.teamMembers.map((m,i)=><span className="team-chip" key={`${m}-${i}`}><span>{m.slice(0,1).toUpperCase()}</span>{m}</span>):<p className="muted-text">No team members added yet. Edit the project to add names.</p>}</div></section>
    {showTaskForm&&<TaskForm onClose={()=>setShowTaskForm(false)} onSubmit={createTask}/>}
  </div>;
}