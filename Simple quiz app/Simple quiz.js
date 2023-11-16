const questions = [
    {
        question: "Which is largest animal in the world?",
        answer: [
            {Text: "Shark" , correct: false},
            {Text: "Blue Whale" , correct: true},
            {Text: "Elephant" , correct: false},
            {Text: "Giraffe" , correct: false}
        ]
    },
    {
        question: "Which is Smallest country in the world?",
        answer: [
            {Text: "Vatican City" , correct: true},
            {Text: "Bhutan" , correct: false},
            {Text: "Nepal" , correct: false},
            {Text: "Sri Lanka" , correct: false}
        ]
    },
    {
        question: "Which is largest desert in the world?",
        answer: [
            {Text: "Kalahari" , correct: false},
            {Text: "Gobi" , correct: false},
            {Text: "sahara" , correct: false},
            {Text: "Antarctica" , correct: true}
        ]
    },
    {
        question: "Which is Smallest Continent in the world?",
        answer: [
            {Text: "Asia" , correct: false},
            {Text: "Australia" , correct: true},
            {Text: "Arctic" , correct: false},
            {Text: "Africa" , correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let Score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    Score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}

function showQuestion(){
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionnNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionnNo + "." + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button =document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", SelectAnswer)
    });
}

function resetstate(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function SelectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        Score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display ="block";
}

function showScore(){
    resetstate();
    questionElement.innerHTML = `You Scored ${Score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

 function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

    
    startQuiz();