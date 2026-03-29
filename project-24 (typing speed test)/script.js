const paragraphs = [
    "The morning sun rose gently over the small village, painting the sky in shades of gold and orange. Birds chirped happily as people began their daily routines, unaware that this day would be different. A young boy named Ayan stepped outside his house, feeling an unusual excitement in the air, as if something important was about to happen.",
    "As Ayan walked toward the nearby field, he noticed a small, glowing object lying in the grass Curious, he picked it up and realized it was a strange stone that shimmered with changing colors The moment he touched it, he felt a warm energy flow through him, and suddenly, the world around him seemed brighter and more alive than ever before",
    "Throughout the day, Ayan discovered that the stone had given him a special ability—the power to understand nature. He could hear the whispers of the wind, the songs of the trees, and even the quiet voices of animals. At first, he was amazed and a little frightened, unsure of what to do with such an incredible gift.",
 "Later, as he wandered deeper into the forest, Ayan heard a faint cry for help. Following the sound, he found a trapped bird struggling beneath fallen branches. Using his new ability, he calmed the bird and carefully freed it. The bird chirped gratefully before flying away, and in that moment, Ayan realized that his gift was meant to help others." ,
 "As the sun set and the sky turned a deep shade of purple, Ayan returned home with a new sense of purpose. He no longer saw the world the same way; everything felt connected and meaningful. Holding the glowing stone close, he smiled, knowing that this was only the beginning of a journey filled with wonder, responsibility, and endless possibilities."  
]
const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const mistakeTag = document.querySelector(".mistake span");
const timeTag = document.querySelector(".time span b")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".cpm span")
const tryAgainBtn = document.querySelector("button")

let  timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

// let charIndex =  mistakes = 0;

function randomParagraph(){
    let randIndex = Math.floor(Math.random()* paragraphs.length);
 typingText.innerHTML = "";

    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    })
    typingText.querySelectorAll("span")[0].classList.add("active");
    //  focusing input field on keydown or click event 
    document.addEventListener("keydown", ()=> inpField.focus())
    typingText.addEventListener("click", ()=> inpField.focus())
}
function initTyping(){
    const characters = typingText.querySelectorAll("span");
    let typedCar = inpField.value.split("")[charIndex];
    if(charINdex < characters.length - 1 && timeLeft > 0 ){
            if(!isTyping){  //once timer is start,it won't restart again on every ket clicked
          timer = setInterval(initTimer,1000);
          isTyping = true;
          
    }
  
//   if user hasn't entered any character or pressed backspace 
    if(typedCar == null ){
        charIndex--;        // decrement charIndex
 // decrement mistakes only if the charIndex span contains incorrect class 
        if(   characters[charIndex].classList.contains("incorrect")){
            mistakes--;
        }
        characters[charIndex].classList.remove("correct","incorrect")
    }else{
        if(characters[charIndex].innerText === typedCar){
// if user typed character and shown character matched then add the correct class elseincreame 
// the mistakes and add the incorrect class 
        characters[charIndex].classList.add("correct")
    }else{
        mistakes++;
           characters[charIndex].classList.add("incorrect")
        
    }
    charIndex++;
    }

    
//  increment charIndex either user typed correct or incorrect character  
     characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active")

    let wpm = Math.round((((charINdex - mistakes)/5)/(maxTime - timeLeft)) * 60);
// if wpm value is 0,empty ,ot infinty then setting it 
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    cpmTag.innerText = charINdex - mistakes;
    //  cpm will not count mistakes
    }else{
        inpField.value = "";
        clearInterval(timer);
    }
    }

function initTimer(){
// if timeleft is > than 0 the decrement the timeleft else clear the timer
    if(timeLeft > 0){
        timeLeft--;
      timeTag.innerText =timeLeft ;
    }else{
        clearInterval(timer);
    }
}
function resetGame(){
    // calling loadParagraph function and resetting each variables and elements to default
    randomParagraph();
    timeLeft = maxTime,
    charINdex = mistakes = isTyping = 0;
    timeTag.innerText  = timeLeft;
      mistakeTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    cpmTag.innerText = 0;
    
}

randomParagraph()
inpField.addEventListener("input",initTyping);
tryAgainBtn.addEventListener("click",resetGame);


