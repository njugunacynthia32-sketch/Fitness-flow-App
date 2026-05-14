function ProfileCard({ profile, handleEdit }) {
  return (
    <div className="profile-card">
      <h2>User Info</h2>
      <p>Name: {profile.name}</p>
      <p>Age: {profile.age}</p>
      <p>Height: {profile.height} cm</p>
      <p>Weight: {profile.weight} kg</p>
      <p>Goal: {profile.goal}</p>
      <button type="button" onClick={handleEdit}>Edit</button>
    </div>
  );
}

export default ProfileCard;
