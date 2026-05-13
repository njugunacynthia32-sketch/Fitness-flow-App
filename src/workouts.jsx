import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ExerciseList from './components/ExerciseList.jsx'
import WorkoutFilters from './components/WorkoutFilters.jsx'
import WorkoutLibraryHeader from './components/WorkoutLibraryHeader.jsx'
import WorkoutPlan from './components/WorkoutPlan.jsx'
import { exercises, workoutPlanStorageKey } from './workout.js'
import './App.css'

const muscleGroups = ['All', 'Legs', 'Chest', 'Back', 'Core', 'Arms', 'Cardio']

function loadSavedPlanIds() {
  const savedPlan = localStorage.getItem(workoutPlanStorageKey)

  if (!savedPlan) return []

  try {
    const savedIds = JSON.parse(savedPlan)
    return Array.isArray(savedIds) ? savedIds : []
  } catch {
    return []
  }
}

function Workouts() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [group, setGroup] = useState('All')
  const [planIds, setPlanIds] = useState(loadSavedPlanIds)

  const searchText = search.trim().toLowerCase()

  const filteredExercises = exercises.filter((exercise) => {
    const matchesGroup = group === 'All' || exercise.group === group
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchText) ||
      exercise.group.toLowerCase().includes(searchText) ||
      exercise.equipment.toLowerCase().includes(searchText)

    return matchesGroup && matchesSearch
  })

  const planExercises = exercises.filter((exercise) =>
    planIds.includes(exercise.id),
  )

  let totalMinutes = 0
  planExercises.forEach((exercise) => {
    totalMinutes += exercise.minutes
  })

  function toggleExercise(id) {
    if (planIds.includes(id)) {
      setPlanIds(planIds.filter((planId) => planId !== id))
      return
    }

    setPlanIds([...planIds, id])
  }

  function clearPlan() {
    setPlanIds([])
    localStorage.removeItem(workoutPlanStorageKey)
  }

  function startWorkout() {
    if (planIds.length === 0) return

    localStorage.setItem(workoutPlanStorageKey, JSON.stringify(planIds))
    navigate('/workouts/session')
  }

  return (
    <main className="app">
      <WorkoutLibraryHeader onClearPlan={clearPlan} />

      <section className="planner">
        <section className="exercise-area">
          <WorkoutFilters
            group={group}
            groups={muscleGroups}
            onGroupChange={setGroup}
            onSearchChange={setSearch}
            search={search}
          />

          <ExerciseList
            exercises={filteredExercises}
            onToggleExercise={toggleExercise}
            selectedIds={planIds}
            totalExercises={exercises.length}
          />
        </section>

        <WorkoutPlan
          exercises={planExercises}
          onRemoveExercise={toggleExercise}
          onStartWorkout={startWorkout}
          totalMinutes={totalMinutes}
        />
      </section>
    </main>
  )
}

export default Workouts
