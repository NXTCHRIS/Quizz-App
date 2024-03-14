addEventListener("DOMContentLoaded", () => {
    let currentQuestionIndex = 0;
    let score = 0; 
    const question  = document.getElementById('question')
    const nextButton = document.querySelector(".next-button")
    const buttonList = document.getElementById('answers-buttons');
    const questionCounter = document.querySelector(".question-counter")
    const quiz = document.querySelector(".quiz")
    nextButton.style.display = "none"
    async function getQuizData() {
            const response = await fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple");
            const data = await response.json();

            function startQuiz() {
                currentQuestionIndex = 0;
                score = 0;
                nextButton.innerHTML = "Next"
                nextButton.style.display = "block"
                showQuestion();
                showQCounter()
            }
            function showQuestion() {
                resetState()
                let questionNo = currentQuestionIndex + 1;
                question.innerHTML= questionNo + "." + data.results[currentQuestionIndex].question;
        
            }
        
            function showAnswers() {
                let incorect = data.results[currentQuestionIndex].incorrect_answers;
                let correct = data.results[currentQuestionIndex].correct_answer;
                let answerList = incorect.concat(correct)
                answerList.sort(() => Math.random() - 0.5)
                
               answerList.forEach(answer => {
                    const button = document.createElement("button");
                    button.innerHTML = answer
                    button.classList.add("btn")
                    buttonList.appendChild(button);
                })
            }
        
            function resetState() {
                nextButton.style.display = "none"
                while(buttonList.firstChild) {
                    buttonList.removeChild(buttonList.firstChild);
                }
            }
            function showQCounter() {
                    questionCounter.innerHTML = currentQuestionIndex + "/" + data.results.length
            }

            addEventListener("click", (event) => {
                if(event.target = "button" && event.target.className === "btn"){
                    nextButton.style.display = "block"
                }
            })
            nextButton.addEventListener("click",() => {
                currentQuestionIndex++
                if(currentQuestionIndex >= 10) {
                    quiz.style.display = "none"
                }
                showQuestion();
                showAnswers();
                showQCounter();
            })
            addEventListener("click", (event) => {
                    if(event.target = "button") {
                        let correct  = data.results[currentQuestionIndex].correct_answer
                    if(event.target.innerHTML === correct && event.target.className === "btn"){
                        console.log(300)
                        event.target.style.backgroundColor = "green"
                    } else if (event.target.innerHTML !== correct & event.target.className === "btn") {
                        event.target.style.backgroundColor = "red"
                    }
                    }
                
            })
            
            startQuiz();
            showQuestion();
            showAnswers();
            console.log(data)
    }
    getQuizData()
})
