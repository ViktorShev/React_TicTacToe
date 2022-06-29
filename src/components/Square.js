export default function Square(props) {
  return (
    <button className={props.isWinner ? "winning-square" : "square"} onClick={(props.onClick)}>
      {props.value}
    </button>
  );
}