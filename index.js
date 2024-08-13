const quizList = [
    {
        "type": "multiple",
        "difficulty": "medium",
        "question": "What is the name of the 2016 studio album by the French electronic music duo Justice?",
        "answers": [
            "Randy",
            "Safe and Sound",
            "Pleasure",
            "Woman",
        ],
        "correct_answer": "Woman",
        "description": "The 2016 studio album by the French electronic music duo Justice is titled “Woman”.“Woman” is a vibrant blend of electronic beats, funky basslines, and infectious melodies.Justice masterfully combines elements of disco, house, and synth-pop, creating an exhilarating sonic experience."
    },


    {
        "type": "multiple",
        "difficulty": "easy",
        "question": "Which of the following is not a faction in Tom Clancy's The Division?",
        "answers": [
            "Cleaners",
            "Last Man Batallion",
            "Rikers",
            "CDC"
        ],
        "correct_answer": "CDC",
        "description": "When the Green Poison outbreak hit New York City, chaos ensued. The NYPD and hospitals struggled to maintain order, leading to widespread infection.In response, the National Guard, Army, Marine Reserves, and the CDC were called in by New York’s governor to assist with containment efforts."
    },
    {
        "type": "multiple",
        "difficulty": "hard",
        "question": "What is the official name of Prince's backing band?",
        "answers": [
            "The Paupers",
            "The Wailers",
            "The Revolution",
            "The Heartbreakers"
        ],
        "correct_answer": "The Revolution",
        "description": "Prince’s iconic backing band was known as The Revolution. Formed in Minneapolis, Minnesota, in 1979, they served as both his live band and later his studio band. Their sound blended rock, pop, R&B, funk, new wave, and psychedelic elements, contributing significantly to the creation of the Minneapolis sound."
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "question": "Which of the following is the largest planet in our solar system",
        "answers": [
            "Mars",
            "Venus",
            "Jupiter",
            "Saturn",
        ],
        "correct_answer": "Jupiter",
        "description": "Jupiter is the largest planet in our solar system, more than twice as massive as all the other planets combined.It’s a gas giant, primarily composed of hydrogen and helium.The planet’s thick atmosphere contains swirling clouds of ammonia and water."
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "question": "In the game series &quot;The Legend of Zelda&quot;, what was the first 3D game?",
        "answers": [
            "Ocarina of Time",
            "Majora's Mask",
            "A Link to the Past",
            "The Wind Waker"
        ],
        "correct_answer": "Ocarina of Time",
        "description": "The Legend of Zelda: Ocarina of Time is a fantasy action-adventure game set in a three-dimensional world. In this game, you control the series protagonist, Link, from a third-person perspective. Link wields a sword and shield, but he can also use other weapons like projectiles, bombs, and magic spells"
    }
]

