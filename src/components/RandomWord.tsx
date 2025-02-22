export default function RandomWord(props: { randomWord: string }) {
  const randomWordArr = props.randomWord.toUpperCase().split("")
  const randomWordElements = randomWordArr.map((letter, index) => (
    <span key={index} className="letter">
      {letter}
    </span>
  ))
  return <div className="randomWordContainer">{randomWordElements}</div>
}
