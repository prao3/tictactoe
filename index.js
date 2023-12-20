// Making a tictactoe board
const board = new Board;
// Integer representing if computer plays first or if player plays first
// Set to 0 if the player goes first, otherwise set to 1 for computer first
const firstTurn = 0;
// Computer turn, for solver
// This is confusing, should probably fix this
const solverTurn = firstTurn == 0 ? 2 : 1;

// Tictactoe grid
const tttBoard = document.getElementById('board');
// Tictactoe buttons
const tttButtons = tttBoard.children;

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
        if (turn == firstTurn && !board.isFilled() && board.move(row, col)) {
            // Set button text
            button.textContent = turn == 0 ? "X" : "O";

            // If this board is now filled, stop
            if (board.isFilled()) {
                return;
            }
            // Updating turn
            turn = board.numMoves % board.players.length;
            // Calculate computer move
            const solver = new Solver(solverTurn);
            const computerMove = solver.nextMove(board);
            // Making move on board
            board.move(computerMove[0], computerMove[1]);
            // Updating buttons
            const moveId = computerMove[0] + ", " + computerMove[1];
            const targetButton = document.getElementById(moveId);
            targetButton.textContent = turn == 0 ? "X" : "O";
        }
    }
}

