const quizData = [
    {
        question: 'What sort of story has a plot that relies on human suffering?',
        a: 'Comedy',
        b: 'Tragedy',
        c: 'Romance',
        d: 'Catharsis',
        correct: 'b'
    },
    {
        question: 'What is catharsis?',
        a: 'When the character makes an important discovery.',
        b: 'When the other characters can mourn the loss of the hero.',
        c: 'The moment that begins the chain of events of the plot.',
        d: 'The evocation of pity and fear in the audience.',
        correct: 'd'
    },
    {
        question: 'According to Aristotle, which of the following is essential for a good plot?',
        a: 'Unity of action',
        b: 'Action',
        c: 'Unity of pathos',
        d: 'Pathos',
        correct: 'a'
    },
    {
        question: 'What are 3 elements of an ideal tragedy as described by Aristotle?',
        a: 'mythos, plot, character',
        b: 'thought, diction, character',
        c: 'character, melody, plot',
        d: 'plot, character, thought',
        correct: 'd'
    }
];

const QUESTION = document.getElementById('question');
const answA = document.getElementById('a');
const answB = document.getElementById('b');
const answC = document.getElementById('c');
const answD = document.getElementById('d');
const labelA = document.getElementById('labelA');
const labelB = document.getElementById('labelB');
const labelC = document.getElementById('labelC');
const labelD = document.getElementById('labelD');
const button = document.querySelector('.submit');
const ANSWERS = document.querySelectorAll('.answer');
const CARD = document.querySelector('.card');


let currentQuestion = 0;
let score = 0;


quiz();

function quiz () {
    deselectedAnswers()

    const current = quizData[currentQuestion];
    QUESTION.innerText = current.question;
    labelA.innerText = current.a;
    labelB.innerText = current.b;
    labelC.innerText = current.c;
    labelD.innerText = current.d;
}

function getSelected() {
    let res = undefined
    ANSWERS.forEach(el => {
        if(el.checked) {
            res = el.id
        }
    });
    return res;
}

function deselectedAnswers() {
    ANSWERS.forEach(el => {
        el.checked = false
    });
}

button.addEventListener('click', () => {
    let answerEl = quizData[currentQuestion].correct;

    const myAnswer = getSelected();

    if(myAnswer) {
        if (myAnswer === answerEl) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < 4) {
            quiz();
        } else {
            CARD.innerHTML = `<h3>Score: ${score}/${quizData.length}</h3>`
        }
    }
});