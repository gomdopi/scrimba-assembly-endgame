export default function GameMessage(props: { gameMessage: string }) {
  const phrases = ["Farewell", "It's been real", "R.I.P."]
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
  const languageMessage =
    props.gameMessage.length > 0
      ? `${randomPhrase}, ${props.gameMessage[0]?.toUpperCase()}${props.gameMessage.slice(
          1
        )}`
      : ""

  const generateMessage = () => {
    switch (props.gameMessage) {
      case "win":
        return (
          <>
            <h2>You win!</h2>
            <h3>Well done!</h3>
          </>
        )
      case "lose":
        return (
          <>
            <h2>Game over!</h2>
            <h3>You lose! Better start learning Assembly</h3>
          </>
        )
      default: {
        return <h4>{languageMessage}</h4>
      }
    }
  }

  return (
    <div
      className={`${
        languageMessage.length === 0
          ? "hide"
          : `gameMessage-${props.gameMessage}`
      }`}
    >
      {generateMessage()}
    </div>
  )
}
