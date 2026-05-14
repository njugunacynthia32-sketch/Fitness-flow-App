function ProfileCard({ profile }) {
  return (
    <div>
      <h2>User Info</h2>
      <p>Name: {profile.name}</p>
      <p>Age: {profile.age}</p>
      <p>Height: {profile.height} cm</p>
      <p>Weight: {profile.weight} kg</p>
      <p>Goal: {profile.goal}</p>
    </div>
  );
}

export default ProfileCard;