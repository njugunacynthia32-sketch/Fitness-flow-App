const today = new Date().toLocaleDateString('en-US', {
  day: 'numeric',
  month: 'long',
  weekday: 'long',
  year: 'numeric',
})

function getPlanTitle(exercises) {
  if (exercises.length === 0) return 'Your plan is empty.'
  if (exercises.length === 1) return 'Your plan'
  return 'Your plans'
}

function WorkoutPlan({
  exercises,
  onRemoveExercise,
  onStartWorkout,
  totalMinutes,
}) {
  function removeExercise(exercise) {
    const shouldRemove = window.confirm(
      `Removing ${exercise.name} from your plan.`,
    )

    if (shouldRemove) {
      onRemoveExercise(exercise.id)
    }
  }

  return (
    <aside className="plan-box">
      <p className="small-heading">Today</p>
      <h1 className="small-heading">{today}</h1>
      <h1 className="small-heading1">{getPlanTitle(exercises)}</h1>

      <div className="plan-stats">
        <span>{exercises.length} exercises</span>
        <span>{totalMinutes} minutes</span>
      </div>

      {exercises.length === 0 ? (
        <p className="empty-plan">Add exercises to start your plan.</p>
      ) : (
        <>
          <ul className="plan-list">
            {exercises.map((exercise) => (
              <li key={exercise.id}>
                <div>
                  <strong>{exercise.name}</strong>
                  <span>{exercise.minutes} min</span>
                </div>

                <button onClick={() => removeExercise(exercise)} type="button">
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <button
            className="primary-button start-workout-button"
            onClick={onStartWorkout}
            type="button"
          >
            Start workout
          </button>
        </>
      )}
    </aside>
  )
}

export default WorkoutPlan
