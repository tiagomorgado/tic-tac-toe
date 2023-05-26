import Board from "./Board";
import Restart from "./Restart";

const Game = () => {
    return (
      <div className="game">
        Tic-Tac-Toe
        <Board />
        <Restart/>
      </div>
    );
  };

export default Game
