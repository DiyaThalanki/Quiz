const questions=[
    {
        question:"Which country has the highest life expextancy?",
        answers:[
            {text:"Switzerland", correct:false},
            {text:"Turkey", correct:false},
            {text:"Canada", correct:false},
            {text:"Hong Kong", correct:true},
        ]
    },
    {
        question:"Who was the Ancient Greek God of the Sun?",
        answers:[
            {text:"Zues", correct:false},
            {text:"Apollo", correct:true},
            {text:"Ares", correct:false},
            {text:"Hades", correct:false},
        ]
    },
    {
        question:"How many bones do we have in an ear?",
        answers:[
            {text:"1", correct:false},
            {text:"2", correct:false},
            {text:"3", correct:true},
            {text:"0", correct:false},
        ]
    },
    {
        question:"What company was initially known as 'Blue Ribbon Sports'? ",
        answers:[
            {text:"Addidas", correct:false},
            {text:"Under Armour", correct:false},
            {text:"Puma", correct:false},
            {text:"Nike", correct:true},
        ]
    },
    {
        question:"Which planet in the Milky Way is the hottest? ",
        answers:[
            {text:"Saturn", correct:false},
            {text:"Venus", correct:true},
            {text:"Mercuary", correct:false},
            {text:"Jupiter", correct:false},
        ]
    },
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer_buttons");
const nextButton=document.getElementById("next");

let currentQuesitonIndex=0;
let score=0;

function startQUiz(){
    currentQuesitonIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuesiton=questions[currentQuesitonIndex];
    let questionNo=currentQuesitonIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuesiton.question;

    currentQuesiton.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("ans_btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}  `;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuesitonIndex++;
    if(currentQuesitonIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuesitonIndex<questions.length){
        handleNextButton();
    }else{
        startQUiz();
    }
})
startQUiz();
