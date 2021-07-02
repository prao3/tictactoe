/*
Some rules:
If we are playing a 5x5 game of tic tac toe, players need 5 in a row
*/

let height = 500;
let width = 500;
let boardSize;
let tileSize;

//The number of cells for this game; for example, default game has 3 side cells
let sideCells;

let players;
let computerTurn;
let playerTurn;

let board;
let solver;

function setup(){
  boardSize = min(width, height);
  sideCells = 3;
  tileSize = boardSize / sideCells;
  players = [1, 2];
  numMoves = 0;
  //If computerTurn is 1, the computer goes first
  //Otherwise, it should be 2
  computerTurn = 1;
  playerTurn = [2, 1][computerTurn - 1];

  //Instantiating a solver
  solver = new Solver(computerTurn);

  //Creating a new board
  board = new Board(sideCells);

  createCanvas(width, height);
  background(255);
}

function draw(){
  background(255);
  //Only play a move if the position isn't filled up and the player hasn't won yet
  if(!board.isFilled() && !board.isWin(playerTurn)){
    //If it's the computer's turn...
    if(board.getTurns() % players.length === computerTurn - 1){
      //Play some random move
      coordinates = solver.nextMove(board);
      board.move(coordinates[0], coordinates[1]);
    }
    //Otherwise, it's our turn
    else{
      //We really just wait for player input, so nothing happens here
    }
  }
  drawBoard(board);
  //Checking if someone has one or if the position is a tie
  if(board.isWin(playerTurn)){
    noLoop();
    console.log("Player wins!");
  }
  else if(board.isWin(computerTurn)){
    noLoop();
    console.log("Computer wins!")
  }
  else if(board.isFilled()){
    noLoop();
    console.log("Tie!");
  }
}

function mousePressed(){
  let turn = board.getTurns() + 1 % players.length;
  let x = Math.floor(mouseX / tileSize);
  let y = Math.floor(mouseY / tileSize);
  let inBound = x >= 0 && y >= 0 && x < sideCells && y < sideCells;
  //If it's our turn and we can put a mark in the selected square, mark it
  if(inBound && board.getPosition()[x][y] === 0 && turn != computerTurn){
    //position[x][y] = players[turn];
    //numMoves++;
    board.move(x, y);
  }
}

/*
A function that draws a given position
*/
function drawBoard(board){
  //Drawing the lines on the board
  drawLines();
  textSize(tileSize / 2);
  textAlign(CENTER, CENTER);
  let pos = board.getPosition();
  //Looping through the array to figure out where to draw an X or an O
  for(let i = 0; i < pos.length; i++){
    for(let j = 0; j < pos[i].length; j++){
      //Drawing an X if there is at 1 at i, j
      if(pos[i][j] === 1){
        text("X", i * tileSize + tileSize / 2, j * tileSize + tileSize / 2)
      }
      //Drawing an O if there is a 2 at i, j
      else if(pos[i][j] === 2){
        text("O", i * tileSize + tileSize / 2, j * tileSize + tileSize / 2)
      }//Otherwise, don't draw anything
    }
  }
}

/*
A function to draw the lines of a tic tac toe board
*/
function drawLines(){
  //Note: drawing both verticle and horizontal lines could be handled in one loop
  //This isn't a big deal as long as the number of cells is small
  //Drawing verticle lines
  for(let i = 1; i < sideCells; i++){
    line(i * tileSize, 0, i * tileSize, boardSize);
  }
  //Drawing horizontal lines
  for(let i = 1; i < sideCells; i++){
    line(0, i * tileSize, boardSize, i * tileSize);
  }
}
