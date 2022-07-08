const form = document.querySelector('form');

const main = document.querySelector('main');

form.onsubmit = (event) => {

    event.preventDefault();

    const question = Object.fromEntries(new FormData(form));

    createQuestion(question);

    form.reset();

};

function createQuestionView(question) {

    
    let alternatives = ''
    let id = 0

    for (const alternative of question.alternatives) {
        id ++
        const view = `
        <div class="card-body text-start">
            ${alternative.letter}<input class="form-check-input" type="radio" name= "answer-${question.id}" id="answer-${question.id}-${id}" style="margin-right: 10px; margin-left: 10px">
            <label class="d-inline custom-control-label justificado" for="answer-${question.id}-${id}">${alternative.name}</label>
        </div>`
    alternatives += view
    }
    
    const view = 
    
    `<div class="col mb-3" id="question-${question.id}">
        <div class="question card">
            <div class="card-header fw-bold text-justify justificado">
                <p>${question.id}º) ${question.name}</p>
            </div>

            ${alternatives}
            
            <div class="d-grid gap-2 col-2   mx-auto">
                <button id="resposta" class="btn btn-primary" type="button" style="background-color: #0049FF; margin-top: 20px; margin-bottom: 20px" onclick="clicar('${question.answer}', '${question.id}')">Responder</button>    
            </div>
        </div>
    </div>
    `;

    main.insertAdjacentHTML('beforeend', view);

}


function clicar (answer, id) {
    const selectedalternative = document.querySelector(`#question-${id} input:checked`)


    if (answer === selectedalternative.id.replace(`answer-${id}-`, '')) {
        selectedalternative.parentNode.classList.add('correct-alternative')
    } else {
        selectedalternative.parentNode.classList.add('wrong-alternative')

        const correctAlternative = document.querySelector(`#answer-${id}-${answer}`);

        correctAlternative.parentNode.classList.add('correct-alternative')

    }

};

async function loadQuestions() {

    const url = '/questions';

    const questions = await (await fetch(url)).json();

    for (const question of questions) {
        createQuestionView(question);
    }
}

async function createQuestion(question) {

    const url = '/questions';

    const config = {

        method: 'post',
        body: JSON.stringify(question),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    };

    const newQuestion = await (await fetch(url, config)).json();

    createFoodView(newQuestion);

}

loadQuestions();