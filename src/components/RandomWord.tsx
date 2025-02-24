import { AlphabetLetter } from "../App"

export default function RandomWord(props: {
  randomWord: string
  alphabetLetters: Array<AlphabetLetter>
  endgameReached: string | null
}) {
  const randomWordArr = props.randomWord.split("")
  const randomWordElements = randomWordArr.map((letter, index) => {
    const letterIndex = letter.charCodeAt(0) - "A".charCodeAt(0)

    return (
      <div key={index} className="letter">
        <span
          className={
            (props.alphabetLetters[letterIndex].selected ? "show" : "") +
            (!props.alphabetLetters[letterIndex].selected &&
            props.endgameReached === "loss"
              ? " missed"
              : "")
          }
        >
          {letter}
        </span>
      </div>
    )
  })
  return <div className="randomWordContainer">{randomWordElements}</div>
}
