import { useState } from "react";
import { X } from "lucide-react";

export default function TaskForm({ onClose, onSubmit }) {
  const [form, setForm] = useState({ title: "", assignedTo: "", deadline: "" });
  const change = e => setForm({...form, [e.target.name]:e.target.value});
  const submit = e => { e.preventDefault(); onSubmit({...form, deadline:form.deadline || null}); };
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><section className="modal">
    <div className="modal-heading"><div><h2>Add a task</h2><p>Break the project into manageable steps.</p></div><button className="icon-button" onClick={onClose}><X size={19}/></button></div>
    <form onSubmit={submit} className="form-stack"><label>Task title *<input name="title" value={form.title} onChange={change} required maxLength={160} placeholder="e.g. Build the React UI"/></label><div className="form-grid"><label>Assign to<input name="assignedTo" value={form.assignedTo} onChange={change} maxLength={80} placeholder="Team member name"/></label><label>Deadline<input type="date" name="deadline" value={form.deadline} onChange={change}/></label></div><div className="modal-actions"><button type="button" className="button button-light" onClick={onClose}>Cancel</button><button className="button button-primary">Create task</button></div></form>
  </section></div>;
}