function makeGrid(rows, columns) {
  const gridContainer = document.getElementById("grid-container");
  let cellHeight = 100 / rows;
  let gridCellClass;
  let wrapperRule = "#board.wrapper {" +
      "display: inline-block;" +
      "position: relative;";
  let wrapperAfterRule = "#board.wrapper:after {" +
      "display: block;";
  if (rows >= columns){
    gridCellClass = "horizontal";
    wrapperRule += `height: 100%; max-height: ${rows/columns * 50}vw;aspect-ratio: ${columns}/${rows};}`;
  }else{
    gridCellClass = "vertical";
    wrapperRule += `width: 100%; max-width: ${columns/rows * 60}vh;}`;
    wrapperAfterRule += `padding-top: ${rows/columns*100}%;content: '';}`;
    document.styleSheets[0].insertRule(wrapperAfterRule, 4);
  }
  console.log(wrapperRule);
  document.styleSheets[0].insertRule(wrapperRule, 0);
  for (let i = 0; i < columns; i++) {
    let gridColumn = document.createElement("div");

    gridColumn.classList.add("grid-column");
    gridColumn.id = "row_" + i;

    for (let j = 0; j < rows; j++) {
      let gridCellSpace = document.createElement("div");
      gridCellSpace.style.height = `${cellHeight}%`;
      gridCellSpace.classList.add("grid-cell-space");
      let gridCell = document.createElement("div");
      gridCell.classList.add("grid-cell");
      gridCell.classList.add(gridCellClass);
      gridCellSpace.appendChild(gridCell);
      gridColumn.appendChild(gridCellSpace);
    }
    gridColumn.addEventListener("click", function () {
      let row = gridColumn.querySelectorAll(':scope > .grid-cell-space > :not(div[class$="clicked"])')
      if (!gameOver && row.length > 0) {
        let x = row.length - 1;
        let y = parseInt(gridColumn.id.split("_")[1]);
        row[x].classList.toggle((first_playing ? "one" : "two")+"_clicked");
        board_state[y][x] = first_playing ? "one" : "two";
        if (connectingFour(x, y, first_playing ? "one" : "two")) endgame();
        else changeTurn();
      }
    })

    gridContainer.appendChild(gridColumn);
  }
}
function connectingFour(x, y, player){
  let i, j;

  let horiCount = 1; i = y-1;
  //Check for connect on the horizontal line
  while(i >= 0 && board_state[i][x] === player){
    console.log(i);
    horiCount += 1;
    i -= 1;
  } i = y+1;
  while(i < board_state.length && board_state[i][x] === player){
    horiCount += 1;
    i += 1;
  }if (horiCount > 3) return true;

  //Check for connect on the vertical line
  let vertCount = 1; j = x-1;
  while(j >= 0 && board_state[y][j] === player){
    vertCount += 1;
    j -= 1;
  } j = x+1;
  while(j < board_state[0].length && board_state[y][j] === player){
    vertCount += 1;
    j += 1;
  }if (vertCount > 3) return true;

  //Check for connect on the \ diagonal
  let leftDiagCount = 1; i = y-1; j = x-1;
  while(i >= 0 && j >= 0 && board_state[i][j] === player){
    leftDiagCount += 1;
    i -= 1; j -= 1;
  } i = y+1; j = x+1;
  while(i < board_state.length && j < board_state[0].length && board_state[i][j] === player){
    leftDiagCount += 1;
    i += 1; j += 1;
  }if (leftDiagCount > 3) return true;

  //Check for connect on the / diagonal
  let rightDiagCount = 1; i = y-1; j = x+1;
  while(i >= 0 && j < board_state[0].length && board_state[i][j] === player){
    rightDiagCount += 1;
    i -= 1; j += 1;
  } i = y+1; j = x-1;
  while(i < board_state.length && j >= 0 && board_state[i][j] === player){
    rightDiagCount += 1;
    i += 1; j -= 1;
  }return rightDiagCount > 3;
}

