import { useEffect, useState } from "react";
import ProfileForm from "../components/ProfileForm";
import ProfileCard from "../components/ProfileCard";
 
function Profile() {
    const [profile, setProfile] = useState({
        name: "",
        age: "",
        height: "",
        weight: "",
        goal: "",
    });

    useEffect(() => {
        fetch("http://localhost:3000/profile")
            .then((response) => response.json())
            .then((data) => setProfile(data))
    }, []);

    function handleChange(event) {
        setProfile({
            ...profile,
            [event.target.name]: event.target.value,
        });
    }
    function handleSave(event) {
        event.preventDefault();

        fetch("http://localhost:3000/profile", {
            methof: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
        })
            .then((response) => response.json())
            .then((data) => setProfile(data))
    }

    return (
        <div>
            <h1>Profile</h1>

            <ProfileForm
                profile={profile}
                handleChange={handleChange}
                handleSave={handleSave}
            />

            <ProfileCard profile={profile} />
        </div>
    );
    }   

export default Profile;

