import { CalendarDays, Trash2, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

export default function TaskCard({ task, onUpdate, onDelete, onComment }) {
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  return <article className="task-row">
    <div className={`task-check ${task.status === "Completed" ? "checked" : ""}`} onClick={() => onUpdate(task._id, {status: task.status === "Completed" ? "Pending" : "Completed"})} title="Toggle completed">{task.status === "Completed" ? "✓" : ""}</div>
    <div className="task-main"><strong className={task.status === "Completed" ? "completed-title" : ""}>{task.title}</strong><div className="task-subline"><span>{task.assignedTo ? `Assigned to ${task.assignedTo}` : "Unassigned"}</span>{task.deadline && <span><CalendarDays size={13}/> {new Date(task.deadline).toLocaleDateString()}</span>}</div>
      {showComments && <div className="comments-panel">{(task.comments || []).map((c, i) => <p key={i}><strong>{c.author}:</strong> {c.text}</p>)}<form className="comment-form" onSubmit={e=>{e.preventDefault(); if(comment.trim()) {onComment(task._id, comment.trim());setComment("");}}}><input value={comment} onChange={e=>setComment(e.target.value)} placeholder="Add a comment..." maxLength={1000}/><button className="icon-button" aria-label="Send comment"><Send size={15}/></button></form></div>}
    </div>
    <select className={`status-select status-${task.status.toLowerCase().replace(" ","-")}`} value={task.status} onChange={e=>onUpdate(task._id,{status:e.target.value})} aria-label="Task status"><option>Pending</option><option>In Progress</option><option>Completed</option></select>
    <button className="icon-button comment-button" title="Comments" onClick={()=>setShowComments(!showComments)}><MessageSquare size={16}/><span>{task.comments?.length || 0}</span></button>
    <button className="icon-button danger-icon" title="Delete task" onClick={()=>onDelete(task._id)}><Trash2 size={16}/></button>
  </article>;
}