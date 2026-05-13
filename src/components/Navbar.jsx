import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/workouts">Workouts</Link> |{" "}
      <Link to="/progress">Progress</Link> |{" "}
      <Link to="/profile">Profile</Link>
    </nav>
  )
}

export default Navbar