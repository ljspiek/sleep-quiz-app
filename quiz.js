// questions & answers
// console.log("quiz.js is connected")
const STORE = {
    view: "start",
    currentQuestion: 0,
    score: 0,
    questionText:"Question Text",
    options: [],
    selectedAnswerIndex: "",
    answerResponse: "In/Correct!",
    displayCorrectAnswer: "",
    quote:"quote..quote",
    quoteAuthor:"author",
}
const questions = [
    {
      text: "What percent of the population is estimated to dream only in black and white?",
      options: [ 
          "50%",
          "33%",
          "12%",
          "5%"
        ],
      indexOfAnswer: 2,
      answerText: "12%",
    },

    {
        text: "Which animal sleeps the most?",
        options: [
            "cat",
            "bat",
            "sloth",
            "human",
        ],
        indexOfAnswer: 1,
        answerText: "bat",
      },

      {
        text: "____ is the state of finding it hard to get out of bed in the morning:",
        options: [
            "Dysania",
            "Slypinia",
            "Tirenea",
            "Whymewah",
        ], 
        indexOfAnswer: 0,
        answerText: "Dysania",
      },

      {
        text: "What is the name of the sensation of falling when half asleep and jerking awake?",
        options: [
            "Hypnic Jerks",
            "Hyper Jerks",
            "Hyper Falls",
            "Hypnic Falls",
        ],
        indexOfAnswer: 0,
        answerText: "Hypnic Jerks",
      },

      {
        text: "What is the record for the longest period without sleep?",
        options: [
            "4 days",
            "8 days",
            "9 days",
            "11 days",
        ],
        indexOfAnswer: 3,
        answerText: "11 days",
      },
]
//startView will default due to STORE values; present user start button to 
const startView = function() {
    return `<div class="logo"><img src=""/></div>
    <h1 class="flex-center flex-column">Sleep Quiz</h1>
</header>
<div class ="background-container">
    <div class="question-container flex-center flex-column">
        <h2 class = "start-quiz hidden">Start Quiz</h2>
        <section class="quote">
            <p class="start-quiz-quote">“When every inch of the world is known, sleep may be the only wilderness that we have left.”<br> – Louise Erdrich</p>
        </section>
        <section class = "introduction question">
            <p class ="start-quiz-intro">Let's see how much you know about the wilderness called sleep!</p>
        </section>
        <form class="js-quiz-questions-form flex-center flex-column">
        <button type="submit" class = "start">Start Quiz!</button>
        </form>
    </div>
</div>  `;
}
//click start to advance to get questions
function startQuiz() {
    $(document).on('click', '.start', function(event){
        event.preventDefault();
        STORE.view = 'question';
        console.log("startQuiz ran");
        console.log(questions[STORE.currentQuestion].answer);
        createQuestion();
        render();
    }
    );
}

//provide options based on current question - loop through questions array
function createAnswerOptions() {
    let question = questions[STORE.currentQuestion].text;
    STORE.options = questions[STORE.currentQuestion].options;
}

//display question based on currentQuestion value
function createQuestion() {
    let question = questions[STORE.currentQuestion].text;
    STORE.questionText = question;
    console.log(question);
    createAnswerOptions();
}

//checks if answer is correct and creates response for answerView
function checkAnswer() {
    $(document).on('click', '.submit', function(event){
        event.preventDefault();
        let selectedAnswer = $('input:checked').val();
        STORE.selectedAnswerIndex = Number(selectedAnswer);
        if (isNaN(STORE.selectedAnswerIndex)) {
            alert("Please select an option. Don't know the answer? Make a guess!")
            return;
        }
        let correctAnswerIndex = questions[STORE.currentQuestion].indexOfAnswer;
        if (STORE.selectedAnswerIndex === correctAnswerIndex) {
            correctAnswer();
         } else {
            wrongAnswer();
            }
        STORE.view = 'answer';
        render();
        });
    
}
//increases score if correct answer
function upScore() {
    STORE.score = STORE.score + 1;
}
//advances quiz 
function advanceQuestion() {
    STORE.currentQuestion = STORE.currentQuestion + 1;
    createAnswerOptions();
}
//if answer is correct
function correctAnswer() {
    STORE.answerResponse = "That's correct!";
    STORE.displayCorrectAnswer = "";
    STORE.quote = "What hath night to do with sleep?";
    STORE.quoteAuthor = "-John Milton";
    upScore();

}
//if answer is incorrect
function wrongAnswer() {
    STORE.answerResponse = "Not quite . . .";
    STORE.displayCorrectAnswer = "The correct answer is: " + " " + questions[STORE.currentQuestion].answerText;
    STORE.quote = "It is a common experience that a problem difficult at night is resolved in the morning after the committee of sleep has worked on it.";
    STORE.quoteAuthor = "– John Steinbeck";
    
}
//next question...
function nextQuestion() {
    $(document).on('click', '.next', function(event){
        event.preventDefault();
        STORE.view = 'question';
        if(STORE.currentQuestion + 1 !== questions.length){
            advanceQuestion();
        }
        else{STORE.view = 'endView'};
        render();
    })
}
function resetStats() {
    STORE.currentQuestion = 0;
    STORE.score = 0;
}
//restart quiz & reset score
function restartQuiz() {
    $(document).on('click', '.restart', function(event){
        event.preventDefault();
        STORE.view = 'start';
        resetStats();
        render();
    })
}

