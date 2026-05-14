 function ProfileForm({ profile, handleChange, handleSave }) {
    return (
        <form onSubmit={handleSave} className="profile-form">
            <label className="name">
                Name:
                <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                />
            </label>
            <label className="age">
                Age:
                <input
                    type="number"
                    name="age"
                    value={profile.age}
                    onChange={handleChange}
                />
            </label>
            <label className="height">
                Height:
                <input
                    type="number"
                    name="height"
                    value={profile.height}
                    onChange={handleChange}
                />
            </label>
            <label className="weight">
                Weight:
                <input
                    type="number"
                    name="weight"
                    value={profile.weight}
                    onChange={handleChange}
                />
            </label>
            <label className="goal">
                Goal:
                <input
                    type="text"
                    name="goal"
                    value={profile.goal}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Save</button>
        </form>
    );
}

export default ProfileForm;