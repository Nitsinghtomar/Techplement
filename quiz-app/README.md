# Quiz Application

This is a modern quiz application built using **HTML**, **CSS**, and **JavaScript**. It fetches quiz questions dynamically from the **Open Trivia Database API** and presents them in a fun and interactive way. Users can participate in a quiz, answer questions, and view their results.

## Features

- **Start Quiz**: Allows users to start the quiz.
- **Random Questions**: Fetches a random set of 5 questions each time the quiz starts.
- **Answer Choices**: Displays 4 answer choices per question (multiple-choice format).
- **Answer Selection**: Users can select one answer per question and change their selection before moving on.
- **Results**: Displays the user's performance after finishing the quiz, including correct and incorrect answers.
- **Responsive Design**: The quiz application is mobile-friendly and works on both desktop and mobile devices.
- **Simple User Interface**: A clean, minimalist UI that focuses on user experience.

## Technologies Used

- **HTML** for structuring the page.
- **CSS** for styling the page and making it responsive.
- **JavaScript** for handling dynamic content, fetching questions from the API, and managing the quiz logic.
- **Open Trivia Database API** to fetch quiz questions.

## How It Works

1. **Start Quiz**: When the user clicks the "Start Quiz" button, the quiz screen loads, and questions are fetched from the API.
2. **Answer Questions**: The user can select one of the 4 answer choices for each question.
3. **Next Question**: After answering, the user can proceed to the next question using the "Next Question" button.
4. **Quiz Completion**: After answering all 5 questions, the results are displayed, showing the number of correct answers.

## How to Use

1. **Clone the repository**:
    ```bash
    git clone <repository_url>
    ```
   
2. **Open the `index.html` file** in your browser to start the quiz.

3. **Click "Start Quiz"** to begin the quiz and answer the questions.

## Running the Quiz Locally

You can run this quiz application locally by simply opening the `index.html` file in any modern web browser. For a better experience, host it using a local server:

1. Open your terminal/command prompt.
2. Navigate to the directory containing the `index.html` file.
3. Run a local server (using Python 3, for example):
    ```bash
    python3 -m http.server 8000
    ```
4. Open your browser and go to `http://localhost:8000/` to see the quiz in action.