function endgame(){
  let popup = document.getElementById("popup");
  popup.style.opacity = "1";
  popup.style.transform = "translate(-50%, -50%)";
  let winner = document.getElementById("winner");
  if (first_playing) {
    winner.innerText = document.getElementById("player1").lastElementChild.innerText + "\nwon !";
  } else {
    winner.innerText = document.getElementById("player2").lastElementChild.innerText + "\nwon !";
  }
  gameOver = true;
  timer_animation.innerHTML = animation_text + "animation-play-state: paused;}";
  clearTimeout(timeout);
}

function changeTurn(){
  let player1 = document.getElementById("player1").firstElementChild;
  let player2 = document.getElementById("player2").firstElementChild;
  player1.classList.toggle("player-selected");
  player2.classList.toggle("player-selected");
  first_playing = !first_playing;

  resetTimer();
}

function resetTimer(){
  let pie = document.getElementById("pie");
  pie.classList.remove("pie");
  void timer_animation.offsetWidth;
  pie.classList.add("pie");
  clearTimeout(timeout);
  timeout = setTimeout(() => {first_playing = !first_playing; endgame();}, time*1000);
}

function reset() {
  board_state = Array.from(Array(columns), () => new Array(rows));
  const regx = new RegExp('\\b(one|two)_clicked\\b', 'g');
  document.getElementById("grid-container")
      .querySelectorAll(':scope > .grid-column > .grid-cell-space > div')
      .forEach(cell =>
          cell.className = cell.className.replace(regx, '')
      );

  let popup = document.getElementById("popup");
  popup.style.opacity = "0";
  popup.style.transform = "translate(-50%, -50%) scale(0.05)";

  let player1 = document.getElementById("player1").firstElementChild.classList;
  let player2 = document.getElementById("player2").firstElementChild.classList;
  switch (playingOrder) {
    case "joueur1":
      first_playing = true;
      break;
    case "joueur2":
      first_playing = false;
      break;
    default:
      first_playing = Math.random() > 0.5;
      break;
  }
  player1.remove("player-selected");
  player2.remove("player-selected");
  (first_playing ? player1 : player2).toggle("player-selected");
  gameOver = false;
  timer_animation.innerHTML = animation_text + "}";
  resetTimer();
}

let gameOver = false;
let first_playing;
let playingOrder;

let time;
let timer_animation;
let animation_text;
let timeout;

let rows;
let columns;
let board_state = {};

window.onload = function () {
  let params = document.location.href.split("?")[1].split('&');
  let data = {};
  for (let i = 0; i < params.length; i++) {
    let tmp = params[i].split("=");
    data[tmp[0]] = tmp[1];
  }

  rows = parseInt(data["taille"].split("%20")[0]);
  columns = parseInt(data["taille"].split("%20")[2]);
  time = parseInt(data["temps"].split("s")[0]);
  let player1 = document.getElementById("player1");
  player1.lastElementChild.innerText = data["joueur1"];
  let player2 = document.getElementById("player2");
  player2.lastElementChild.innerText = data["joueur2"];
  playingOrder = data["debutant"];
  console.log(playingOrder);
  switch (playingOrder) {
    case "joueur1":
      first_playing = true;
      break;
    case "joueur2":
      first_playing = false;
      break;
    default:
      first_playing = Math.random() > 0.5;
      break;
  }
  (first_playing ? player1 : player2).firstElementChild.classList.toggle("player-selected");
  board_state = Array.from(Array(columns), () => new Array(rows));
  makeGrid(rows, columns);

  timer_animation = document.head.appendChild(document.createElement("style"));
  animation_text = ".pie:after {\n" +
      "    position: absolute;\n" +
      "    left: 50%;\n" +
      "    width: 50%;\n" +
      "    height: 100%;\n" +
      "    content: \"\";\n" +
      "    background: white;\n" +
      "    transform-origin: 0 50%;\n" +
      "    animation: pieAfter " + time + "s linear forwards;";
  timer_animation.innerHTML = animation_text + "}";
  timeout = setTimeout(() => {first_playing = !first_playing; endgame();}, time*1000);
}