document.addEventListener('DOMContentLoaded', function () {
    const quizContainer = document.querySelector(".quiz-container");

    // Initialize quiz state variables
    let currentIndex = 0;
    let totalScore = 0;
    let timeLeft = 15;
    let timerId;
    let questionAnswered = false;

    // Function to create the initial quiz structure

    function createQuizStructure() {
        // Create timer element
        const heading = quizContainer.querySelector('h1');
        heading.classList.add("heading");
        const timerElement = document.createElement("div");
        timerElement.id = "timer";
        quizContainer.appendChild(timerElement);

        // Create two inner containers for question and answers
        for (let i = 1; i <= 2; i++) {
            const innerContainer = document.createElement("div");
            innerContainer.classList.add("innerContainer");
            quizContainer.appendChild(innerContainer);
        }

        // Select the created inner containers
        const firstInnerContainer = quizContainer.querySelector(".innerContainer:nth-child(3)");
        const secondInnerContainer = quizContainer.querySelector(".innerContainer:nth-child(4)");


        // Create elements for question, options, description, and next button
        const question = document.createElement("h1");
        const optionList = document.createElement("ol");
        const descriptionBox = document.createElement("div");
        const description = document.createElement("div");
        const nextButton = document.createElement("button");

        // Set attributes and styles
        description.id = "description";
        descriptionBox.id = "descriptionBox";
        descriptionBox.style.display = "none";
        optionList.style.paddingInlineStart = "0";
        nextButton.innerText = "Next";
        nextButton.classList.add("next-button");

        // Append elements to their respective containers
        firstInnerContainer.appendChild(question);
        secondInnerContainer.appendChild(optionList);
        descriptionBox.innerHTML = "<span>Description</span>";
        descriptionBox.appendChild(description);
        secondInnerContainer.appendChild(descriptionBox);
        secondInnerContainer.appendChild(nextButton);

        // Return an object with references to created elements
        return {
           heading, timerElement, question, optionList, descriptionBox,
            description, nextButton
        };
    }

    // Create the initial quiz structure and store references to elements
    const quizElements = createQuizStructure();



    // Function to move to the next question or end the quiz
    function moveToNextQuestion() {
        currentIndex++;
        if (currentIndex < quizList.length) {
            updateQuestion();
        } else {
            clearInterval(timerId);
            showFinalScore();
        }
    }

    // Function to start or reset the timer
    const startTimer = () => {

        clearInterval(timerId);
        timeLeft = 15;  // Add this line to reset timeLeft
        quizElements.timerElement.innerText = timeLeft;
        quizElements.timerElement.classList.remove("warning");

        timerId = setInterval(() => {
            timeLeft--;
            quizElements.timerElement.innerText = timeLeft;

            if (timeLeft <= 5) {
                quizElements.timerElement.classList.add("warning");
            }

            if (timeLeft <= 0) {
                clearInterval(timerId);
                moveToNextQuestion();
            }
        }, 1000);
    }
      
     // Function to update the question and answer options
      function updateQuestion() {
        questionAnswered = false;
        quizElements.descriptionBox.style.display = "none";
        clearInterval(timerId);
        startTimer();

        const currentQuestion = quizList[currentIndex];
        quizElements.question.innerText = `${currentIndex + 1}. ${currentQuestion.question}`;

        quizElements.optionList.innerHTML = "";
        currentQuestion.answers.forEach((option) => {
            const li = document.createElement("li");
            li.innerText = option;
            li.classList.add("option");
            li.addEventListener("click", () => handleOptionClick(li));
            quizElements.optionList.appendChild(li);
        });
    }

     const handleOptionClick = (selectedOption) => {

        if (questionAnswered) return;
        clearInterval(timerId);
        
        questionAnswered = true;
        
        const correctAnswer = quizList[currentIndex].correct_answer;

        // disable all buttons

        quizElements.optionList.querySelectorAll(".option").forEach(option => {
            option.style.pointerEvents = "none";
            option.classList.add("disabled");
            if (option.innerText === correctAnswer) {
                option.style.backgroundColor = "lightgreen";
                option.classList.add("correct");
            }
        })
        // Check if the selected answer is correct
        if (selectedOption.innerText === correctAnswer) {
            selectedOption.style.backgroundColor = "green";
            selectedOption.classList.add("correct");
            totalScore++;
        }
        else {
            selectedOption.style.backgroundColor = "red";
        }

        quizElements.descriptionBox.style.display = "block";
        quizElements.description.innerText = quizList[currentIndex].description;
        quizElements.nextButton.style.display = "block";

    }

    const restartQuiz = () => {
        clearInterval(timerId);
        currentIndex = 0;
        totalScore = 0;

        //create refrence to the heading
        quizElements.heading.innerText = "Quiz App"
        
        // Clear the quiz container and add the heading
        quizContainer.innerHTML = '';
        quizContainer.appendChild(quizElements.heading);


        // Recreate the quiz structure
        const newQuizElements = createQuizStructure();
        Object.assign(quizElements, newQuizElements);

        quizElements.nextButton.addEventListener("click" , moveToNextQuestion )

        // Start the quiz again
        updateQuestion();

    }

    const showFinalScore = () => {

        const Percentage = ((totalScore / quizList.length) * 100).toFixed(2)
        quizContainer.innerHTML = `
                 <div class="quiz-completion">
                <h1>Quiz Completed</h1>
                 <p>Final Score: ${totalScore} / ${quizList.length}</p>
                <p>Percentage: <span class="percentage">${Percentage}%</span></p>
                <p></p>
                <button  id="restartButton">Restart Quiz</button>
                </div>
            `;

        const restartButton = document.getElementById("restartButton");
        restartButton.addEventListener("click", restartQuiz);
        
    };

    // Add event listener for the next button
    quizElements.nextButton.addEventListener("click", moveToNextQuestion);

    // Start the quiz by displaying the first question
    updateQuestion();


});
























