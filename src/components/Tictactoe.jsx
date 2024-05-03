import useTictactoe from "../hooks/useTictactoe";

function Tictactoe() {
  const { board, handleClick, resetGame, getStatusMessage } = useTictactoe();

  return (
    <div className="game">
      <div className="status">
        {getStatusMessage()}
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>

      <div className="board">
        {board.map((item, index) => {
          return (
            <button
              className="cell"
              key={index}
              onClick={() => handleClick(index)}
              disabled={item !== null}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Tictactoe;
