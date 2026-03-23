// const wordTextarea = document.querySelector(".word-counter-container .words")
// const countBtn = document.querySelector(".word-counter-container .count-btn")
// const wordCount = document.querySelector("word-counter-container .word-count span")

const wordTextarea = document.querySelector(" .words")
const countBtn = document.querySelector(" .count-btn")
const wordCount = document.querySelector(" .word-count span")

const countWords = () => {
    let words = wordTextarea.value;
    let wordsTrimmed = words.replace(/\s+/g, " ").trim()
    let splitWords = wordsTrimmed.split(" ");

    console.log(splitWords);
    

    let numberOfWords  = splitWords.length;
    if( splitWords[0] == ""){
        numberOfWords = 0;
    }
    wordCount.innerHTML = numberOfWords;

}
countBtn.addEventListener("click" , countWords);