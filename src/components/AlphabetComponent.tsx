import { AlphabetLetter } from "../App"

export default function AlphabetComponent(props: {
  alphabetLetters: Array<AlphabetLetter>
  onClick: (alphabetLetter: AlphabetLetter) => void
}) {
  const alphabetElements = props.alphabetLetters.map(alphabetLetter => (
    <button
      key={alphabetLetter.letter}
      onClick={() => props.onClick(alphabetLetter)}
      className={`${alphabetLetter.selected ? "selected" : ""} ${
        alphabetLetter.inRandomWord ? "inRandomWord" : ""
      }`}
    >
      {alphabetLetter.letter.toUpperCase()}
    </button>
  ))

  return <div className="alphabetContainer">{alphabetElements}</div>
}
