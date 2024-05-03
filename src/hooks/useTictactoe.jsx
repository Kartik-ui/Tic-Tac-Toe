import { useState } from "react";

const initialBoard = (num) => Array(num * num).fill(null);

const useTictactoe = (n) => {
  const [board, setBoard] = useState(initialBoard(n));
  const [isXNext, setIsXNext] = useState(true);

  // const WINNING_PATTERNS = [
  //   [0, 1, 2],
  //   [3, 4, 5],
  //   [6, 7, 8],
  //   [0, 3, 6],
  //   [1, 4, 7],
  //   [2, 5, 8],
  //   [0, 4, 8],
  //   [2, 4, 6],
  // ];

  function generateWinningPatterns(n) {
    const patterns = [];

    // Rows and columns
    for (let i = 0; i < n; i++) {
      const rowPattern = [];
      const colPattern = [];
      for (let j = 0; j < n; j++) {
        rowPattern.push(i * n + j);
        colPattern.push(j * n + i);
      }
      patterns.push(rowPattern, colPattern);
    }

    // Diagonals
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < n; i++) {
      diagonal1.push(i * n + i);
      diagonal2.push((i + 1) * (n - 1));
    }
    patterns.push(diagonal1, diagonal2);

    return patterns;
  }

  // Example usage:
  const WINNING_PATTERNS = generateWinningPatterns(n);
  console.log(WINNING_PATTERNS);

  // const calculateWinner = (currentBoard) => {
  //   for (let i = 0; i < WINNING_PATTERNS.length; i++) {
  //     const [a, b, c] = WINNING_PATTERNS[i];
  //     if (
  //       currentBoard[a] &&
  //       currentBoard[a] === currentBoard[b] &&
  //       currentBoard[a] === currentBoard[c]
  //     ) {
  //       return currentBoard[a];
  //     }
  //   }
  //   return null;
  // };

  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const pattern = WINNING_PATTERNS[i];
      const firstPositionValue = currentBoard[pattern[0]]; // Get the value of the first position in the pattern
      let isWinner = true; // Assume all fields are equal initially
      for (let j = 1; j < pattern.length; j++) {
        if (
          currentBoard[pattern[j]] !== firstPositionValue ||
          !firstPositionValue
        ) {
          isWinner = false; // If any field is not equal to the first position or is null, set isWinner to false
          break;
        }
      }
      if (isWinner) {
        return firstPositionValue; // If all fields are equal and not null, return the winner
      }
    }
    return null; // Return null if there is no winner
  };

  const handleClick = (index) => {
    // check winner
    const winner = calculateWinner(board);
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return "It's a draw!";
    return `Player ${isXNext ? "X" : "O"} turn`;
  };

  const resetGame = () => {
    setBoard(initialBoard(n));
    setIsXNext(true);
  };

  return { board, handleClick, calculateWinner, getStatusMessage, resetGame };
};

export default useTictactoe;
