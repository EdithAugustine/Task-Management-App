// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyAVBZ31DN9mys5d5HQDz-hYjDFW-32wn6E",
        authDomain: "task-management-applicat-dcd76.firebaseapp.com",
        projectId: "task-management-applicat-dcd76",
        storageBucket: "task-management-applicat-dcd76.appspot.com",
        messagingSenderId: "206994474555",
        appId: "1:206994474555:web:cf86cde15924cfe98c5ecb"
    };
    firebase.initializeApp(firebaseConfig);

    // Reference to Firebase Firestore
    const db = firebase.firestore();

    // Function to add a task
    function addTask(title, description) {
        db.collection("tasks").add({
            title: title,
            description: description,
            completed: false
        })
        .then(function(docRef) {
            console.log("Task added with ID: ", docRef.id);
            // Clear form fields after adding task
            document.getElementById('taskForm').reset();
            // Fetch and display tasks after adding
            getTasks();
        })
        .catch(function(error) {
            console.error("Error adding task: ", error);
        });
    }

    // Function to retrieve tasks
    function getTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; // Clear previous tasks

        db.collection("tasks").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const task = doc.data();
                const li = document.createElement('li');
                li.textContent = `${task.title}: ${task.description}`;
                taskList.appendChild(li);
            });
        });
    }

    // Add event listener to the task form
    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        if (title !== '' && description !== '') {
            addTask(title, description); // Add task if title and description are not empty
        } else {
            alert('Please enter both task title and description.');
        }
    });

    // Fetch and display tasks on page load
    getTasks();
});
