const qr_box = document.querySelector(".qr_box");
const qrInput = qr_box.querySelector(".form input");
const generateBtn = qr_box.querySelector(".form button");
const qrImg = qr_box.querySelector(".qr-code img");

let preValue;

generateBtn.addEventListener("click", () => {

let qrValue = qrInput.value.trim();

if(!qrValue || preValue === qrValue) return;

preValue = qrValue;

generateBtn.innerText = "Generating...";

// Working API
qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}`;

qrImg.addEventListener("load", () => {

qr_box.classList.add("active");
generateBtn.innerText = "Generate QR Code";

});

});

qrInput.addEventListener("keyup", () => {

if(!qrInput.value.trim()){
qr_box.classList.remove("active");
preValue = "";
}

});