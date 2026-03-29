const paragraphs = [
    "The morning sun rose gently over the small village, painting the sky in shades of gold and orange. Birds chirped happily as people began their daily routines, unaware that this day would be different. A young boy named Ayan stepped outside his house, feeling an unusual excitement in the air, as if something important was about to happen.",
    "As Ayan walked toward the nearby field, he noticed a small, glowing object lying in the grass Curious, he picked it up and realized it was a strange stone that shimmered with changing colors The moment he touched it, he felt a warm energy flow through him, and suddenly, the world around him seemed brighter and more alive than ever before",
    "Throughout the day, Ayan discovered that the stone had given him a special ability—the power to understand nature. He could hear the whispers of the wind, the songs of the trees, and even the quiet voices of animals. At first, he was amazed and a little frightened, unsure of what to do with such an incredible gift.",
 "Later, as he wandered deeper into the forest, Ayan heard a faint cry for help. Following the sound, he found a trapped bird struggling beneath fallen branches. Using his new ability, he calmed the bird and carefully freed it. The bird chirped gratefully before flying away, and in that moment, Ayan realized that his gift was meant to help others." ,
 "As the sun set and the sky turned a deep shade of purple, Ayan returned home with a new sense of purpose. He no longer saw the world the same way; everything felt connected and meaningful. Holding the glowing stone close, he smiled, knowing that this was only the beginning of a journey filled with wonder, responsibility, and endless possibilities."  
];

const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const mistakeTag = document.querySelector(".mistake span");
const timeTag = document.querySelector(".time span b");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const tryAgainBtn = document.querySelector("button");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

// Load random paragraph
function randomParagraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";

    paragraphs[randIndex].split("").forEach(char => {
        typingText.innerHTML += `<span>${char}</span>`;
    });

    typingText.querySelectorAll("span")[0].classList.add("active");

    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

// Typing logic
function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    if (charIndex < characters.length && timeLeft > 0) {

        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (typedChar == null) {
            charIndex--;

            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }

            characters[charIndex].classList.remove("correct", "incorrect");

        } else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        characters.forEach(span => span.classList.remove("active"));
        if (characters[charIndex]) {
            characters[charIndex].classList.add("active");
        }

        // Calculate WPM & CPM
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);

        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;
        mistakeTag.innerText = mistakes;

    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

// Timer
function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

// Reset game
function resetGame() {
    randomParagraph();
    clearInterval(timer);

    timeLeft = maxTime;
    charIndex = 0;
    mistakes = 0;
    isTyping = false;

    inpField.value = "";
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = 0;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

// Event listeners
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);

// Initial call
randomParagraph();