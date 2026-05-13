function WorkoutLibraryHeader({ onClearPlan }) {
  return (
    <header className="app-header">
      <div>
        <p className="small-heading">Fitness Flow</p>
        <h1>Simple workout planner</h1>
        <p>
          Choose a few exercises, check the time, and build a small workout for
          today.
        </p>
      </div>

      <button className="secondary-button" onClick={onClearPlan} type="button">
        Start over
      </button>
    </header>
  )
}

export default WorkoutLibraryHeader
