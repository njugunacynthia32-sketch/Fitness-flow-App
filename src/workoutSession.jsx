import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { exercises, workoutPlanStorageKey } from './workout.js'
import './App.css'

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

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function WorkoutSession() {
  const [plan] = useState(loadWorkoutPlan)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(() => {
    return plan[0] ? plan[0].minutes * 60 : 0
  })

  const currentExercise = plan[currentIndex]
  const previousExercise = plan[currentIndex - 1]
  const nextExercise = plan[currentIndex + 1]

  function moveToExercise(index) {
    const exercise = plan[index]

    if (!exercise) return

    setCurrentIndex(index)
    setSecondsLeft(exercise.minutes * 60)
  }

  function resetTimer() {
    if (!currentExercise) return

    setIsRunning(false)
    setSecondsLeft(currentExercise.minutes * 60)
  }

  function playOrPause() {
    setIsRunning(!isRunning)
  }

  useEffect(() => {
    if (!isRunning || !currentExercise) return

    const timer = setTimeout(() => {
      if (secondsLeft > 1) {
        setSecondsLeft(secondsLeft - 1)
        return
      }

      if (nextExercise) {
        const nextIndex = currentIndex + 1
        setCurrentIndex(nextIndex)
        setSecondsLeft(nextExercise.minutes * 60)
        return
      }

      setIsRunning(false)
      setSecondsLeft(0)
    }, 1000)

    return () => clearTimeout(timer)
  }, [isRunning, currentExercise, secondsLeft, nextExercise, currentIndex])

  if (!currentExercise) {
    return (
      <main className="timer-page">
        <section className="timer-card">
          <p className="small-heading">Workout session</p>
          <h1>No workout selected</h1>
          <p className="empty-plan">
            Go back to the planner and add a few exercises first.
          </p>
          <Link className="back-link" to="/workouts">
            Back to planner
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="timer-page">
      <Link className="back-link" to="/workouts">
        Back to planner
      </Link>

      <section className="timer-card">
        <p className="small-heading">Workout session</p>
        <h1>{currentExercise.name}</h1>
        <p className="session-info">
          Exercise {currentIndex + 1} of {plan.length} - {currentExercise.group}
        </p>

        <div className="timer-display">{formatTime(secondsLeft)}</div>

        <div className="timer-actions">
          <button
            className="primary-button"
            onClick={playOrPause}
            type="button"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button className="secondary-button" onClick={resetTimer} type="button">
            Reset
          </button>
        </div>

        <div className="session-nav">
          <button
            className="secondary-button"
            disabled={!previousExercise}
            onClick={() => moveToExercise(currentIndex - 1)}
            type="button"
          >
            Previous
          </button>
          <button
            className="secondary-button"
            disabled={!nextExercise}
            onClick={() => moveToExercise(currentIndex + 1)}
            type="button"
          >
            Next
          </button>
        </div>

        <div className="session-preview">
          <div>
            <span>Previous</span>
            <strong>{previousExercise ? previousExercise.name : 'Nothing here :)'}</strong>
          </div>
          <div>
            <span>Next</span>
            <strong>{nextExercise ? nextExercise.name : 'Nothing here :)'}</strong>
          </div>
        </div>

        <ol className="session-steps">
          {currentExercise.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  )
}

export default WorkoutSession
