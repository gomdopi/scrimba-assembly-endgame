import clsx from "clsx"
import { AlphabetLetter } from "../App"

export default function CurrentWord(props: {
  currentWord: string
  alphabetLetters: Array<AlphabetLetter>
  endgameReached: string | null
}) {
  const currentWordArr = props.currentWord.split("")
  const currentWordElements = currentWordArr.map((letter, index) => {
    const letterIndex = letter.charCodeAt(0) - "A".charCodeAt(0)

    return (
      <div key={index} className="letter">
        <span
          className={clsx({
            show: props.alphabetLetters[letterIndex].selected,
            missed:
              !props.alphabetLetters[letterIndex].selected &&
              props.endgameReached === "loss",
          })}
        >
          {letter}
        </span>
      </div>
    )
  })
  return <div className="currentWordContainer">{currentWordElements}</div>
}
