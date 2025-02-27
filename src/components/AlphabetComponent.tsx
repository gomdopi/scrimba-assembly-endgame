import clsx from "clsx"
import { AlphabetLetter } from "../App"

export default function AlphabetComponent(props: {
  alphabetLetters: Array<AlphabetLetter>
  fade: string | null
  onClick: (alphabetLetter: AlphabetLetter) => void
}) {
  const alphabetElements = props.alphabetLetters.map(alphabetLetter => (
    <button
      key={alphabetLetter.letter}
      onClick={() => props.onClick(alphabetLetter)}
      className={clsx({
        inCurrentWord: alphabetLetter.inCurrentWord,
        selected: alphabetLetter.selected,
      })}
    >
      {alphabetLetter.letter}
    </button>
  ))

  return (
    <div className={clsx("alphabetContainer", props.fade && "fade")}>
      {alphabetElements}
    </div>
  )
}
