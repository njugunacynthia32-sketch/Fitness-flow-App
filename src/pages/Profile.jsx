import { useEffect, useState } from "react";
import ProfileForm from "../components/ProfileForm";
import ProfileCard from "../components/ProfileCard";

const emptyProfile = {
    name: "",
    age: "",
    height: "",
    weight: "",
    goal: "",
};
 
function Profile() {
    const [profile, setProfile] = useState(emptyProfile);
    const [savedProfile, setSavedProfile] = useState(emptyProfile);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/profile")
            .then((response) => response.json())
            .then((data) => {
                setProfile(data);
                setSavedProfile(data);
            })
            .catch(() => {
                setMessage("Fill in the form and click Save.");
            });
    }, []);

    function handleChange(event) {
        setProfile({
            ...profile,
            [event.target.name]: event.target.value,
        });
        setMessage("");
    }

    function handleSave(event) {
        event.preventDefault();

        setSavedProfile(profile);
        setProfile(emptyProfile);
        setMessage("Profile saved!");

        fetch("http://localhost:3000/profile", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
        })
            .then((response) => response.json())
            .then((data) => {
                setSavedProfile(data);
            })
            .catch(() => {
                setMessage("Profile saved on this page.");
            });
    }

    function handleEdit() {
        setProfile(savedProfile);
        setMessage("Edit the form, then click Save.");
    }

    return (
        <div>
            <h1>Profile</h1>

            <ProfileForm
                profile={profile}
                handleChange={handleChange}
                handleSave={handleSave}
            />

            {message && <p className="profile-message">{message}</p>}

            <ProfileCard profile={savedProfile} handleEdit={handleEdit} />
        </div>
    );
    }   

export default Profile;
