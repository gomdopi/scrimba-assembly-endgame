export default function RandomWord() {
  const randomWord = "refactor"
  const randomWordElements = randomWord
    .toUpperCase()
    .split("")
    .map(letter => <span className="letter">{letter}</span>)

  return <div className="randomWordContainer">{randomWordElements}</div>
}
