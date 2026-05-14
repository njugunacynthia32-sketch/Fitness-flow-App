
import { Link } from "react-router-dom"

function Home() {
    return (
        <div className="home-container">
            <h1 className="welcome-title">Welcome to Fitness Flow app!</h1>
           
        <div className="workout-container">
         
        <div className="welcome-section">
            <h1>Begin working out now!</h1>
            <p>Welcome to fitness flow app. Here you can find the best fitness plans and workouts. </p>
            <p>Absolutely no payments are required!</p>
            <p>Begin on your fitness journey today!</p>
            <p>Click on the button below to start your workout:</p>
                <Link to="/workouts">
                <button className="start-workout-button">Start Workout</button>
                </Link>  
        </div> 

        <div className="daily-goals">
          <h2>Daily Goals</h2>

          <p> Drink 2 Litres of Water</p>
          <p> Complete 30 Minutes Exercise</p>
          <p> Eat Healthy Meals</p>
          <p> Sleep for a minimum of 8 Hours</p>
          <p>Check out your progress by clicking on the "Progress" link in the navigation bar.</p>
        </div>  

        <div className="motivation-card">
          <h2>Motivation</h2>

          <p>
            “The body achieves what the mind believes.”
          </p>

          <p>
            Stay consistent and trust your progress.
          </p>
        </div>
        

        <div className="Pro-tips">
            <h2>Pro Tips</h2>
            <p>Here are some tips to help you get the most out of your workouts!</p>
            <p>
                <ol>
                    <li>Stay hydrated before, during, and after your workouts.</li>
                    <li>Listen to your body and rest when needed.</li>
                    <li>Warm up before exercising and cool down afterwards.</li>
                    <li>Focus on proper form to prevent injuries.</li>
                    <li>Incorporate a variety of exercises to target different muscle groups.</li>
                    <li>Set realistic goals and track your progress.</li>
                    <li>Get enough sleep to aid in recovery.</li>
                    <li>Fuel your body with a balanced diet to support your fitness goals.</li>
                </ol>
            </p>
        </div>
    </div>
    </div>
  
    
);
}
export default Home

