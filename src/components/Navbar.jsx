
import { NavLink } from "react-router-dom"

function Navbar() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/workouts", label: "Workouts" },
    { to: "/progress", label: "Progress" },
    { to: "/profile", label: "Profile" },
  ]

  return (
    <nav className="navbar" aria-label="Primary navigation">
      <NavLink to="/" className="navbar-brand">
        Fitness Flow
      </NavLink>

      <div className="navbar-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `navbar-link${isActive ? " active" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}



export default Navbar

