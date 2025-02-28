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
    const letterIsSelected = props.alphabetLetters[letterIndex].selected

    return (
      <div key={index} className="letter">
        <span
          className={clsx({
            show: letterIsSelected,
            missed: !letterIsSelected && props.endgameReached === "loss",
          })}
        >
          {letterIsSelected || props.endgameReached ? letter : ""}
        </span>
      </div>
    )
  })
  const currentWordForSr = currentWordArr
    .map(letter => {
      const letterIndex = letter.charCodeAt(0) - "A".charCodeAt(0)
      const letterIsSelected = props.alphabetLetters[letterIndex].selected

      return letterIsSelected
        ? props.alphabetLetters[letterIndex].letter + "."
        : "blank."
    })
    .join(" ")

  return (
    <>
      <section className="currentWordContainer">{currentWordElements}</section>
      <section aria-live="polite" role="status" className="sr-only">
        <p>Current word: {currentWordForSr}</p>
      </section>
    </>
  )
}
