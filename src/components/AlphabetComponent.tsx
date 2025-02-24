import { AlphabetLetter } from "../App"

export default function AlphabetComponent(props: {
  alphabetLetters: Array<AlphabetLetter>
  fade: string | null
  onClick: (alphabetLetter: AlphabetLetter) => void
}) {
  const alphabetElements = props.alphabetLetters.map(alphabetLetter => {
    let className = alphabetLetter.inRandomWord ? "inRandomWord" : ""
    if (alphabetLetter.selected) className += " selected"

    return (
      <button
        key={alphabetLetter.letter}
        onClick={() => props.onClick(alphabetLetter)}
        className={className}
      >
        {alphabetLetter.letter}
      </button>
    )
  })

  return (
    <div className={"alphabetContainer" + (props.fade ? " fade" : "")}>
      {alphabetElements}
    </div>
  )
}
