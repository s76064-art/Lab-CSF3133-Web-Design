class Question {

    //Constructor 
    constructor(questionId, question, options, answer) {
        this.questionId = questionId;
        this.question = question;
        this.options = options;
        this.answer = answer;
        this.isCompleted = false;
        this.isCorrect = false;
    }

    checkAnswer(userAnswer) {
        this.isCorrect = (this.answer === userAnswer)
        this.isCompleted = true
        return this.isCorrect;
    }

    getCorrectAnswer() {
        return this.answer;
    }
}

//Set up
const question1 = new Question(1, "Who is the first Ash's Pokemon?", ["Pikachu", "Balbasaur", "Charmander", "Squirtle"], "Pikachu");
const question2 = new Question(2, "What is the definition of Pokemon?", ["Pocket Monster", "Digimon", "A book", "I don't know"], "Pocket Monster");
const question3 = new Question(3, "What is electric type weakness?", ['Water', 'Fighting', 'Steel', 'Ground'], "Ground");
const question4 = new Question(4, "Which Pokémon is the Fire-type starter in Gen 1?", ["Charmander", "Cyndaquil", "Torchic", "Fennekin"], "Charmander");
const question5 = new Question(5, "Which Pokémon evolves into Raichu?", ["Pichu", "Pikachu", "Eevee", "Minun"], "Pikachu");
const question6 = new Question(6, "Which type is super effective against Water?", ["Electric", "Grass", "Rock", "Fire"], "Electric");
const question7 = new Question(7, "Which Pokémon is the Legendary Bird of Ice?", ["Articuno", "Zapdos", "Moltres", "Lugia"], "Articuno");
const question8 = new Question(8, "Which Pokémon evolves using a Moon Stone?", ["Nidorina", "Nidorino", "Clefairy", "Eevee"], "Clefairy");
const question9 = new Question(9, "Which type is weak to Psychic attacks?", ["Fighting", "Ghost", "Dragon", "Steel"], "Fighting");
const question10 = new Question(10, "Which region is Pikachu originally from?", ["Kanto", "Johto", "Hoenn", "Sinnoh"], "Kanto");


const questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];

let timer;
let timerLimit = 20;
let stopTimer = false;
let answered = false;


function startQuiz() {
    //Display next question
    nextQuestion();
}

function suffleQuestions(unansweredQuestions) {
    return unansweredQuestions[Math.floor(Math.random() * unansweredQuestions.length)];
}

function displayQuestion(chosenQuestion) {
    let htmlTag = `
        <form>
        <div id="timer" class="timer"><p>Time Left: 0</p></div>
        <label class="question"> ${chosenQuestion.question} </label>

        <div class="main-items">
            <div class="question-item">
                <input type="radio" name="question" id="question1" value="${chosenQuestion.options[0]}">
                <label for="question1">${chosenQuestion.options[0]}</label>
            </div>

            <div class="question-item">
                <input type="radio" name="question" id="question2" value="${chosenQuestion.options[1]}">
                <label for="question2">${chosenQuestion.options[1]}</label>
            </div>

            <div class="question-item">
                <input type="radio" name="question" id="question3" value="${chosenQuestion.options[2]}">
                <label for="question3">${chosenQuestion.options[2]}</label>
            </div>

            <div class="question-item">
                <input type="radio" name="question" id="question4" value="${chosenQuestion.options[3]}">
                <label for="question4">${chosenQuestion.options[3]}</label>
            </div>
        </div>

        <p id="feedback" class="feedback"></p>
        <button type="submit" id="submitAnswer" value="${chosenQuestion.questionId}" >Answer</button>
    </form>
    `;

    //Print it out
    document.getElementById("questions").innerHTML = htmlTag;
}



//Generate questions
function nextQuestion() {
    answered = false;

    //Filter out answered questions
    let unansweredQuestions = questions.filter(q => !q.isCompleted);

    //If there's no more question, show result
    if (unansweredQuestions.length == 0) {

        generateResult();
    } else {
        //Choose a random question
        let chosenQuestion = suffleQuestions(unansweredQuestions);

        //Display Html tag

        displayQuestion(chosenQuestion);

        //add radio listeners
        addRadioListener()

        //add submit btn listener
        document.getElementById("submitAnswer").removeEventListener('click', nextQuestion);
        document.getElementById("submitAnswer").addEventListener('click', onSubmitBtnClikced);
    }

    //Start the timer
    stopTimer = false
    startTimer()
}

//Generate result
function generateResult() {
    const totalMarks = questions.length;
    let score = 0;
    questions.forEach(function (element, index) {
        if (element.isCorrect) {
            score += 1;
        }
    })

    let htmlTag = `
    <div class='result'>
        <h1> Your score: </h1>
        <div class="score"><h2>${score}/${totalMarks}</h2></div>
    </div>
    `

    document.getElementById("questions").innerHTML = htmlTag;

}

