"use strict";

const user0el = document.querySelector(".btn--name0");
const user1el = document.querySelector(".btn--name1");
const start = document.querySelector(".btn--start");
const newgame = document.querySelector(".btn--new");
const roll = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const openmodal = document.querySelector(".btn--modal");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closemodal = document.querySelector(".close-modal");

const player0el = document.querySelector(".player--0");
const player1el = document.querySelector(".player--1");

const score0el = document.getElementById("score--0");
const score1el = document.getElementById("score--1");

const curr0el = document.getElementById("current--0");
const curr1el = document.getElementById("current--1");

const name0el = document.getElementById("name--0");
const name1el = document.getElementById("name--1");

const diceel = document.querySelector(".dice");

newgame.classList.add("hidden");
hold.classList.add("hidden");
roll.classList.add("hidden");

// remove later
// start.classList.add("hidden");
// user0el.classList.add("hidden");
// user1el.classList.add("hidden");

let currscore;
let activeplayer;
let playing;
let scores;
// let playing = true;

const init = function () {
  currscore = 0;
  activeplayer = 0;
  playing = true;
  scores = [0, 0];

  player1el.classList.remove("player--winner");
  player0el.classList.remove("player--winner");

  player0el.classList.add("player--active");
  player1el.classList.remove("player--active");

  score0el.textContent = 0;
  score1el.textContent = 0;

  curr0el.textContent = 0;
  curr1el.textContent = 0;

  document.querySelector(".winner--0").textContent = "";
  document.querySelector(".winner--1").textContent = "";

  name0el.style.color = "#333";
  name1el.style.color = "#333";

  score1el.style.color = "rgb(0, 63, 102)";
  score0el.style.color = "rgb(0, 63, 102)";

  diceel.classList.add("hidden");
};
init();

start.addEventListener("click", function () {
  if (!user0el.value || !user1el.value) {
    alert("please enter the player's name !");
  } else {
    name0el.textContent = user0el.value;
    name1el.textContent = user1el.value;
    user0el.classList.add("hidden");
    user1el.classList.add("hidden");
    start.classList.add("hidden");
    // diceel.classList.remove("hidden");
    newgame.classList.remove("hidden");
    hold.classList.remove("hidden");
    roll.classList.remove("hidden");
  }
});

const switchplayer = function () {
  document.querySelector(`#current--${activeplayer}`).textContent = 0;
  currscore = 0;
  activeplayer = activeplayer == 0 ? 1 : 0;
  player1el.classList.toggle("player--active");
  player0el.classList.toggle("player--active");
};

roll.addEventListener("click", function () {
  if (playing) {
    // display a dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    diceel.classList.remove("hidden");
    diceel.src = `dice-${dice}.png`;
    // if one has not come then add currscore to current score
    if (dice !== 1) {
      currscore += dice;
      document.getElementById(
        `current--${activeplayer}`
      ).textContent = currscore;
    } else {
      //if one occurs then switch players
      switchplayer();
    }
  }
});

hold.addEventListener("click", function () {
  if (playing) {
    scores[activeplayer] += currscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    if (scores[activeplayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("player--winner");
      diceel.classList.add("hidden");
      // name0el.style.color = "#eee";
      document.getElementById(`name--${activeplayer}`).style.color = "#eee";
      document.getElementById(`score--${activeplayer}`).style.color =
        "rgba(255,255,255,0.6)";
      // const win = document.querySelector(`.btn--name${activeplayer}`).value;    // getting name of winner
      document.querySelector(`.winner--${activeplayer}`).textContent =
        "You Won 🎉";

      player1el.classList.remove("player--active");
      player0el.classList.remove("player--active");
    }
    switchplayer();
  }
});

newgame.addEventListener("click", init);

document.addEventListener("keydown", function (e) {
  if (e.key == "Shift") {
    location.reload();
  }
  console.log(e);
});

openmodal.addEventListener("click", function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  closemodal.addEventListener("click", function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    }
  });
});

document.addEventListener('contextmenu', event => event.preventDefault());
