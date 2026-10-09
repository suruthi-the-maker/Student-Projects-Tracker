import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import api from "../services/api";

export default function Login({ onLogin }) {
  const [mode,setMode] = useState("login");
  const [form,setForm] = useState({name:"",email:"",password:""});
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const change=e=>setForm({...form,[e.target.name]:e.target.value});
  const submit=async e=>{e.preventDefault();setError("");setLoading(true);try{const {data}=await api.post(`/auth/${mode}`,form);onLogin(data);navigate("/");}catch(err){setError(err.response?.data?.message||"Unable to connect. Make sure the backend is running.");}finally{setLoading(false);}};
  return <main className="auth-page"><div className="auth-decoration decoration-one"/><div className="auth-decoration decoration-two"/><section className="auth-card"><Link className="brand auth-brand" to="/"><span className="brand-icon"><Sparkles size={20}/></span><span>CampusFlow<small>STUDENT WORKSPACE</small></span></Link><div className="auth-intro"><span className="eyebrow">YOUR IDEAS, ORGANIZED</span><h1>{mode==="login"?"Welcome back.":"Build something great."}</h1><p>{mode==="login"?"Sign in to pick up where your team left off.":"Create an account to manage projects and track your progress."}</p></div><div className="auth-tabs"><button className={mode==="login"?"selected":""} onClick={()=>{setMode("login");setError("");}}>Sign in</button><button className={mode==="register"?"selected":""} onClick={()=>{setMode("register");setError("");}}>Create account</button></div><form className="form-stack" onSubmit={submit}>{mode==="register"&&<label>Full name<input name="name" value={form.name} onChange={change} required maxLength={80} placeholder="Your name"/></label>}<label>Email address<input name="email" type="email" value={form.email} onChange={change} required placeholder="you@college.edu"/></label><label>Password<input name="password" type="password" value={form.password} onChange={change} minLength={6} required placeholder="At least 6 characters"/></label>{error&&<p className="error-message">{error}</p>}<button className="button button-primary auth-submit" disabled={loading}>{loading?"Please wait…":mode==="login"?"Sign in to workspace":"Create your account"}</button></form><p className="auth-footnote">Your projects are private to your account.</p></section></main>;
}