//Timer
function startTimer() {
    let timeLeft = timerLimit;

    if (timer) clearInterval(timer);
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}`;

    timer = setInterval(() => {
        timeLeft--;

        if (timeLeft / timerLimit <= .4) {
            document.getElementById("timer").style.color = "hsla(0, 68%, 49%, 1.00)";
        }

        console.log(timeLeft);
        document.getElementById("timer").textContent = `Time Left: ${timeLeft}`;
        if (timeLeft <= 0) {
            document.getElementById("timer").textContent = `Times Up!`;
            clearInterval(timer);

            disableRadioButtons();

            //Get question id
            const questionId = document.getElementById("submitAnswer").value

            //Find the correct question id
            let question = questions.find(q => q.questionId == questionId);

            //check if question is valid
            if (!question) {
                alert("Unable to fetch question");
                return;
            }

            question.isCompleted = true
            //Highlight the correct answer
            const correctAnswer = question.getCorrectAnswer();
            document.querySelectorAll('.question-item input[type="radio"]').forEach(function (element, index) {
                if (element.value === correctAnswer) {
                    console.log(element);
                    element.parentElement.style.backgroundColor = "hsla(123, 60%, 64%, 1.00)";
                }
            });

            //Feedback
            const feedbackText = document.getElementById('feedback')
            feedbackText.textContent = "Incorrect";
            feedbackText.style.color = "hsla(0, 68%, 49%, 1.00)";
            feedbackText.style.display = 'block';

            //Update button
            document.getElementById("submitAnswer").style.margin = ".5em 0em";
            document.getElementById("submitAnswer").style.backgroundColor = "hsla(200, 100%, 50%, 1.00)";
            document.getElementById("submitAnswer").style.color = "hsla(0, 0%, 100%, 1.00)";
            document.getElementById("submitAnswer").textContent = "Next Question";

            document.getElementById("submitAnswer").removeEventListener('click', onSubmitBtnClikced);
            document.getElementById("submitAnswer").addEventListener('click', nextQuestion);

        } else if (stopTimer === true) {
            clearInterval(timer);
            stopTimer = false;
            console.log("Break");
        }
    }, 1000);
}


//Change color when select a radio
function addRadioListener() {
    const items = document.querySelectorAll('.question-item');

    items.forEach(item => {
        item.addEventListener('click', () => {
            if (answered === true) return;

            const radio = item.querySelector('input[type="radio"]');
            radio.checked = true;
            items.forEach(i => i.style.backgroundColor = 'rgb(232, 234, 233)');
            item.style.backgroundColor = "hsla(200, 100%, 50%, 1.00)";
        });
    });
}

//Disable radio buttons
function disableRadioButtons() {
    const radios = document.querySelectorAll('.question-item input[type="radio"]');
    radios.forEach(radio => {
        radio.disabled = true
    });
}


//submit btn listener
function onSubmitBtnClikced(event) {
    event.preventDefault();

    disableRadioButtons();

    //Get selected radio
    const selectedRadio = document.querySelector('input[name="question"]:checked');

    //Check if empty
    if (!selectedRadio) {
        alert("Please select an answer");
        return;
    }

    //Get question id
    const questionId = this.value

    //Find the correct question id
    let question = questions.find(q => q.questionId == questionId);

    //check if question is valid
    if (!question) {
        alert("Unable to fetch question");
        return;
    }
    stopTimer = true;
    answered = true;

    //Check if question is correct
    const feedbackText = document.getElementById('feedback')

    if (question.checkAnswer(selectedRadio.value)) {
        question.isCorrect = true

        //Show feedback
        feedbackText.textContent = "Correct";
        feedbackText.style.color = "hsla(123, 100%, 36%, 1.00)";
        feedbackText.style.display = 'block';
        selectedRadio.parentElement.style.backgroundColor = "hsla(123, 60%, 64%, 1.00)";
    } else {
        feedbackText.textContent = "Incorrect";
        feedbackText.style.color = "hsla(0, 68%, 49%, 1.00)";
        feedbackText.style.display = 'block';
        selectedRadio.parentElement.style.backgroundColor = "hsla(0, 71%, 61%, 1.00)";
        selectedRadio.parentElement.style.color = 'white';

        //Highlight the correct answer
        const correctAnswer = question.getCorrectAnswer();
        document.querySelectorAll('.question-item input[type="radio"]').forEach(function (element, index) {
            if (element.value === correctAnswer) {
                console.log(element);
                element.parentElement.style.backgroundColor = "hsla(123, 60%, 64%, 1.00)";
            }
        });
    }
    question.isCompleted = true
    this.style.margin = ".5em 0em";
    this.style.backgroundColor = "hsla(200, 100%, 50%, 1.00)";
    this.style.color = "hsla(0, 0%, 100%, 1.00)";
    this.textContent = "Next Question";
    this.removeEventListener('click', onSubmitBtnClikced);

    this.addEventListener('click', nextQuestion);
}
