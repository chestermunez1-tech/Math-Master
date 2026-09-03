document.addEventListener("DOMContentLoaded", function () {

    const TOTAL_QUESTIONS = 25;

    let difficulty = "";
    let mathType = "";
    let timerChoice = null;

    let questions = [];
    let questionIndex = 0;

    let score = 0;
    let correct = 0;
    let wrong = 0;
    let streak = 0;
    let bestStreak = 0;

    let answered = false;
    let timerInterval = null;
    let timeLeft = 0;


    /* ================= ELEMENTS ================= */

    const startScreen = document.getElementById("startScreen");
    const quizScreen = document.getElementById("quizScreen");
    const resultScreen = document.getElementById("resultScreen");

    const difficultyButtons =
        document.querySelectorAll(".difficulty-btn");

    const mathButtons =
        document.querySelectorAll(".math-btn");

    const timerButtons =
        document.querySelectorAll(".timer-btn");

    const selectionText =
        document.getElementById("selectionText");

    const startBtn =
        document.getElementById("startBtn");

    const question =
        document.getElementById("question");

    const answers =
        document.getElementById("answers");

    const nextBtn =
        document.getElementById("nextBtn");

    const scoreText =
        document.getElementById("score");

    const streakText =
        document.getElementById("streak");

    const timerText =
        document.getElementById("timer");

    const accuracyText =
        document.getElementById("accuracy");

    const questionNumber =
        document.getElementById("questionNumber");

    const progressBar =
        document.getElementById("progressBar");

    const progressPercent =
        document.getElementById("progressPercent");

    const modeText =
        document.getElementById("modeText");


    /* ================= DIFFICULTY ================= */

    difficultyButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const value = button.dataset.difficulty;

            if (difficulty === value) {

                difficulty = "";
                button.classList.remove("selected");

            } else {

                difficulty = value;

                difficultyButtons.forEach(function (item) {
                    item.classList.remove("selected");
                });

                button.classList.add("selected");
            }

            updateSelection();
        });

    });


    /* ================= MATH TYPE ================= */

    mathButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const value = button.dataset.type;

            if (mathType === value) {

                mathType = "";
                button.classList.remove("selected");

            } else {

                mathType = value;

                mathButtons.forEach(function (item) {
                    item.classList.remove("selected");
                });

                button.classList.add("selected");
            }

            updateSelection();
        });

    });


    /* ================= TIMER ================= */

    timerButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const value = Number(button.dataset.time);

            if (timerChoice === value) {

                timerChoice = null;
                button.classList.remove("selected");

            } else {

                timerChoice = value;

                timerButtons.forEach(function (item) {
                    item.classList.remove("selected");
                });

                button.classList.add("selected");
            }

            updateSelection();
        });

    });


    /* ================= UPDATE SELECTION ================= */

    function updateSelection() {

        if (
            difficulty !== "" &&
            mathType !== "" &&
            timerChoice !== null
        ) {

            let timerName;

            if (timerChoice === 0) {
                timerName = "No Timer";
            } else if (timerChoice === 30) {
                timerName = "30 Seconds";
            } else {
                timerName = "1 Minute";
            }

            selectionText.textContent =
                capitalize(difficulty) +
                " • " +
                capitalize(mathType) +
                " • " +
                timerName;

            startBtn.disabled = false;

        } else {

            selectionText.textContent =
                "Choose difficulty, math type, and timer";

            startBtn.disabled = true;
        }
    }


    /* ================= START ================= */

    startBtn.addEventListener("click", function () {

        if (
            difficulty === "" ||
            mathType === "" ||
            timerChoice === null
        ) {
            return;
        }

        score = 0;
        correct = 0;
        wrong = 0;
        streak = 0;
        bestStreak = 0;
        questionIndex = 0;

        createQuiz();

        scoreText.textContent = "0";
        streakText.textContent = "0";
        accuracyText.textContent = "0%";

        modeText.textContent =
            capitalize(difficulty) +
            " • " +
            capitalize(mathType);

        showScreen(quizScreen);

        showQuestion();
    });


    /* ================= CREATE QUIZ ================= */

    function createQuiz() {

        questions = [];

        let used = new Set();

        while (questions.length < TOTAL_QUESTIONS) {

            let newQuestion = createQuestion();

            if (!used.has(newQuestion.text)) {

                used.add(newQuestion.text);
                questions.push(newQuestion);
            }
        }
    }


    /* ================= CREATE QUESTION ================= */

    function createQuestion() {

        if (mathType === "MDAS") {
            return createMDASQuestion();
        }

        return createNormalQuestion();
    }


    /* ================= NORMAL QUESTIONS ================= */

    function createNormalQuestion() {

        let a;
        let b;
        let answer;
        let symbol;


        /* EASY */

        if (difficulty === "EASY") {

            if (mathType === "MULTIPLICATION") {

                a = random(1, 10);
                b = random(1, 10);

            } else if (mathType === "DIVISION") {

                b = random(1, 10);
                answer = random(1, 10);
                a = b * answer;

            } else {

                a = random(1, 20);
                b = random(1, 20);
            }
        }


        /* MEDIUM */

        else if (difficulty === "MEDIUM") {

            if (mathType === "MULTIPLICATION") {

                a = random(10, 99);
                b = random(2, 9);

            } else if (mathType === "DIVISION") {

                b = random(2, 12);
                answer = random(10, 30);
                a = b * answer;

            } else {

                a = random(10, 99);
                b = random(10, 99);
            }
        }


        /* HARD */

        else {

            if (mathType === "MULTIPLICATION") {

                a = random(100, 999);
                b = random(10, 99);

            } else if (mathType === "DIVISION") {

                b = random(2, 20);
                answer = random(10, 99);
                a = b * answer;

                if (a < 100) {
                    return createNormalQuestion();
                }

            } else {

                a = random(100, 999);
                b = random(100, 999);
            }
        }


        /* OPERATION */

        if (mathType === "ADDITION") {

            symbol = "+";
            answer = a + b;

        }

        else if (mathType === "SUBTRACTION") {

            symbol = "−";

            if (b > a) {
                let temp = a;
                a = b;
                b = temp;
            }

            answer = a - b;

        }

        else if (mathType === "MULTIPLICATION") {

            symbol = "×";
            answer = a * b;

        }

        else if (mathType === "DIVISION") {

            symbol = "÷";
        }


        return {
            text: a + " " + symbol + " " + b + " = ?",
            answer: answer
        };
    }


    /* ================= MDAS ================= */

    function createMDASQuestion() {

        let count;

        if (difficulty === "EASY") {
            count = random(3, 4);
        }
        else if (difficulty === "MEDIUM") {
            count = random(3, 4);
        }
        else {
            count = random(4, 5);
        }


        let numbers = [];
        let operators = [];


        for (let i = 0; i < count; i++) {

            let number;

            if (difficulty === "EASY") {
                number = random(1, 10);
            }
            else if (difficulty === "MEDIUM") {
                number = random(10, 50);
            }
            else {
                number = random(100, 300);
            }

            numbers.push(number);


            if (i < count - 1) {

                operators.push(
                    ["+", "−", "×", "÷"][
                        random(0, 3)
                    ]
                );
            }
        }


        /* Make division easier to calculate */

        for (let i = 0; i < operators.length; i++) {

            if (operators[i] === "÷") {

                numbers[i] =
                    numbers[i + 1] *
                    random(2, 5);
            }
        }


        let answer =
            calculateMDAS(numbers, operators);


        if (
            !Number.isInteger(answer) ||
            answer < 0 ||
            answer > 100000
        ) {
            return createMDASQuestion();
        }


        let expression = numbers[0];

        for (let i = 0; i < operators.length; i++) {

            expression +=
                " " +
                operators[i] +
                " " +
                numbers[i + 1];
        }


        return {
            text: expression + " = ?",
            answer: answer
        };
    }


    /* ================= CALCULATE MDAS ================= */

    function calculateMDAS(numbers, operators) {

        let values = numbers.slice();
        let ops = operators.slice();


        /* Multiplication and division */

        let i = 0;

        while (i < ops.length) {

            if (
                ops[i] === "×" ||
                ops[i] === "÷"
            ) {

                let result;

                if (ops[i] === "×") {

                    result =
                        values[i] *
                        values[i + 1];

                } else {

                    if (values[i + 1] === 0) {
                        return NaN;
                    }

                    result =
                        values[i] /
                        values[i + 1];
                }


                values.splice(
                    i,
                    2,
                    result
                );

                ops.splice(i, 1);

            } else {

                i++;
            }
        }


        /* Addition and subtraction */

        let result = values[0];

        for (let j = 0; j < ops.length; j++) {

            if (ops[j] === "+") {

                result += values[j + 1];

            } else {

                result -= values[j + 1];
            }
        }

        return result;
    }


    /* ================= SHOW QUESTION ================= */

    function showQuestion() {

        clearInterval(timerInterval);

        answered = false;

        nextBtn.disabled = true;


        let current =
            questions[questionIndex];


        question.textContent =
            current.text;


        questionNumber.textContent =
            questionIndex + 1;


        let percent =
            ((questionIndex + 1) /
            TOTAL_QUESTIONS) * 100;


        progressBar.style.width =
            percent + "%";


        progressPercent.textContent =
            Math.round(percent) + "%";


        createAnswers(current.answer);

        startTimer();
    }


    /* ================= ANSWERS ================= */

    function createAnswers(correctAnswer) {

        answers.innerHTML = "";


        let choices = [];

        choices.push(correctAnswer);


        while (choices.length < 4) {

            let difference;

            if (difficulty === "EASY") {
                difference = random(1, 10);
            }
            else if (difficulty === "MEDIUM") {
                difference = random(5, 30);
            }
            else {
                difference = random(10, 100);
            }


            let wrongAnswer;


            if (Math.random() < 0.5) {
                wrongAnswer =
                    correctAnswer + difference;
            }
            else {
                wrongAnswer =
                    correctAnswer - difference;
            }


            if (
                wrongAnswer >= 0 &&
                !choices.includes(wrongAnswer)
            ) {
                choices.push(wrongAnswer);
            }
        }


        shuffle(choices);


        let letters = ["A", "B", "C", "D"];


        choices.forEach(function (choice, index) {

            let button =
                document.createElement("button");

            button.className =
                "answer-btn";


            button.innerHTML =
                '<span class="answer-letter">' +
                letters[index] +
                '</span>' +
                '<span>' +
                choice +
                '</span>';


            button.dataset.answer =
                choice;


            button.addEventListener(
                "click",
                function () {
                    selectAnswer(button);
                }
            );


            answers.appendChild(button);
        });
    }


    /* ================= SELECT ANSWER ================= */

    function selectAnswer(button) {

        if (answered) {
            return;
        }


        answered = true;

        clearInterval(timerInterval);


        let selected =
            Number(button.dataset.answer);


        let correctAnswer =
            questions[questionIndex].answer;


        let allButtons =
            document.querySelectorAll(".answer-btn");


        allButtons.forEach(function (item) {

            item.disabled = true;


            if (
                Number(item.dataset.answer) ===
                correctAnswer
            ) {
                item.classList.add("correct");
            }
        });


        if (selected === correctAnswer) {

            button.classList.add("correct");

            correct++;
            score++;
            streak++;


            if (streak > bestStreak) {
                bestStreak = streak;
            }

        } else {

            button.classList.add("wrong");

            wrong++;
            streak = 0;
        }


        updateStats();

        nextBtn.disabled = false;
    }


    /* ================= TIMER ================= */

    function startTimer() {

        if (timerChoice === 0) {

            timerText.textContent = "∞";

            return;
        }


        timeLeft = timerChoice;

        timerText.textContent =
            timeLeft + "s";


        timerInterval =
            setInterval(function () {

                timeLeft--;

                timerText.textContent =
                    timeLeft + "s";


                if (timeLeft <= 0) {

                    clearInterval(timerInterval);

                    timeOut();
                }

            }, 1000);
    }


    /* ================= TIME OUT ================= */

    function timeOut() {

        if (answered) {
            return;
        }


        answered = true;

        wrong++;

        streak = 0;


        let correctAnswer =
            questions[questionIndex].answer;


        let allButtons =
            document.querySelectorAll(".answer-btn");


        allButtons.forEach(function (button) {

            button.disabled = true;


            if (
                Number(button.dataset.answer) ===
                correctAnswer
            ) {
                button.classList.add("correct");
            }
        });


        updateStats();

        nextBtn.disabled = false;
    }


    /* ================= NEXT ================= */

    nextBtn.addEventListener("click", function () {

        if (!answered) {
            return;
        }


        questionIndex++;


        if (questionIndex >= TOTAL_QUESTIONS) {

            finishQuiz();

        } else {

            showQuestion();
        }
    });


    /* ================= STATS ================= */

    function updateStats() {

        scoreText.textContent =
            score;


        streakText.textContent =
            streak;


        let total =
            correct + wrong;


        let accuracy = 0;


        if (total > 0) {

            accuracy =
                Math.round(
                    (correct / total) * 100
                );
        }


        accuracyText.textContent =
            accuracy + "%";
    }


    /* ================= FINISH ================= */

    function finishQuiz() {

        clearInterval(timerInterval);


        let percentage =
            Math.round(
                (correct / TOTAL_QUESTIONS) * 100
            );


        document.getElementById("finalScore")
            .textContent =
            correct + "/" + TOTAL_QUESTIONS;


        document.getElementById("percentage")
            .textContent =
            percentage + "%";


        document.getElementById("correctCount")
            .textContent =
            correct;


        document.getElementById("wrongCount")
            .textContent =
            wrong;


        document.getElementById("bestStreak")
            .textContent =
            bestStreak;


        let title =
            document.getElementById("resultTitle");


        let message =
            document.getElementById("resultMessage");


        let icon =
            document.getElementById("resultIcon");


        let achievement =
            document.getElementById("achievement");


        if (percentage === 100) {

            icon.textContent = "🏆";
            title.textContent = "Perfect Score!";
            message.textContent =
                "Amazing! You got everything correct.";
            achievement.textContent =
                "🏆 You are a true Math Master!";

        }

        else if (percentage >= 80) {

            icon.textContent = "🌟";
            title.textContent = "Excellent Work!";
            message.textContent =
                "You have a strong math score.";
            achievement.textContent =
                "🌟 Great job! Keep practicing.";

        }

        else if (percentage >= 60) {

            icon.textContent = "👏";
            title.textContent = "Good Job!";
            message.textContent =
                "You are improving. Keep practicing.";
            achievement.textContent =
                "💪 Keep going and beat your score.";

        }

        else {

            icon.textContent = "📚";
            title.textContent = "Keep Practicing!";
            message.textContent =
                "Practice more and try again.";
            achievement.textContent =
                "📚 Every practice makes you better.";
        }


        showScreen(resultScreen);
    }


    /* ================= PLAY AGAIN ================= */

    document.getElementById("playAgainBtn")
        .addEventListener("click", function () {

            clearInterval(timerInterval);

            score = 0;
            correct = 0;
            wrong = 0;
            streak = 0;
            bestStreak = 0;
            questionIndex = 0;

            createQuiz();

            updateStats();

            showScreen(quizScreen);

            showQuestion();
        });


    /* ================= CHOOSE ANOTHER ================= */

    document.getElementById("chooseBtn")
        .addEventListener("click", function () {

            clearInterval(timerInterval);

            showScreen(startScreen);
        });


    /* ================= BACK ================= */

    document.getElementById("backBtn")
        .addEventListener("click", function () {

            clearInterval(timerInterval);

            showScreen(startScreen);
        });


    /* ================= KEYBOARD ================= */

    document.addEventListener("keydown", function (event) {

        if (!quizScreen.classList.contains("active")) {
            return;
        }


        if (answered) {
            return;
        }


        let key =
            event.key.toUpperCase();


        let letters =
            ["A", "B", "C", "D"];


        let index =
            letters.indexOf(key);


        if (index === -1) {
            return;
        }


        let buttons =
            document.querySelectorAll(".answer-btn");


        if (buttons[index]) {

            selectAnswer(buttons[index]);
        }
    });


    /* ================= SCREEN ================= */

    function showScreen(screen) {

        document.querySelectorAll(".screen")
            .forEach(function (item) {

                item.classList.remove("active");
            });


        screen.classList.add("active");

        window.scrollTo(0, 0);
    }


    /* ================= RANDOM ================= */

    function random(min, max) {

        return Math.floor(
            Math.random() *
            (max - min + 1)
        ) + min;
    }


    /* ================= SHUFFLE ================= */

    function shuffle(array) {

        for (
            let i = array.length - 1;
            i > 0;
            i--
        ) {

            let j =
                Math.floor(
                    Math.random() * (i + 1)
                );


            let temp = array[i];

            array[i] = array[j];

            array[j] = temp;
        }

        return array;
    }


    /* ================= CAPITALIZE ================= */

    function capitalize(text) {

        return text.charAt(0).toUpperCase() +
               text.slice(1).toLowerCase();
    }


    /* INITIAL */

    updateSelection();

});