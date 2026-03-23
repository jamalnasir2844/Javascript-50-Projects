let hour = document.getElementById('hour');
let minute  = document.getElementById('minute')
let second = document.getElementById("second");

function displayTime(){
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    let hRotation = 30* hh + mm/2 + ss/120;
    let mRotation = 6 * mm + ss/10
    let sRotation = 6 * ss;

    hour.style.transform = `rotate(${hRotation}deg)`
    minute.style.transform = ` rotate(${mRotation}deg)`
    second.style.transform = ` rotate(${sRotation}deg)`
}

setInterval(displayTime,1000)

















// Some calculation 
// 12hr = 360deg
// 1hr = 30deg
// h hr = 30 * h + m/2 s/120

// 1hr = 60min = 30deg
// 1 min = 30/60 = 1/2 = m/2
// m min = m/2 deg
// 1hr = 3600 = 30deg
// 1s = 30/3600 = 1 /120
//  s s = s/120

