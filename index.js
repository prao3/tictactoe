// Making a tictactoe board
let board = new Board;
// Integer representing if computer plays first or if player plays first
// Set to 0 if the player goes first, otherwise set to 1 for computer first
let firstTurn = 1;
// Computer turn, for solver
// This is confusing, should probably fix this
let solverTurn = firstTurn == 0 ? 2 : 1;
// Solver
let solver = new Solver(solverTurn);

// Tictactoe grid
const tttBoard = document.getElementById('board');
// Tictactoe buttons
const tttButtons = tttBoard.children;

// If the computer goes first, do the move
if (firstTurn == 1) {
    // Doing move!
    computerMove(board, solver);
}

// onclick for all buttons
for (let button of tttButtons) {
    button.onclick = () => {
        // Current turn
        let turn = board.numMoves % board.players.length;
        // Button row
        const row = parseInt(button.id[0]);
        // Button column
        const col = parseInt(button.id[3]);
        // Try to play move on the board
        if (turn == firstTurn && !gameEnd(board) && board.move(row, col)) {
            // Set button text
            button.textContent = turn == 0 ? "X" : "O";
            // Doing computer move
            computerMove(board, solver);
        }
    }
}

/*
Calculates and does computer move on board
Only makes a move if the game isn't over
Updates tictactoe buttons
*/
function computerMove(board, solver) {
    // If the game is over, stop
    if (gameEnd(board)) {
        return;
    }
    // Getting turn
    const turn = board.numMoves % board.players.length;
    // Calculate computer move
    const computerMove = solver.nextMove(board);
    // Making move on board
    board.move(computerMove[0], computerMove[1]);
    // Updating buttons
    const moveId = computerMove[0] + ", " + computerMove[1];
    const targetButton = document.getElementById(moveId);
    targetButton.textContent = turn == 0 ? "X" : "O";
}

// Checks if the game is over, returns a boolean
function gameEnd(board) {
    return board.isFilled() || board.isWin(1) || board.isWin(2);
}