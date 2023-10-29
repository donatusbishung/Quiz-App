let quizQuestions = [
    {
        question: 'How many geo-political zones are there in Nigeria',
        options: [
            {txt: 6, correct: true},
            {txt: 5, correct: false},
            {txt: 7, correct: false},
            {txt: 10, correct: false}
        ]
    },

    {
        question: 'Where is Delta state located in Nigeria',
        options: [
            {txt: "South-south", correct: true},
            {txt: "North", correct: false},
            {txt: "North-central", correct: false},
            {txt: "South-east", correct: false}
        ]
    },

    {
        question: 'What is used to style webpages',
        options: [
            {txt: "CSS", correct: true},
            {txt: "JavaScript", correct: false},
            {txt: "Inline-html", correct: false},
            {txt: "CDN", correct: false}
        ]
    },

    {
        question: 'What gives structure to a webpage',
        options: [
            {txt: "CSS", correct: false},
            {txt: "JavaScript", correct: false},
            {txt: "HTML", correct: true},
            {txt: "Boostrap", correct: false}
        ]
    },

    {
        question: 'What is the Most popular element in Html',
        options: [
            {txt: "p", correct: false},
            {txt: "div", correct: true},
            {txt: "article", correct: false},
            {txt: "section", correct: false}
        ]
    }
];

const questionEl = document.getElementById('questions');
const answerEl = document.getElementById('answer-btn');
const buttonEl = document.getElementById('next-btn');

let currentQuestionNo = 0;
let score = 0;

const QuizStart = () => {
    currentQuestionNo = 0;
    score = 0;

    buttonEl.innerHTML = "Next";

    showQuestion();
};

const showQuestion = () => {

    reset();

    let currentQuestion = quizQuestions[currentQuestionNo];
    let questionIndex = currentQuestionNo + 1;
    questionEl.innerHTML = questionIndex + ". " + currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const ans = document.createElement('button');
        ans.innerHTML = option.txt;
        ans.classList.add('btn');
        answerEl.appendChild(ans);

        // checking for the correct option
        if(option.correct){
            ans.dataset.correct = option.correct;
        }
        ans.addEventListener("click", selectAnswer)
    })
};

const reset = () => {
    buttonEl.style.display = "none";
    while(answerEl.firstChild){
        answerEl.removeChild(answerEl.firstChild)
    }
};

// Defining a function to return the correct answer
const selectAnswer = (e) => {
    const btnSelected = e.target;
    const isCorrect = btnSelected.dataset.correct === "true";
    if(isCorrect){
        btnSelected.classList.add("correct");
        score++;
    } else{
        btnSelected.classList.add("incorrect");
    }

    // Allowing for only one selection
    Array.from(answerEl.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })

    buttonEl.style.display = "block";

}

const showScore = () => {
    reset();
    questionEl.innerHTML = `You scored ${score} / ${quizQuestions.length}`;
    buttonEl.innerHTML = 'Restart';
    buttonEl.style.display = 'block';
}

const handleNextBtn = () => {
    currentQuestionNo++;
    if(currentQuestionNo < quizQuestions.length){
        showQuestion();
    }else{
        showScore();
    }
}

buttonEl.addEventListener('click', () =>{
    if(currentQuestionNo < quizQuestions.length){
        handleNextBtn();
    }else{
        QuizStart();
    }
})

QuizStart();