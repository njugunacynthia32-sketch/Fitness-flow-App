import { exercises, workoutPlanStorageKey } from '../workout.js'

function loadWorkoutPlan() {
  const savedPlan = localStorage.getItem(workoutPlanStorageKey)

  if (!savedPlan) return []

  try {
    const savedIds = JSON.parse(savedPlan)

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

  return (
    <main className="progress-page">
      <section className="progress-card">
        <p className="small-heading">Progress</p>
        <h1>Your Workout Progress</h1>

        <div className="plan-stats">
          <span>{workoutPlan.length} exercises</span>
          <span>{totalMinutes} minutes</span>
        </div>

        {workoutPlan.length === 0 ? (
          <p className="empty-plan">
            You have not added any exercises to your workout plan yet.
          </p>
        ) : (
          <ul className="plan-list">
            {workoutPlan.map((exercise) => (
              <li key={exercise.id}>
                <div>
                  <strong>{exercise.name}</strong>
                  <span>{exercise.minutes} min</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default Progress