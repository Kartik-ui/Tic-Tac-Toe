import useTictactoe from "../hooks/useTictactoe";

function Tictactoe({ n }) {
  const { board, handleClick, resetGame, getStatusMessage } = useTictactoe(n);

  console.log("board", board);

  return (
    <div className="game">
      <div className="status">
        {getStatusMessage()}
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>

      <div
        className="board"
        style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
      >
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
