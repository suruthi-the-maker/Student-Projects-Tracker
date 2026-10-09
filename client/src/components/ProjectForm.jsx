import { useState } from "react";
import { X } from "lucide-react";

export default function ProjectForm({ onClose, onSubmit }) {
  const [form, setForm] = useState({title:"",description:"",teamMembers:"",deadline:""});
  const change = e => setForm({...form,[e.target.name]:e.target.value});
  const submit = e => {e.preventDefault();onSubmit({...form,teamMembers:form.teamMembers.split(",").map(s=>s.trim()).filter(Boolean),deadline:form.deadline||null});};
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><section className="modal">
    <div className="modal-heading"><div><h2>Create a project</h2><p>Set up a workspace for your next big idea.</p></div><button className="icon-button" onClick={onClose}><X size={19}/></button></div>
    <form onSubmit={submit} className="form-stack"><label>Project name *<input name="title" value={form.title} onChange={change} required maxLength={120} placeholder="e.g. Smart Attendance System"/></label><label>Description<textarea name="description" value={form.description} onChange={change} rows="3" maxLength={2000} placeholder="What is this project about?"/></label><label>Team members <span className="label-hint">(comma-separated)</span><input name="teamMembers" value={form.teamMembers} onChange={change} placeholder="Arun, Bala, Priya"/></label><label>Deadline<input type="date" name="deadline" value={form.deadline} onChange={change}/></label><div className="modal-actions"><button type="button" className="button button-light" onClick={onClose}>Cancel</button><button className="button button-primary">Create project</button></div></form>
  </section></div>;
}