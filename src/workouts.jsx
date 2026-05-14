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

function savePlanIds(planIds) {
  if (planIds.length === 0) {
    localStorage.removeItem(workoutPlanStorageKey)
    return
  }

  localStorage.setItem(workoutPlanStorageKey, JSON.stringify(planIds))
}

function Workouts() {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [group, setGroup] = useState('All')
  const [planIds, setPlanIds] = useState(loadSavedPlanIds())

  const searchText = search.trim().toLowerCase()

  const filteredExercises = exercises.filter((exercise) => {
    const exerciseName = exercise.name.toLowerCase()
    const exerciseGroup = exercise.group.toLowerCase()
    const exerciseEquipment = exercise.equipment.toLowerCase()

    if (group !== 'All' && exercise.group !== group) {
      return false
    }

    if (searchText === '') {
      return true
    }

    if (exerciseName.includes(searchText)) {
      return true
    }

    if (exerciseGroup.includes(searchText)) {
      return true
    }

    if (exerciseEquipment.includes(searchText)) {
      return true
    }

    return false
  })

  const planExercises = exercises.filter((exercise) => {
    return planIds.includes(exercise.id)
  })

  let totalMinutes = 0

  planExercises.forEach((exercise) => {
    totalMinutes += exercise.minutes
  })

  function toggleExercise(id) {
    let newPlanIds

    if (planIds.includes(id)) {
      newPlanIds = planIds.filter((planId) => planId !== id)
    } else {
      newPlanIds = [...planIds, id]
    }

    setPlanIds(newPlanIds)
    savePlanIds(newPlanIds)
  }

  function removeExercise(id) {
    const newPlanIds = planIds.filter((planId) => planId !== id)

    setPlanIds(newPlanIds)
    savePlanIds(newPlanIds)
  }

  function clearPlan() {
    setPlanIds([])
    savePlanIds([])
  }

  function startWorkout() {
    if (planIds.length === 0) return

    savePlanIds(planIds)
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
          onRemoveExercise={removeExercise}
          onStartWorkout={startWorkout}
          totalMinutes={totalMinutes}
        />
      </section>
    </main>
  )
}

export default Workouts
