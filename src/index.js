import { useState } from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
const domNode = document.getElementById('root');
const root = createRoot(domNode);

const Square = (props) => {
  return (
    <button 
        className='square'
        onClick={(props.onClickEvent)}
        >
      {props.value}
    </button>
  )
}

const Board = () => {
  /* Initializie array with 9 null, representing each of the 9 squares on the board */
  const initialSquares = Array(9).fill(null);

  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClickEvent = (i) => {
    /* 1. Make a copy of the squares state array */
    const newSquares = [...squares];

    /* 1.1 Check if game has had a winner, or if the square is already filled */
    const winnerDeclared = Boolean(calculateWinner(newSquares));
    const squareFilled = Boolean(newSquares[i])

    if(winnerDeclared || squareFilled) {
      return;
    }

    /* 2. Mutate the copy, setting the i-th element to X */
    newSquares[i] = xIsNext ? 'X' : 'O';

    /* 3. Call de setSquares function with the mutated copy */
    setSquares(newSquares);
    setXIsNext(!xIsNext)
  }

  const renderSquare = (i) => {
    return (
      <Square
      value={squares[i]}
      onClickEvent={() => handleClickEvent(i)}
      />
    )
  }

  const winner = calculateWinner(squares);

  const status = winner ?
  `Winner: ${winner}` :
   `Next player is: ${xIsNext ? 'X' : 'O'}`;

  return(
    <div>
      <div className='status'>
        {status}
      </div>
      <div className='board-row'> 
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'> 
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'> 
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

const Game = () => {
  return (
    <div className="game">
      Tic-Tac-Toe
      <Board />
    </div>
  );
};

root.render(
  <Game />
);

function calculateWinner(squares) {
  const lines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], /* Rows */
  [0, 3, 6], [1, 4, 7], [2, 5, 8], /* Columns */
  [0, 4, 8], [2, 4, 6] /* Diagonals */
  ];

  const button = document.getElementsByTagName('button')

  for (let line of lines) {
    const [a, b, c] = line;

    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      button[a].style.backgroundColor='green'
      button[b].style.backgroundColor='green'
      button[c].style.backgroundColor='green'

      return squares[a] /* X or O */
    }
  }
  return null;
}