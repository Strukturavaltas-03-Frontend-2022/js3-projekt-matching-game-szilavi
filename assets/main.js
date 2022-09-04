const images = [
  "assets/images/angel.jpg",
  "assets/images/baloth.jpg",
  "assets/images/firecat.jpg",
  "assets/images/future.jpg",
  "assets/images/reanimator.jpg",
  "assets/images/angel.jpg",
  "assets/images/baloth.jpg",
  "assets/images/firecat.jpg",
  "assets/images/future.jpg",
  "assets/images/reanimator.jpg",
];
const board = document.querySelector(".board");
const counter = document.querySelector(".counter");
const youWinDiv = document.querySelector(".win");
let plusPoint = 0;

function addPoint() {
  plusPoint++
  counter.textContent = plusPoint;
}

//setupolom a boardot

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

shuffle(images); // ezt egy az egyben szedtem le a stackoverflowról

function setUp(cards) {
  for (let i = 0; i < cards.length; i++) {
    const cards = ` <div class="card">
                      <div class="card__face cardback"><img src="assets/images/cardback.jpg" alt=""></div>
                      <div class="card__face cardfront"><img src="${images[i]}" alt=""></div>
                    </div>`;
    board.innerHTML += cards;
  }
}

setUp(images);

// Innen jön a flippelés

const cards = document.querySelectorAll(".card");

cards.forEach((element) => {
  element.addEventListener("click", clickCard);
});

function clickCard(event) {
  const flippedCards = document.querySelectorAll(".card.flippedCard");
  if (flippedCards.length < 2) {

    event.currentTarget.classList.toggle("flippedCard");
    const flipped = document.querySelectorAll(".card.flippedCard");
    if (flipped.length > 1) {
      setTimeout(() => {
        cards.forEach((cards) => {
          cards.classList.remove("flippedCard");
        });
      }, 1000);
      checker();
    }
    if (plusPoint !== 5) {
      startGame = true;
    } else resetTable();
  }
}

//itt lecsekkolom, hogy vajon a két kártya egyezik-e

function checker() {
  const cards = document.querySelectorAll(
    ".card.flippedCard > div.card__face.cardfront > img"
  );
  let first = cards[0].src;
  let second = cards[1].src;
  if (first === second) {
    console.log("pair");
    cards[0].parentElement.parentElement.classList.add("aPair");
    cards[1].parentElement.parentElement.classList.add("aPair");
    addPoint();
  } else console.log("not a pair");
}

//timer

let timer = 0;
let showTime = document.querySelector(".showTime");
let startGame = false;

setInterval(() => {
  if (startGame) {
    timer++;
    showTimer();
  }
}, 1000);

const showTimer = function () {
  let minutes = Math.floor(timer / 60);
  let seconds = timer % 60;
  showTime.textContent =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");
};

function resetTable() {
  startGame = false;
  const youWin = `You win, reseting table, pls wait...`;
  youWinDiv.innerHTML += youWin;
  setTimeout(() => {
    document.location.reload();
  }, 5000);
}

// lehet klikkelni a kártyákra, ha vége a játéknak akkor is, a timert ez be is zavarja, ki kell találn kapcsolni az eventlistenert a kártyákon, ha megtaláltam őket
