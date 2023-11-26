let wrongTries = 0;
let score = 0;
let actives = [];
let wrongTriesElement = document.querySelector(".wrong-tries span");
wrongTriesElement.innerHTML = wrongTries;
let name = document.querySelector(".name span");
let imgParent = document.querySelector(".main .container");
let imagesObj = {
  "img-1": "./images/img-1.png",
  "img-2": "./images/img-2.png",
  "img-3": "./images/img-3.png",
  "img-4": "./images/img-4.png",
  "img-5": "./images/img-5.png",
  "img-6": "./images/img-6.png",
  "img-7": "./images/img-7.png",
  "img-8": "./images/img-8.png",
  "img-9": "./images/img-9.png",
  "img-10": "./images/img-10.png",
};
let imagesArray = Object.keys(imagesObj).concat(Object.keys(imagesObj));
let imgElement;
let correctSound = new Audio('./sounds/correct.mp3');
correctSound.preload = 'auto';
let wrongSound = new Audio('./sounds/wrong.mp3');
wrongSound.preload = 'auto';

 // to resort the images.
function resorting() {
  imagesArray.sort((a, b) => 0.5 - Math.random());
  imagesArray.forEach((img) => {
    let imgElement = document.createElement("div");
    imgElement.className = "img";
    imgElement.setAttribute("name", img);
    let theImage = document.createElement("img");
    theImage.className = "theImage";
    theImage.src = imagesObj[img];
    imgElement.appendChild(theImage);
    let anonymosElement = document.createElement("img");
    anonymosElement.className = "anonymos";
    anonymosElement.src = "./images/question-mark.png";
    imgElement.appendChild(anonymosElement);
    imgParent.appendChild(imgElement);
  });
  imgElement = document.querySelectorAll(".main .img");
  return imgElement;
}
// show the popup when the game start.
popup();
// the action when the image clicked.
function imgclicked(img) {
  if (!img.classList.contains("active")) {
    actives.push(img.getAttribute("name"));
    img.classList.add("active");
  }
  if (actives.length === 2) {
    if (actives[0] === actives[1]) {
      correctSound.play()
      score++;
    } else {
      wrongSound.play();
      wrongTries++;
      imgElement.forEach((img) => {
        actives.forEach((a) =>
          a === img.getAttribute("name")
            ? setTimeout(() => img.classList.remove("active"), 500): ""
        );
      });
    }
    actives = [];
    wrongTriesElement.innerHTML = wrongTries;
  }
  score === 10 ? onWining() : '';
}

// the popup element when the game start
function popup() {
  let popup = document.createElement("div");
  popup.className = "popup";
  let popupH = document.createElement("h1");
  popupH.className = "popupH";
  popupH.innerHTML = "Memory Game";
  popup.appendChild(popupH);
  let inputName = document.createElement("input");
  inputName.className = "inputName";
  inputName.type = "text";
  inputName.placeholder = "Your Name";
  inputName.maxLength = '8';
  popup.appendChild(inputName);
  let btn = document.createElement("button");
  btn.type = "button";
  btn.className = "popupBtn";
  btn.innerHTML = "Start";
  popup.appendChild(btn);
  document.body.appendChild(popup);
  btn.onclick = popupBtnAction;
}

// the popup when the game end
function onWining() {
  let popup = document.createElement("div");
  popup.className = "popup";
  let popupH = document.createElement("h1");
  popupH.className = "popupH";
  popupH.innerHTML = "Memory Game";
  popup.appendChild(popupH);
  let result = document.createElement("p");
  result.className = "result";
  result.innerHTML = `${
    wrongTries <= 3
      ? "Exellent"
      : wrongTries <= 5
      ? "Very Good"
      : wrongTries <= 10
      ? "Good"
      : "Bad"
  } The Wrong Tries is: ${wrongTries}`;
  popup.appendChild(result);
  let inputName = document.createElement("input");
  inputName.className = "inputName";
  inputName.type = "text";
  inputName.maxLength = '8';
  inputName.placeholder = "Your Name";
  popup.appendChild(inputName);
  let changeName = document.createElement("button");
  changeName.type = "button";
  changeName.className = "popupBtn";
  changeName.innerHTML = "Change Name";
  popup.appendChild(changeName);
  let goNext = document.createElement("button");
  goNext.type = "button";
  goNext.className = "popupNext";
  goNext.innerHTML = "Next";
  popup.appendChild(goNext);
  document.body.appendChild(popup);
  // action for buttons.
  goNext.onclick = goNextAction;
  changeName.onclick = popupBtnAction;
}

// to start new game
function goNextAction() {
  imgParent.innerHTML = "";
  imgElement = resorting();
  document.querySelector(".popup").remove();
  wrongTries = 0;
  wrongTriesElement.innerHTML = wrongTries;
  score = 0;
  actives = [];
  imgElement.forEach((img) => {
    setTimeout(() => {
      img.classList.add("active");
      setTimeout(() => {
        img.classList.remove("active");
      }, 2000);
    }, 500);
  });
  imgElement.forEach((img) => {
    img.onclick = () => imgclicked(img);
  });
}

// the popup button action will change the name and start new game.
function popupBtnAction() {
  if (score === 10) {
    imgParent.innerHTML = "";
  }
  imgElement = resorting();
  name.innerHTML = document.querySelector(".popup .inputName").value;
  document.querySelector(".popup").remove();
  wrongTries = 0;
  wrongTriesElement.innerHTML = wrongTries;
  score = 0;
  actives = [];
  imgElement.forEach((img) => {
    setTimeout(() => {
      img.classList.add("active");
      setTimeout(() => {
        img.classList.remove("active");
      }, 2000);
    }, 500);
  });
  imgElement.forEach((img) => {
    img.onclick = () => imgclicked(img);
  });
}
