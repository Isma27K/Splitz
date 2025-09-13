import { useState } from 'react'
import { FiHome, FiFolder, FiSettings, FiChevronLeft, FiChevronRight, FiUser } from "react-icons/fi"
import './sidePanel.scss'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <FiHome /> },
  { id: 'projects', label: 'Projects', icon: <FiFolder /> },
  { id: 'settings', label: 'Settings', icon: <FiSettings /> },
]

interface SidePanelProps {
  active: string;
  setActive: (id: string) => void;
}

export default function SidePanel({ active, setActive }: SidePanelProps) {
  const [collapsed, setCollapsed] = useState(true)
//   const [active, setActive] = useState('dashboard')

  return (
    <aside className={`sidepanel ${collapsed ? 'collapsed' : ''}`}>
      <div className="brand">
        <div className="logo">S</div>
        {!collapsed && <div className="title">Splitz</div>}
      </div>

      <nav className="nav">
        <nav className="nav">
        {NAV_ITEMS.map(it => (
          <button
            key={it.id}
            className={`nav-item ${active === it.id ? 'active' : ''}`}
            onClick={() => setActive(it.id)}
          >
            <span className="nav-icon">{it.icon}</span>
            {!collapsed && <span className="nav-label">{it.label}</span>}
          </button>
        ))}
      </nav>
      </nav>

      <div className="footer">
        <button className="collapse" onClick={() => setCollapsed(s => !s)}>
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
        {!collapsed && (
          <div className="user">
            <FiUser className="avatar" />
            <div className="meta">
              <div className="name">User</div>
              <div className="role">Admin</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
