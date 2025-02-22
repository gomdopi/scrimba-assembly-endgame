import { useState } from "react"
import Alphabet from "./components/Alphabet"
import GameMessage from "./components/GameMessage"
import GameTitle from "./components/GameTitle"
import Languages from "./components/Languages"
import RandomWord from "./components/RandomWord"
import { generate } from "random-words"

export default function App() {
  const [randomWord, setRandomWord] = useState(
    generate({ exactly: 1, join: "" })
  )

  const handleNewGameClick = () => {
    setRandomWord(generate({ exactly: 1, join: "" }))
  }
  return (
    <>
      <header>
        <GameTitle />
        <GameMessage language="lose" />
      </header>
      <main>
        <Languages />
        <RandomWord randomWord={randomWord} />
        <Alphabet />
      </main>
      <button className="newGameButton" onClick={handleNewGameClick}>
        New Game
      </button>
    </>
  )
}
