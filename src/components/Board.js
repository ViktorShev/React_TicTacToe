import Square from "./Square";

export default function Board(props) {
  const renderSquare = (i) => {
    return (
    <Square key={i} value={props.squares[i]} isWinner={props.winningSquares.includes(i)} onClick={() => props.onClick(i)} />
    );
  };

  const renderSquares = (squareIdsList = []) => {
    return (
      <div className="board-row">
        {squareIdsList.map(renderSquare)}
      </div>
    )
    // let squares = []
    // for (let i = 0; i < n; i++) {
      // squares.push(renderSquare(i))
    // }
    // return squares
  }

  return (
    <div>
    {renderSquares([0, 1, 2])}
    {renderSquares([3, 4, 5])}
    {renderSquares([6, 7, 8])}
    </div>
  );
}