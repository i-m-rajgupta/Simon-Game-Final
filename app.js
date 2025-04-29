
let redDiv = document.querySelector("#red");
let greenDiv = document.querySelector("#green");
let yellowDiv = document.querySelector("#yellow");
let blueDiv = document.querySelector("#blue");

let level = document.querySelector(".level");
let levelNum = 0;
let gameMemory = [];
let userMemory =[];

let isStarted = false;
let color;

const Sound1 = new Audio("Click1.wav");
Sound1.load();
const Sound2 = new Audio("Click2.wav");
Sound2.load();

const input = document.getElementById('hidden-input');
function isMobileOrTablet() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);  
}

if(!isMobileOrTablet()){
    console.log("detected");
    let button = document.querySelector("#level-div");
    level.innerHTML = "Tap here to Start";
    button.addEventListener("click",()=>{
      startGame();
    });
}
input.focus();

 input.addEventListener('input', (e) => {
      if (input.value.length > 0) {
       startGame();
      }
    });     
function startGame() {
    if(isStarted == false){
        levelUp();
        isStarted = true;
      input.blur();         // Remove focus
      input.style.display = "none";
     } 
    }

let body = document.querySelector("body");
function levelUp(){
    levelNum++;
    userMemory =[];
    level.innerHTML = `Level : ${levelNum}`;
    generateColor();
}

function generateColor(){
   let num1 = Math.floor(Math.random()*4);
   switch(num1) {
       case 0 :
       color = "red";
       break;
       case 1 :
       color = "green";
       break;
       case 2 :
       color = "yellow";
       break;
       case 3 :
       color = "blue";
       break;
       default : 
       color = "red";
      }
      blink(color);
      gameMemory.push(color); 
    //   console.log(color);
}

function blink(color){
    Sound1.currentTime = 0;
    Sound1.play();
    
    let div = document.getElementById(color);
    void div.offsetWidth;
    div.classList.add("blink");

    const animationDuration = 0.1; // seconds
    const animationDelay = 0.1;     // seconds
    const iterationCount = 2;
    const totalTime = (animationDelay + animationDuration) * iterationCount * 1000;
    setTimeout(()=>{
        div.classList.remove("blink");
      },totalTime);
}


function changeDisplay(){
    setTimeout(()=>{
        body.style.backgroundColor = "grey";
    },1000);
    level.innerHTML = `Your Score : ${levelNum}`;
}
function blink2(color){
    Sound2.currentTime = 0;
    Sound2.play();

    let div = document.getElementById(color);
    div.classList.add("blink");
    div.addEventListener('animationend', () => {
            div.classList.remove("blink");
        }, { once: true });

    let body = document.querySelector("body");
    body.style.backgroundColor = "red";
    changeDisplay();
}
function checkAns(color,idx){
    console.log(userMemory);
    console.log(gameMemory);

    if(userMemory[idx] === gameMemory[idx]){
            blink(color);
      if(userMemory.length == gameMemory.length){
        setTimeout(()=>{
            levelUp();
        },1000);
      }
    } else {
        blink2(color); 
        setTimeout(()=>{
            window.location = "index.html";
        },1000);  
    }
}

let divList = document.querySelectorAll(".container div");
for(let div of divList ){
div.addEventListener("click",function(event){
   let btn = event.target;
   let userColor = btn.getAttribute("id");
     userMemory.push(userColor);
     checkAns(userColor,userMemory.length-1);
})};

