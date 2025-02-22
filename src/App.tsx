import Alphabet from "./components/Alphabet"
import GameMessage from "./components/GameMessage"
import GameTitle from "./components/GameTitle"
import Languages from "./components/Languages"
import RandomWord from "./components/RandomWord"

export default function App() {
  return (
    <>
      <header>
        <GameTitle />
        <GameMessage language="lose" />
      </header>
      <main>
        <Languages />
        <RandomWord />
        <Alphabet />
      </main>
      <button className="newGameButton">New Game</button>
    </>
  )
}
