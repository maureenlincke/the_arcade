//display whose turn it is
// const statusDisplay = document.querySelector(".game-status");

//check if the game is still going on
let gameActive = true

//an array with chosen boxes
let gameState = ["", "", "", "", "", "", "", "", ""];

//let the game know whose turn it is
let players = {
    computer: "",
    human: ""
}
let currentPlayer

//game setup and player assignment
function setup(){
    
    //randomly assign the human and computer X or O
    if(Math.random(1) > 0.5){

        //display who is X and O
        document.querySelector(".X").innerHTML = `${playerFunction()} is X`;
        document.querySelector(".O").innerHTML = `Computer is O`;
        
        //assign object values to X and O respectively
        players.computer = "O"
        players.human = "X"

        //assign a random player to be the first random player
        if(Math.random(1) > 0.5){
            currentPlayer = players.computer
        }else{currentPlayer = players.human}
        
        document.querySelector('.game-status').innerHTML = `${currentPlayer} goes first!`
        console.log(currentPlayer)
    } else{
        document.querySelector(".O").innerHTML = `${playerFunction()} is O`;
        document.querySelector(".X").innerHTML = `Computer is X`;
        
        players.computer = "X"
        players.human = "O"
        
        if(Math.random(1) > 0.5){
            currentPlayer = players.computer
        }else{currentPlayer = players.human}
        
        document.querySelector('.game-status').innerHTML = `${currentPlayer} goes first!`
        console.log(currentPlayer)
    }
}

// game messages for win/draw and current player
// function winningMessage(){`${currentPlayer} has won!`};
// function drawMessage(){`Game ended in a draw!`};
// function currentPlayerTurn(){`It's ${currentPlayer}'s turn`};

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

    //have JS handle the computer's turn
    if(currentPlayer === players.computer){
        computerTurn()
    }
}
// const winningConditions = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
// ]
function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i < 8; i++){
        const winCondition = winningConditions[i]
        let a = gameState[winCondition[0]];
        //console.log(winCondition[0])0 3 6 0 1 2 0 2 
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
    const clickedCell = clickedCellEvent.target
    const clickedCellIndex = parseInt(clickedCell.getAttribute('cell-index'))
    console.log(clickedCell)
    if(gameState[clickedCellIndex] !== "" || !gameActive){
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

//handle computer's turn
let gameBoard = document.querySelector('.board')
console.log(gameBoard[0])
function computerTurn(){
    for(let i = 0; i < gameBoard.length; i++){
        //let gameBoardIndex = gameBoard[i]
    }
    //gameState[] = currentPlayer
    clickedCell.innerHTML = currentPlayer
    handleResultValidation()
}

//add event listener to the cells
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick))

//start the game over without having to reset the browser
function handleRestartGame() {
    gameActive = true;
    currentPlayer = computer;
    gameState = ["","","","","","","","",""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "")
}

//add event listeners to the restart button
document.querySelector('.game-restart').addEventListener('click', handleRestartGame)