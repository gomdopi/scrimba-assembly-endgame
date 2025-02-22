import { useState } from "react"
import AlphabetComponent from "./components/AlphabetComponent"
import GameMessage from "./components/GameMessage"
import GameTitle from "./components/GameTitle"
import Languages from "./components/Languages"
import RandomWord from "./components/RandomWord"
import { generate } from "random-words"

export class AlphabetLetter {
  letter: string
  inRandomWord: boolean
  selected: boolean

  constructor(letter: string, inRandomWord: boolean) {
    this.letter = letter
    this.inRandomWord = inRandomWord
    this.selected = false
  }
}

export class Alphabet {
  static alphabetLetters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ] as const

  letters: Array<AlphabetLetter>

  constructor(randomWord: string) {
    this.letters = Alphabet.alphabetLetters.map(
      letter => new AlphabetLetter(letter, randomWord.includes(letter))
    )
  }
}

function initializeAlphabet(randomWord: string): Array<AlphabetLetter> {
  return new Alphabet(randomWord).letters
}

export default function App() {
  const [randomWord, setRandomWord] = useState(
    generate({ exactly: 1, join: "" })
  )
  const [alphabetLetters, setAlphabetLetters] = useState(
    initializeAlphabet(randomWord)
  )

  const handleNewGameClick = (): void => {
    const newRandomWord = generate({ exactly: 1, join: "" })
    setRandomWord(newRandomWord)
    setAlphabetLetters(initializeAlphabet(newRandomWord))
  }

  const handleAlphabetLetterClick = (alphabetLetter: AlphabetLetter): void => {
    if (alphabetLetter.selected) return

    setAlphabetLetters(prevAlphabetLetters =>
      prevAlphabetLetters.map(currAlphabetLetter =>
        currAlphabetLetter.letter === alphabetLetter.letter
          ? { ...currAlphabetLetter, selected: true }
          : currAlphabetLetter
      )
    )
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
        <AlphabetComponent
          alphabetLetters={alphabetLetters}
          onClick={handleAlphabetLetterClick}
        />
      </main>
      <button className="newGameButton" onClick={handleNewGameClick}>
        New Game
      </button>
    </>
  )
}
