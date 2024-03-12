addEventListener("DOMContentLoaded", () => {
    async function getQuizData() {
        const response = await fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple");
        var  data = await response.json()
        console.log(data)

    const question  = document.getElementById('question')
    const nextButton = document.querySelector(".next-button")
    const buttonList = document.getElementById('answers-buttons');
    
    // let buttons = buttonList.childNodes;
    // for(i =0; i < buttons.length;i++) {
    //     for (j =0 ; j < data.results[0].incorrect_answers.length ; j++) {
    //         buttons[i].innerHTML = data.results[0].incorrect_answers[j]
    //         console.log(data.results[0].incorrect_answers[j])
    //     }
    // }
    let currentQuestionIndex = 1;
    let score = 0; 

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.innerHTML = "Next"
        showQuestion();
    }
    function showQuestion () {
        resetState()
        let questionNo = currentQuestionIndex + 1;
        question.innerHTML= questionNo + "." + data.results[currentQuestionIndex].question;
        let incorect = data.results[currentQuestionIndex].incorrect_answers;
        let correct = data.results[currentQuestionIndex].correct_answer;
        let answerList = incorect.concat(correct)
        answerList.sort(() => Math.random() - 0.5)
        console.log(answerList);
        
       answerList.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer
            button.classList.add("btn")
            buttonList.appendChild(button);
        })
        // const buttonCorrect = document.createElement("button");
        //     buttonCorrect.innerHTML = data.results[currentQuestionIndex].correct_answer
        //     buttonCorrect.classList.add("btn")
        //     buttonList.appendChild(buttonCorrect); 
    }

    function resetState() {
        nextButton.style.display = "none"
        while(buttonList.firstChild) {
            buttonList.removeChild(buttonList.firstChild);
        }
    }
    

    startQuiz();
    showQuestion();
}
    getQuizData();
})
