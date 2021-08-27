/*
To Do
    - How to target the clicked cell once it has been clicked
        Why isn't the function working?
        potentially rework the function for the clicked cell
    - Commit work and save it to github
*/

//display whose turn it is
// const statusDisplay = document.querySelector(".game-status");

//check if the game is still going on
let gameActive = true

//an array with chosen boxes
let gameState = ["", "", "", "", "", "", "", "", ""];

//let the game know whose turn it is
let players = {
    computer: "",
    human: "",
    turn: this.computer
}
let currentPlayer = players.turn

//game setup and player assignment
function setup(){   
    if(Math.random(1) > 0.5){
        document.querySelector(".X").innerHTML = `${playerFunction()} is X`;
        document.querySelector(".O").innerHTML = `Computer is O`;
        players.computer = "O"
        players.human = "X"
    } else{
        document.querySelector(".O").innerHTML = `${playerFunction()} is O`;
        document.querySelector(".X").innerHTML = `Computer is X`;
        players.computer = "X"
        players.human = "O"
    }
}

//document.querySelector(".O").innerHTML = `Computer is O`;

// game messages for win/draw and current player
// function winningMessage(){`${currentPlayer} has won!`};
// function drawMessage(){`Game ended in a draw!`};
// function currentPlayerTurn(){`It's ${currentPlayer}'s turn`};
// console.log(currentPlayerTurn())

// display the game messages
// statusDisplay.innerHTML = currentPlayerTurn();

// enter name and have it displayed

function playerFunction(){
    let playerName = document.getElementById("name-input").value;
    return playerName;
}


const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function handleCellPlayed() {
    gameState[clickedCellIndex] = currentPlayer
    clickedCell.innerHTML = currentPlayer
}

function handlePlayerChange() {
    if(currentPlayer === "X"){
        currentPlayer = "O"
    } else{currentPlayer = "X"}
    statusDisplay.innerHTML = currentPlayerTurn()
}


function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i < 8; i++){
        const winCondition = winningConditions[i]
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if(a === "" || b === "" || c === ""){
            continue
        }
        if(a === b && b === c){
            roundWon = true;
            break
        }
    }
    if(roundWon){
        //statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return
    }
    let roundDraw = !gameState.includes("");
    if(roundDraw){
        //statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}


//handle player turn
function handleCellClick(clickedCellEvent){
    console.log(clickedCellEvent)
    const clickedCell = clickedCellEvent.target
    const clickedCellIndex = parseInt(clickedCell.getAttribute('cell-index'))
    console.log(typeof clickedCellIndex)
    // if(gameState[clickedCellIndex] !== "" || !gameActive){
    //     return;
    // }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick))

//start the game over without having to reset the browser
/*
function handleRestartGame() {
    gameActive = true;
    currentPlayer = computer;
    gameState = ["","","","","","","","",""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "")
}
*/

//add event listeners to game cells and restart button

//document.querySelector('.game-restart').addEventListener('click', handleRestartGame)