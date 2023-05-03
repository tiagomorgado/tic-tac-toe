import ReactDOM from 'react-dom'
import { useState } from 'react'

import './index.css'

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

  const status = `Next player is: ${xIsNext ? 'X' : 'O'}`;

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



ReactDOM.render(
  <Game />,
  document.getElementById('root')
);