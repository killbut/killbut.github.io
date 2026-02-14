import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import anime from 'https://cdn.skypack.dev/animejs';

const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const imageDisplay = document.getElementById('imageDisplay');
const videoTag = document.getElementById('videoTag');
const sourceGif = document.getElementById("sourceTag");
const valentineQuestion = document.getElementById('valentineQuestion');
const responseButtons = document.getElementById('responseButtons');

let noClickCount = 0;
let buttonHeight = 48;
let buttonWidth = 80;
let fontSize = 20;
const imagePaths = ['./images/nochoise1.webm','./images/nochoise2.webm','./images/nochoise3.webm'];

const getRandomNumber = (num) => {return Math.floor(Math.random() * (num + 1));};
  
  //raunaway button
  const runawayButtonLogic = (button) => {
    const moveButton = function () {
      if (this.textContent.trim() === "Скажи да или...") {
        const top = getRandomNumber(window.innerHeight - this.offsetHeight);
        const left = getRandomNumber(window.innerWidth - this.offsetWidth);
  
        animateMove(this, "top", top).play();
        animateMove(this, "left", left).play();
      }
    };

    button.addEventListener("mouseover", moveButton);
    button.addEventListener("click", moveButton);
  };
  
  const animateMove = (element, prop, pixels) =>
    anime({
      targets: element,
      [prop]: `${pixels}px`,
      easing: "easeOutCirc",
      duration: 500,
    });
  
  //no button
  noButton.addEventListener("click", () => {
    if (noClickCount < 3) {
      sourceGif.src = imagePaths[noClickCount];
      videoTag.load();
      videoTag.play().catch(() => {});
      //yes button gets thicc
      buttonHeight += 35; buttonWidth += 35; fontSize += 25;
      yesButton.style.height = `${buttonHeight}px`;
      yesButton.style.width = `${buttonWidth}px`;
      yesButton.style.fontSize = `${fontSize}px`;
  
      //no button text
      const messages = ["Пожалуйста", "Ты серьезно?", "Подумай еще раз",];

  
noButton.textContent = messages[noClickCount];

      if (noClickCount === 2) {
        noButton.remove();
      }
            noClickCount++;
    }
  });
  
  //yes button
  yesButton.addEventListener("click", () => {
    imageDisplay.hidden = true; 
    responseButtons.style.display = "none"; 
  
    //yes page
    valentineQuestion.innerHTML = `
          <video autoplay loop muted playsinline>
        <source id="imageDisplay" src="./images/finally.webm" type="video/webm">
      </video>

      Поздравляю!<br>
      <span style="font-size: 20px; color: #bd1e59;">Теперь ты моя валентинка! <3</span>
      <br>
      <span style="font-size: 20px; color: #bd1e59;">Увидимся сегодня <3</span>


  <br>
      <span style="font-size: 20px; color: #bd1e59;">  От Андрея 💕</span>
    
    `;
    valentineQuestion.style.textAlign = "center"; 
  
  
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { x: 0.5, y: 0.7 },
      colors: ["#FF5A5F", "#3DCC91", "#FFD1DC"],
    });
  });
  