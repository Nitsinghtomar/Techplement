let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerIndex = null;
let userName = "Guest";

// UI Elements
const startQuizBtn = document.getElementById('start-quiz-btn');
const guestBtn = document.getElementById('guest-btn');
const signInBtn = document.getElementById('sign-in-btn');
const signInScreen = document.getElementById('sign-in-screen');
const submitNameBtn = document.getElementById('submit-name-btn');
const backBtn = document.getElementById('back-btn');
const quizScreen = document.getElementById('quiz-screen');
const mainScreen = document.getElementById('main-screen');
const questionNumber = document.getElementById('question-number');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextBtn = document.getElementById('next-btn');
const scoreboardScreen = document.getElementById('scoreboard-screen');
const finalScore = document.getElementById('final-score');
const exitBtn = document.getElementById('exit-btn');
const previousResults = document.getElementById('previous-results');
const userNameInput = document.getElementById('user-name');

// Show previous results from local storage
function showPreviousResults() {
    const results = JSON.parse(localStorage.getItem('quizResults')) || [];
    if (results.length > 0) {
        let resultText = "Previous Results:\n";
        results.forEach(result => {
            resultText += `${result.name}: ${result.score} points\n`;
        });
        previousResults.innerText = resultText;
    }
}

// Fetch questions from the Open Trivia Database API
function fetchQuestionsFromAPI() {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        .then(response => response.json())
        .then(data => {
            questions = data.results.map(item => {
                return {
                    question: item.question,
                    answers: [...item.incorrect_answers, item.correct_answer], // Merge incorrect and correct answers
                    correct: item.incorrect_answers.length // The index of the correct answer
                };
            });
            loadQuestion(); // Load first question after fetching
        })
        .catch(error => console.error('Error fetching questions:', error));
}

// Load current question into the quiz UI
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionNumber.innerText = `Question ${currentQuestionIndex + 1}`;
    questionElement.innerText = currentQuestion.question;

    answersElement.innerHTML = '';
    currentQuestion.answers.forEach((answer, index) => {
        const answerButton = document.createElement('button');
        answerButton.innerText = answer;
        answerButton.addEventListener('click', () => handleAnswerSelection(answerButton, index));
        answersElement.appendChild(answerButton);
    });

    nextBtn.classList.add('hidden'); // Hide "Next" button initially
}

// Handle answer selection
function handleAnswerSelection(button, selectedIndex) {
    // Remove selected class from all buttons
    const allButtons = answersElement.querySelectorAll('button');
    allButtons.forEach(btn => btn.classList.remove('selected'));

    // Add selected class to the clicked button
    button.classList.add('selected');

    // Track the selected answer index
    selectedAnswerIndex = selectedIndex;

    // Show the "Next" button after selection
    nextBtn.classList.remove('hidden');
}

// Check the answer and calculate score
function checkAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswerIndex === currentQuestion.correct) {
        score++;
    }
}

// Show scoreboard after quiz ends
function showScoreboard() {
    finalScore.innerText = `${score} / 5`;
    scoreboardScreen.classList.remove('hidden');
    quizScreen.classList.add('hidden');
}

// Exit and save result
exitBtn.addEventListener('click', () => {
    const userResults = { name: userName, score };
    const results = JSON.parse(localStorage.getItem('quizResults')) || [];
    results.push(userResults);
    localStorage.setItem('quizResults', JSON.stringify(results));

    score = 0;
    currentQuestionIndex = 0;
    mainScreen.classList.remove('hidden');
    scoreboardScreen.classList.add('hidden');
    showPreviousResults();
});

// Start quiz as guest or signed-in user
function startQuiz() {
    mainScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    fetchQuestionsFromAPI(); // Fetch questions from API
}

// Handle sign-in
signInBtn.addEventListener('click', () => {
    mainScreen.classList.add('hidden');
    signInScreen.classList.remove('hidden');
});

submitNameBtn.addEventListener('click', () => {
    userName = userNameInput.value || "Guest";
    signInScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    fetchQuestionsFromAPI(); // Fetch questions from API
});

backBtn.addEventListener('click', () => {
    signInScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
});

// Navigation and actaions
startQuizBtn.addEventListener('click', startQuiz);
guestBtn.addEventListener('click', startQuiz);

nextBtn.addEventListener('click', () => {
    checkAnswer();  // Check the answer before moving to the next question
    selectedAnswerIndex = null;  // Reset selected answer for the next question
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        nextBtn.classList.add('hidden');  // Hide "Next" button after moving to the next question
    } else {
        showScoreboard();
    }
});

// Initial setup
showPreviousResults();
