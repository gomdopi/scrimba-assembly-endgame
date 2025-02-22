export default function Alphabet() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const alphabetElements = alphabet
    .toUpperCase()
    .split("")
    .map(letter => <span key={letter}>{letter}</span>)

  return <div className="alphabetContainer">{alphabetElements}</div>
}
