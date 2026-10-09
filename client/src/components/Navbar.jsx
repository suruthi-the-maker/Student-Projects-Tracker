import { Link, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FolderKanban, LogOut, Sparkles } from "lucide-react";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const logout = () => { onLogout(); navigate("/login"); };
  return <aside className="sidebar">
    <Link className="brand" to="/"><span className="brand-icon"><Sparkles size={20}/></span><span>CampusFlow<small>STUDENT WORKSPACE</small></span></Link>
    <div className="nav-caption">WORKSPACE</div>
    <NavLink to="/" end className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}><LayoutDashboard size={18}/> Dashboard</NavLink>
    <NavLink to="/projects" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}><FolderKanban size={18}/> My Projects</NavLink>
    <div className="sidebar-bottom"><div className="profile-avatar">{user?.name?.slice(0,1)?.toUpperCase() || "S"}</div><div className="profile-text"><strong>{user?.name || "Student"}</strong><small>{user?.email || ""}</small></div><button className="icon-button logout-button" title="Log out" onClick={logout}><LogOut size={17}/></button></div>
  </aside>;
}