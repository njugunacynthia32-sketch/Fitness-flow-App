import ExerciseCard from './ExerciseCard.jsx'

function ExerciseList({ exercises, onToggleExercise, selectedIds, totalExercises }) {
  return (
    <>
      <p className="result-count">
        Showing {exercises.length} of {totalExercises} exercises
      </p>

      <div className="exercise-list">
        {exercises.map((exercise) => (
          <ExerciseCard
            exercise={exercise}
            isSelected={selectedIds.includes(exercise.id)}
            key={exercise.id}
            onToggleExercise={onToggleExercise}
          />
        ))}
      </div>
    </>
  )
}

export default ExerciseList
