export default function Alphabet() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const alphabetElements = alphabet
    .toUpperCase()
    .split("")
    .map(letter => <span>{letter}</span>)

  return <div className="alphabetContainer">{alphabetElements}</div>
}
