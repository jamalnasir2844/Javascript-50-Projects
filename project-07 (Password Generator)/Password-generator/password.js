// let passBox = document.getElementsByClassName("passBox");
let passBox = document.getElementById("passBox")
let inputSlider = document.getElementsByClassName("inputSlider");
let sliderValue = document.getElementById("sliderValue");
// let genBtn = document.getElementsByClassName("genBtn");
let lowercase = document.getElementsById("lowercase");
let genBtn = document.getElementsById("genBtn");
let uppercase = document.getElementsById("uppercase");
let Numbers = document.getElementsById("Numbers");
let Symbols = document.getElementsById("Symbols");


//      Showing input Slider Value
sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener('input', ()=>{
        sliderValue.textContent = inputSlider.value;
})

genBtn.addEventListener('click' , ()=>{
    passBox.value = generatePassword();
})

let upperChars = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";
let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let allNumbers = "0123456789"
let symbols = "!@#$%^&*";

// function to generate Password 
function generatePassword(){
    let genPassword = "";
    let allChars = "";

    allChars += lowercase.checked ? lowerChars : "";
    allChars += uppercase.checked ? lowerChars : "";
    allChars += Numbers.checked ? lowerChars : "";
    allChars += Symbols.checked ? lowerChars : "";

  if(allChars == "" || allChars.length == 0){
    return genPassword
  }  


let i = 1;
while(i<inputSlider.value){
    genPassword = allChars.charAt (Math.floor(Math.random() * allChars.length)); i++;
}
    return  genPassword;

    
}