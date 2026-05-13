function WorkoutFilters({ group, groups, onGroupChange, onSearchChange, search }) {
  return (
    <div className="filters">
      <label>
        Search
        <input
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Try legs, push-up, dumbbells..."
          type="search"
          value={search}
        />
      </label>

      <label>
        Muscle group
        <select
          onChange={(event) => onGroupChange(event.target.value)}
          value={group}
        >
          {groups.map((muscleGroup) => (
            <option key={muscleGroup} value={muscleGroup}>
              {muscleGroup}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default WorkoutFilters
