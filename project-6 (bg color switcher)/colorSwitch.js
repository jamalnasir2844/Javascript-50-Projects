let Btn =  document.getElementById("btn")
let body =  document.getElementById("body")
Btn.addEventListener("click" , ()=>{
    if(    body.style.backgroundColor === "white"){
            body.style.backgroundColor = "black"
    }else{
            body.style.backgroundColor = "white"
    }

})