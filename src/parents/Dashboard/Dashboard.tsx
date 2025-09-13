// Dashboard.tsx
import SidePanel from '../../components/SideBar/sidePanel'
import './dashboard.scss'
import { useState } from 'react'

function Dashboard() {
  const [active, setActive] = useState("dashboard")

  return (
    <div className="dashboard">
      <SidePanel active={active} setActive={setActive} />
      <main className="dashboard-content">
        <h1>{active.charAt(0).toUpperCase() + active.slice(1)}</h1>
        <p>Welcome to Splitz!</p>
        <p>We are at <b>{active}</b></p>
      </main>
    </div>
  )
}

export default Dashboard
