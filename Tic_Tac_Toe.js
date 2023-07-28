let cells=document.querySelectorAll(".cells");
let currentPlayer = 'X';
let music=new Audio("music.mp3");
let turn =new Audio("ting.mp3");
let gameOver=new Audio("gameover.mp3");
 

cells.forEach(cell => {
  cell.addEventListener('click', gameLogic,{ once: true });//The { once: true } option ensures that the event listener is removed after the first click, so each cell can only be clicked once.
  });//we are going to add a click event to each cell

function gameLogic(event) {
  const cell = event.target;//It takes an event object as a parameter, which represents the click event and contains information about the event, such as the target element that was clicked.
  cell.textContent = currentPlayer;//This line of code sets the text content of the clicked cell to the value of currentPlayer, which represents the current player ('X' or 'O'). This displays the current player's symbol in the clicked cell.
  cell.classList.add(currentPlayer);//This line of code adds a class to the clicked cell, with the class name being the value of currentPlayer. This is used to style the cell with the current player's symbol (e.g., 'X' or 'O').
  
  if (checkWin(currentPlayer)) { 
   
    // document.getElementById("line").style.transfrom="translate(5vw,5vw) rotate(90deg)";
    gameOver.play();
    alert(`${currentPlayer} wins!`);
    reset();
  
  } 
  else if (checkDraw()) {
    
    alert(`It's a draw!`);
    reset();
  }

  else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';//we are using a ternary fumction ,if x is there then we put o else x.
    turn.play();
    
  }
}

function checkWin(player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  return winningCombinations.some(combination => {//This line of code uses the some method to iterate through the winningCombinations array and check if any of the combinations satisfy a winning condition. It uses the every method to check if all cells in a combination have the class of the current player, which would indicate a win.
    return combination.every(index => {
      return cells[index].classList.contains(player);
    });
  });

}


function checkDraw() {
  return [...cells].every(cell => {//This line of code uses the spread syntax ([...cells]) to convert the NodeList of cells into an array, and then uses the every method to check if all cells in the array have been marked with either 'X' or 'O'
    return cell.classList.contains('X') || cell.classList.contains('O');
  });
}

function reset() {
  cells.forEach(cell => {
    cell.classList.remove('X');
    cell.classList.remove('O');
    cell.textContent = '';
  });
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.addEventListener('click', gameLogic, { once: true });
  });
}

