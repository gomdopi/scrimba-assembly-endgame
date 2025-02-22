export default function GameMessage(props: { language: string }) {
  const phrases = ["Farewell", "It's been real", "R.I.P."]

  const generateMessage = () => {
    switch (props.language) {
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
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
        return (
          <h4>{`${randomPhrase}, ${props.language[0].toUpperCase()}${props.language.slice(
            1
          )}`}</h4>
        )
      }
    }
  }

  return (
    <div className={`gameMessage-${props.language}`}>{generateMessage()}</div>
  )
}