const questionView = function() {
    return `<header><h1 class="flex-center flex-column">Sleep Quiz</h1>
    <section class="score flex-center flex-column">
        <a href= ""><img class="logo" src="" alt = ""/>
        </a>
        <ul class="status-bar">
            <li class = "status-bar question-display">Question: ${STORE.currentQuestion + 1}/${questions.length}</li>
            <li class = "status-bar score-display">Score: ${STORE.score}/${questions.length}</li>
        </ul>
    </section>
    </div>
</header>
<div class = "background-container">
    <div class="question-container flex-center flex-column">
        <h2 class = "questions-quiz hidden">Question 1</h2>
        <form class="js-quiz-questions-form flex-center flex-column">
            <section class = "question-text">
                <p>${questions[STORE.currentQuestion].text}</p>
            </section>
            <section class = "options">
                <label>
                    <input type="radio" name="options" required value= 0 > 
                    ${STORE.options[0]}</label><br>
                <label>
                    <input type="radio" name="options" value= 1 required >
                 ${STORE.options[1]}</label><br>
                <label>
                    <input type="radio" name="options" value= 2 required >
                 ${STORE.options[2]}</label><br>
                <label>
                    <input type="radio" name="options" value= 3 required >
                 ${STORE.options[3]}</label><br>
            </section>
            <br>
            <br>
  <button type="submit" class = "submit">Check My Answer</button>
</form>
</div>
</div>`
}

const answerView = function() {
    return `<header><h1 class="flex-center flex-column">Sleep Quiz</h1>
    <section class="score flex-center flex-column">
       <a href= ""><img class="logo" src="" alt = ""/>
       </a>
       <ul class="status-bar">
           <li class = "status-bar question-display">Question: ${STORE.currentQuestion + 1}/${questions.length}</li>
           <li class = "status-bar score-display">Score: ${STORE.score}/${questions.length}</li>
       </ul>
   </section>
</header>
<div class = "background-container">
   <div class="question-container flex-center flex-column">
       <h2 class = "questions-quiz">${STORE.answerResponse}</h2>
       <form class="js-quiz-questions-form flex-center flex-column">
           <section class = "answer-result">
           <p class = "answer-correct">${STORE.displayCorrectAnswer}</p>
            <p class = "result-quiz-quote">${STORE.quote}<br>${STORE.quoteAuthor}</p>
           </section>
   
           <button type="submit" class = "next">Next Question</button>
       </form>



</div>

</div>
`
}

const endView = function(){
    return `<header>
    <h1 class="flex-center flex-column">Sleep Quiz</h1>
     <section>
        <a href= ""><img class="logo" src="" alt = ""/>
        </a>
        
    </section>
</header>
<div class = "background-container">
    <div class="question-container flex-center flex-column">
        <h2 class = questions-quiz>That's it!</h2>
        <form class="js-quiz-questions-form flex-center flex-column">
            <span class = "final-answer-results">
                <h3 class = "final-status-bar">Your Final Score Is: <br> ${STORE.score}/${questions.length}</h3>
                <p class="end-quiz-quote">“Your future depends on your dreams, so go to sleep.”<br> – Mesut Barazany</p>
            </span>
            <button type="submit" class = "start-over">Start Over</button>
        </form>
    </div>
</div>`
}


const render = function() {
    if (STORE.view === "start") {
        $('header').html(startView());
    }
    else if (STORE.view === "question") {
        let question = questions[STORE.currentQuestion];
        $('header').html(questionView());
    }
    else if (STORE.view === "answer") {
        $('header').html(answerView());
    }
    else if(STORE.view === "endView") {
        $('header').html(endView());
    }
}



$(function(){
    render();
    startQuiz();
    checkAnswer();
    nextQuestion();
    restartQuiz();   
})
