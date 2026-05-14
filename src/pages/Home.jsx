
import { Link } from "react-router-dom"

function Home() {
    return (
        
    <div className="home">
        <div className="welcome-section">
            <h1>Begin working out now!</h1>
            <p>Welcome to fitness flow app. Here you can find the best fitness plans and workouts.</p>
            <p>Begin on your fitness journey today!</p>
                <Link to="/workouts">
                <button className="start-workout-button">Start Workout</button>
                </Link>  
        </div>        
        

        <div className="Pro-tips">
            <h2>Pro Tips</h2>
            <p>Here are some tips to help you get the most out of your workouts!</p>
        </div>
    </div>
    
);
}
export default Home

