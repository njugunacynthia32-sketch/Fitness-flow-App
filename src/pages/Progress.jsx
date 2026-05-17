import { exercises, workoutPlanStorageKey } from '../workout.js'
import { Link } from 'react-router-dom'

function loadWorkoutPlan() {
  const savedPlan = localStorage.getItem(workoutPlanStorageKey)

  if (!savedPlan) return []

  try {
    const savedIds = JSON.parse(savedPlan)

    if (!Array.isArray(savedIds)) return []

    return exercises.filter((exercise) => savedIds.includes(exercise.id))
  } catch {
    return []
  }
}

function Progress() {
  const workoutPlan = loadWorkoutPlan()
  let totalMinutes = 0

  workoutPlan.forEach((exercise) => {
    totalMinutes = totalMinutes + exercise.minutes
  })

  const caloriesBurned = totalMinutes * 7

  return (
    <main className="progress-page">
      <section className="progress-card">
        <p className="small-heading">Progress</p>
        <h1 className="workout-progress">Your Workout Progress</h1>
        <p className="progress-intro">
          Keep going. Every workout you add brings you closer to your fitness goals.
        </p>

        <div className="progress-stats">
          <div>
            <strong>{workoutPlan.length}</strong>
            <span>Exercises</span>
          </div>
          <div>
            <strong>{totalMinutes}</strong>
            <span>Minutes</span>
          </div>
          <div>
            <strong>{caloriesBurned}</strong>
            <span>Calories</span>
          </div>
        </div>

        {workoutPlan.length === 0 ? (
          <div className="empty-progress-state">
            <p>You have not added any exercises to your workout plan yet.</p>
            <Link to="/workouts" className="progress-link">
              Add workouts
            </Link>
          </div>
        ) : (
          <div className="added-exercises">
            <h2>Added Exercises</h2>

            <ul className="plan-list progress-plan-list">
              {workoutPlan.map((exercise) => (
                <li key={exercise.id}>
                  <div>
                    <strong>{exercise.name}</strong>
                    <span>{exercise.group}</span>
                  </div>
                  <span>{exercise.minutes} min</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  )
}

export default Progress
