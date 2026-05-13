function ExerciseCard({ exercise, isSelected, onToggleExercise }) {
  return (
    <article className="exercise-card">
      <div className="card-top">
        <div>
          <h2>{exercise.name}</h2>
          <p>
            {exercise.group} - {exercise.equipment}
          </p>
        </div>
        <span>{exercise.level}</span>
      </div>

      <p>{exercise.description}</p>

      <ol>
        {exercise.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <div className="card-bottom">
        <strong>{exercise.minutes} min</strong>
        <button
          className={isSelected ? 'remove-button' : 'primary-button'}
          onClick={() => onToggleExercise(exercise.id)}
          type="button"
        >
          {isSelected ? 'Remove' : 'Add to plan'}
        </button>
      </div>
    </article>
  )
}

export default ExerciseCard
