var pieces = document.querySelectorAll(".piece");

var d = [
  "left 0px top 0px",
  "left 200px top 0px",
  "left 400px top 0px",
  "left 0px top 200px",
  "left 200px top 200px",
  "left 400px top 200px",
  "left 0px top 400px",
  "left 200px top 400px"
]; //, last one: "left 400px top 400px"

var validMoves = [
  [2, 4],
  [1, 3, 5],
  [2, 6],
  [1, 5, 7],
  [2, 4, 6, 8],
  [3, 5, 9],
  [4, 8],
  [5, 7, 9],
  [6, 8]
];
//var r = Array.from(d);
var emptyBox = 9;
var gameStarted = false;
var moveCount = 0;
var moveSnd = new Audio("res/tap.mp3");
var errSnd = new Audio("res/error.mp3");
var winSnd = new Audio("res/winner.mp3");

document.addEventListener("DOMContentLoaded", reset);

function reset() {
  pieces.forEach((ele, i) => {
    ele.style.backgroundPosition = d[i];
    if (i == 8) ele.style.background = "gray";
    ele.addEventListener("click", function () {
      let elId = Number(this.id.split("x")[1]);
      if (validMoves[emptyBox - 1].includes(elId)) {
        move(this, elId);
        if (gameStarted) {
          moveSnd.play();
          moveCount++;
          if (checkWin()) celebrate();
          document.getElementById("move-count").innerText = "Moves: " + moveCount;
        }
      } else { errSnd.play(); }
    });
  });
  do100Moves(100);
}

function do100Moves(num) {
  for (let i = 0; i < num; i++) {
    let moves = validMoves[emptyBox - 1];
    let randI = moves[Math.floor(Math.random() * moves.length)];
    //console.log(moves, i, emptyBox, randI);
    pieces[randI - 1].click();
  }
  gameStarted = true;
}

function move(el, elId) {
  pieces[emptyBox - 1].style.background =
    'url("https://pbs.twimg.com/profile_images/1439909077111300104/BC-oP9Wk_400x400.jpg")';
  pieces[emptyBox - 1].style.backgroundSize = "300px 300px";
  pieces[emptyBox - 1].style.backgroundPosition = el.style.backgroundPosition;
  el.style.background = "gray";
  emptyBox = elId;
}

function checkWin() {
  for (let i = 0; i < pieces.length - 1; i++) {
    if (pieces[i].style.backgroundPosition != d[i])
      return false;
  }
  return true;
}

function celebrate() {
  pieces[8].style.background =
    'url("https://pbs.twimg.com/profile_images/1439909077111300104/BC-oP9Wk_400x400.jpg")';
  pieces[8].style.backgroundSize = "300px 300px";
  pieces[8].style.backgroundPosition = "left 400px top 400px";
  document.getElementById("msg").innerText = "Well, Done!!!! (Reset to play again)";
  document.getElementById("celebration").style.display = "block";
  winSnd.play();
}