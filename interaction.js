import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./auth.js"; 

document.addEventListener("DOMContentLoaded", function () {
    const workoutList = document.getElementById("workouts");
    const totalWorkouts = document.getElementById("totalWorkouts");
    const totalDuration = document.getElementById("totalDuration");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Load existing workouts from Firestore
    loadWorkouts();

    // ✅ Fix: Add Workout Button
    document.getElementById("addWorkout").addEventListener("click", async function (event) {
        event.preventDefault();
        
        let exercise = document.getElementById("exercise");
        let duration = document.getElementById("duration");
        let date = document.getElementById("date");

        if (exercise.value && duration.value && date.value) {
            try {
                console.log("Adding workout:", exercise.value, duration.value, date.value); // Debugging

                await addDoc(collection(db, "workouts"), {
                    exercise: exercise.value,
                    duration: duration.value,
                    date: date.value
                });

                alert("Workout added successfully!");
                exercise.value = "";  // ✅ Clears input fields
                duration.value = "";
                date.value = "";
                
                loadWorkouts();  // ✅ Refresh the workout list
            } catch (error) {
                console.error("Error adding workout:", error);
                alert("Error saving workout! Check the console for details.");
            }
        } else {
            alert("Please fill all fields!");
        }
    });

    // ✅ Fix: Load Workouts from Firestore
    async function loadWorkouts() {
        workoutList.innerHTML = "";  
        let totalDurationSum = 0;
        let count = 0;

        try {
            console.log("Fetching workouts from Firestore..."); // Debugging

            const querySnapshot = await getDocs(collection(db, "workouts"));
            querySnapshot.forEach((doc) => {
                let workout = doc.data();
                let li = document.createElement("li");
                li.innerHTML = `${workout.exercise} - ${workout.duration} mins (${workout.date}) 
                    <button onclick="deleteWorkout('${doc.id}')">❌</button>`;
                workoutList.appendChild(li);

                totalDurationSum += parseInt(workout.duration);
                count++;
            });

            totalWorkouts.textContent = count;
            totalDuration.textContent = totalDurationSum;

            console.log("Workouts loaded successfully!"); // Debugging
        } catch (error) {
            console.error("Error loading workouts:", error);
        }
    }

    // ✅ Fix: Delete Workout from Firestore
    window.deleteWorkout = async function (id) {
        try {
            await deleteDoc(doc(db, "workouts", id));
            alert("Workout deleted!");
            loadWorkouts();  // Refresh after deletion
        } catch (error) {
            console.error("Error deleting workout:", error);
            alert("Error deleting workout!");
        }
    };

    // ✅ Fix: Theme Toggle (Dark Mode)
    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        console.log("Theme changed:", body.classList.contains("dark-mode"));  // Debugging
    });
});
