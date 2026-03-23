let  left  = document.querySelector(".left") ;
let  right  = document.querySelector(".right") ;
let  slider = document.querySelector(".slider") ;
let slideNumber = 1;

const images = document.querySelectorAll(".image")
const length = images.length;

const nextSlide = ()=>{
slider.style.transform =  `translateX(-${slideNumber*90}vh)`;
    slideNumber++;
}

const previousSlide = ()=>{
slider.style.transform =  `translateX(-${(slideNumber-2)*90}vh)`;
    slideNumber--;
}


const getFirstSlide = ()=>{
         slider.style.transform =  `translateX(0px)`;
        slideNumber = 1;
}
const getLastSlide = ()=>{
         slider.style.transform =  `translateX(-${(length-1)*90}vh))`;
        slideNumber = length;
}


right.addEventListener('click' , ()=>{
    if(slideNumber < length){
       nextSlide()
        }else{
         getFirstSlide();
        }
})
left.addEventListener('click' , ()=>{
    if(slideNumber > 1){
      previousSlide()
        }else{
         getLastSlide();
        }
})
