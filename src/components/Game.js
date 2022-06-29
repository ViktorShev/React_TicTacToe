import React, { useState } from "react";
import Board from "./Board";

function Game() {
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isDescending, setIsDescending] = useState(true)

  const boardColandRows = [
    [1,1], [2,1], [3,1],
    [1,2], [2,2], [3,2],
    [1,3], [2,3], [3,3]
  ]

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {winnerSymbol: squares[a], winningSquares: [a, b, c]}
      }
    }
    return null;
  }

  const handleClick = (i) => {
    const playsHistory = history.slice(0, stepNumber + 1);
    const current = playsHistory[playsHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O'
    setHistory(playsHistory.concat([{squares: squares, squareColandRow: boardColandRows[i]}]));
    setXIsNext(!xIsNext);
    setStepNumber(playsHistory.length);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2 === 0));
  }

  const reverseHistory = () => {
    isDescending ? setIsDescending(false) : setIsDescending(true)
  }

  const playsHistory = history;
  const current = playsHistory[stepNumber];
  const winner = calculateWinner(current.squares)
  const moves = playsHistory.map((_step, move) => {
    const desc = move ?
    'Go to move #' + move + ' at column: ' + playsHistory[move].squareColandRow[0] + ' / row ' + playsHistory[move].squareColandRow[1] :
    'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
        {move === stepNumber ? <b>{desc}</b> : desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = 'Winner: ' + winner.winnerSymbol
  } else if (!current.squares.includes(null)) {
    status = 'Draw!'
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board
          winningSquares={winner ? winner.winningSquares : []}
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{isDescending ? moves : moves.reverse()}</ol>
        <button onClick={() => reverseHistory()}>Reverse play history!</button>
      </div>
    </div>
  );
}

export default Game;