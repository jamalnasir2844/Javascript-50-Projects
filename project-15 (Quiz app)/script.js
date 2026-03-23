const optionInputs = document.querySelectorAll(".options")
const questions = [{
    'que' : 'which of the following is markup language?',
    'a' : 'HTML',
    'b': 'CSS',
    'c' : 'Js',
    'd' : 'None',
    'correct' : 'a'
},{
    'que' : 'when was firsrt js lanched?',
    'a' : '1949',
    'b': '1995',
    'c' : '1943',
    'd' : '233',
    'correct' : 'b'
},{
    'que' : 'what does js stand for?',
    'a' : 'Java Script',
    'b': 'JavaScript',
    'c' : 'Java Style',
    'd' : 'None',
    'correct' : 'b'
},{
    'que' : 'what does console.loh do?',
    'a' : 'alert',
    'b': 'display ',
    'c' : 'print',
    'd' : 'both b and c',
    'correct' : 'd'
}
]

let index = 0;
let total = questions.length;
let right = 0, wrong = 0;
const quesBox = document.getElementById("quesBox")

const loadQuestion = ()=>{
    if(index === total ){
       return endQuiz()
    }
    reset();

    const data = questions[index];
    
    quesBox.innerText = `${index+1}) ${data.que }`;
    optionInputs[0].nextElementSibling.innerText = data.a;
    optionInputs[1].nextElementSibling.innerText = data.b;
    optionInputs[2].nextElementSibling.innerText = data.c;
    optionInputs[3].nextElementSibling.innerText = data.d;

}
const submitQuiz = () =>{
    const data = questions[index];
    const ans = getAnswer();
    if(ans === data.correct){
        right++;
    } else {
        wrong++;
    }
    index++;
    loadQuestion();
    return ;
}

const getAnswer = () =>{
    let answer ;
    optionInputs.forEach((input) => {
        if(input.checked){
           answer =  input.value;
        }      
    })
    return answer;
}

const reset= ()=>{
     optionInputs.forEach((input) => {
        input.checked = false;
     });
}

// const endQuiz = () =>{
//     document.getElementById("box").innerHTML = `
//     <div style="text-align:center">
//     <h3> Thank you for playing the quiz </h3>
//     <h2> ${right} / ${total} are correct </h2>
//     </div>`
// }

const endQuiz = () =>{
    document.getElementById("box").innerHTML =
    `<div style="text-align:center">
    <h3 style="color: blue;"> Thank you for playing the quiz </h3>
    <h2 style="color: green;"> ${right} / ${total} are correct </h2>
    ${right >= 3 ? `<h3 style="color: green;"> Excellent! You are a quiz master! </h3>` : `<h3 style="color: red;"> Better luck next time! </h3>`}
    </div>`
    box.style.height = "300px";
    box.style.fontSize = "32px";
    body.style.backgroundColor = "lightyellow";
    document.getElementById("body")
    body.style.background = "linear-gradient(134deg,#281C59, #4E8D9C, #85C79A,#EDF7BD)";
}

loadQuestion();
