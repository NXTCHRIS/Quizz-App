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
                    document.querySelector(".app-title").innerHTML = `Your score is ${score}/${data.results.length}`
                    document.querySelector(".app-title").style.border = "none";
                    const refreshButton = document.createElement("button");
                    refreshButton.innerHTML = "Restart Game";
                    refreshButton.classList.toggle("next-button")
                    document.querySelector(".app").appendChild(refreshButton);
                    refreshButton.addEventListener('click', () => {
                        window.location.reload();
                    })
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
                        score++
                        event.target.classList.toggle("correct");
                        const disabledB = buttonList.childNodes;
                        disabledB.forEach(btn => {
                            if(btn.classList.contains("correct")) {
                                btn.disabled = true;
                            } else {
                                btn.disabled = true;
                                btn.classList.toggle("rest")
                                console.log(1)
                            }
                        })
                    } else if (event.target.innerHTML !== correct & event.target.className === "btn") {
                        event.target.classList.toggle("wrong");
                        const disabledB = buttonList.childNodes;
                        disabledB.forEach(btn => {
                            if(btn.classList.contains("wrong")) {
                                btn.disabled = true;
                            } else {
                                btn.disabled = true;
                                btn.classList.toggle("rest")
                                console.log(1)
                            }
                        })
                    }
                    }
                
            })
            
            startQuiz();
            showQuestion();
            showAnswers();
    }
    getQuizData()
})
