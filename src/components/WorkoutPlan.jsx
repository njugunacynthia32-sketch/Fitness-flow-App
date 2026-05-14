const currentDate = new Date()
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = currentDate.toLocaleDateString('en-US', options)
  const currentDay = currentDate.getDay()
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dayOfWeek = daysOfWeek[currentDay]

function planorPlans(exercises) {
    if (exercises.length === 0) return ['Your plan is empty.']
    if (exercises.length === 1) return ['Your plan']
    if (exercises.length !==1) return ['Your plans']
  }

function WorkoutPlan({
  exercises,
  onRemoveExercise,
  onStartWorkout,
  totalMinutes,

  

}) {
  return (
    <aside className="plan-box">
      <p className="small-heading">Today</p>
      <h1 className="small-heading">{dayOfWeek}, {formattedDate}</h1>
      <h1 className="small-heading1">{planorPlans(exercises)}</h1>
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
                <button
                  onClick={() =>
                    window.confirm(
                      `Removing ${exercise.name} from your plan.`,
                    ) && onRemoveExercise(exercise.id)
                  }
                  type="button"
                >
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
