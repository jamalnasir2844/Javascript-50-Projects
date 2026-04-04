let button = document.getElementById("btn");
// let  height = document.getElementById("height");
// let  width= document.getElementById("width");


button.addEventListener('click' , calculateBmi)

function calculateBmi() {
  let  height = document.getElementById("height").value;
    let  weight= document.getElementById("weight").value;
    const result = document.getElementById("result");

// if(!height || isNaN || height < 0 ){
//     result.innerText = "Please provide a Valid Height"
// }else if(!weight || isNaN(weight) || weight< 0  ){
//     result.innerText = "Please provide a valid weight"
//     return;
// }
//      or
   if(weight === "" || height === ""){
            document.getElementById("result").innerText = "Please enter both values.";
            return;  // stop function
        }



const  bmii = (weight / ((height * height)/1000));
const bmi =bmii.toFixed(2);
//     const bmii = weight / ((height/100)*(height/100));
//   let  bmi = bmii.toFixed(2);
if(bmi <18.5){
        result.innerText = `under weight ${bmi} `;
        
        
    }else if (bmi >= 18.5  && bmi < 24.9){
        result.innerText = ` Normal weight ${bmi}`;
        
    } else if (bmi>=25 && bmi<29.9){
        result.innerText = `over weight: ${bmi} `;
        
    }  else if (bmi>=30 && bmi<34.9){
        result.innerText = `obesity class1: ${bmi} `;
        
    }  else if (bmi>=35.5 && bmi<39.9){
        result.innerText = `obesity class2: ${bmi} `;
        
    } else{
        result.innerText = `extreme obesity ${bmi}`;
        
    }

}
