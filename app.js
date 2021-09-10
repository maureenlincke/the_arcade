//check if the game is still going on
let gameActive = true

//an array with chosen boxes
let gameState = ["", "", "", "", "", "", "", "", ""];

//let the game know whose turn it is
let players = {
    playerOne: "",
    playerTwo: ""
}
let currentPlayer

//add event listener to the cells
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick))

//assign winning conditions
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

// display the default game messages
document.querySelector('.game-status').innerHTML = `Welcome to the game :)`;

// enter name and have it displayed
function playerOneFunction(){
    let playerOneName = document.getElementById("player-one").value;
    return playerOneName;
}
function playerTwoFunction(){
    let playerTwoName = document.getElementById("player-two").value;
    return playerTwoName;
}

//game setup and player assignment
function setup(){
    
    //randomly assign the human and computer X or O
    if(Math.random(1) > 0.5){

        //display who is X and O
        document.querySelector(".X").innerHTML = `${playerOneFunction()} is X`;
        document.querySelector(".O").innerHTML = `${playerTwoFunction()} is O`;
        
        //assign object values to X and O respectively
        players.playerTwo = "O"
        players.playerOne = "X"

        //assign a random player to be the first random player
        if(Math.random(1) > 0.5){
            currentPlayer = players.playerOne
        }else{currentPlayer = players.playerTwo}
        
        //display who goes first
        document.querySelector('.game-status').innerHTML = `${currentPlayer} goes first!`
    } else{
        document.querySelector(".O").innerHTML = `${playerOneFunction()} is O`;
        document.querySelector(".X").innerHTML = `${playerTwoFunction()} is X`;
        
        players.playerTwo = "X"
        players.playerOne = "O"
        
        if(Math.random(1) > 0.5){
            currentPlayer = players.playerOne
        }else{currentPlayer = players.playerTwo}
        
        document.querySelector('.game-status').innerHTML = `${currentPlayer} goes first!`
    }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer
    clickedCell.innerHTML = currentPlayer
    console.log(document.querySelectorAll('.cell'))
    console.log(gameState)
}

function handlePlayerChange() {
    if(currentPlayer === "X"){
        currentPlayer = "O"
    } else{currentPlayer = "X"}
    document.querySelector('.game-status').innerHTML = `It's ${currentPlayer}'s turn`;

    //have JS handle the computer's turn
    // if(currentPlayer === players.computer){
    //     computerTurn()
    // }
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
        document.querySelector('.game-status').innerHTML = `${currentPlayer} has won!`;
        gameActive = false;
        return
    }
    let roundDraw = !gameState.includes("");
    if(roundDraw){
        document.querySelector('.game-status').innerHTML = `Game ended in a draw!`;
        gameActive = false;
        return;
    }
    handlePlayerChange();
}

//handle player turn
function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target
    const clickedCellIndex = parseInt(clickedCell.getAttribute('cell-index'))
    if(gameState[clickedCellIndex] !== "" || !gameActive){
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

//handle computer's turn
// function computerTurn(){
//     const cells = document.querySelectorAll('.cell')
//     for(let i=0; i < cells.length; i++){
//         if(cells[i].innerHTML !== ""){continue};
//         cells.innerHTML = currentPlayer;
//         gameState[i] = currentPlayer
//         return
//     }
//     handleResultValidation()
// }

//start the game over without having to reset the browser
function handleRestartGame() {
    gameActive = true;
    setup();
    let currentPlayer;
    gameState = ["","","","","","","","",""];
    document.querySelector('.game-status').innerHTML = `Welcome to the game :)`;
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "")
}

//add event listeners to the restart button
document.querySelector('.game-restart').addEventListener('click', handleRestartGame)