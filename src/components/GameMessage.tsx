import clsx from "clsx"
import { getFarewellText } from "../utils"
import { memo } from "react"

function GameMessage(props: { gameMessage: string }) {
  const capitalizedLanguage =
    props.gameMessage.length > 0
      ? props.gameMessage[0] + props.gameMessage.slice(1)
      : ""
  const farewellMessage = getFarewellText(capitalizedLanguage)

  const generateMessage = () => {
    switch (props.gameMessage) {
      case "victory":
        return (
          <>
            <h2>You win!</h2>
            <h3>Well done! 🎉</h3>
          </>
        )
      case "loss":
        return (
          <>
            <h2>Game over!</h2>
            <h3>You lose! Better start learning Assembly 😭</h3>
          </>
        )
      default: {
        return <h4>{farewellMessage}</h4>
      }
    }
  }

  return (
    <section
      aria-live="polite"
      role="status"
      className={clsx(
        `gameMessage-${props.gameMessage}`,
        farewellMessage.length === 0 && "hide"
      )}
    >
      {generateMessage()}
    </section>
  )
}

export default memo(GameMessage)
