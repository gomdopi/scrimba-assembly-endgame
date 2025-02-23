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

export type Language = {
  language: string
  snapped: boolean
}

const initialLanguages: Array<Language> = [
  {
    language: "HTML",
    snapped: false,
  },
  {
    language: "CSS",
    snapped: false,
  },
  {
    language: "Javascript",
    snapped: false,
  },
  {
    language: "React",
    snapped: false,
  },
  {
    language: "Typescript",
    snapped: false,
  },
  {
    language: "Node.js",
    snapped: false,
  },
  {
    language: "Python",
    snapped: false,
  },
  {
    language: "Ruby",
    snapped: false,
  },
  {
    language: "Assembly",
    snapped: false,
  },
]

function initializeAlphabet(randomWord: string): Array<AlphabetLetter> {
  return new Alphabet(randomWord).letters
}

export default function App() {
  const [gameMessage, setGameMessage] = useState("")
  const [snappedLanguages, setSnappedLanguages] = useState(0)
  const [languagesState, setLanguagesState] = useState(initialLanguages)
  const [randomWord, setRandomWord] = useState(
    generate({ exactly: 1, join: "" })
  )
  const [alphabetLetters, setAlphabetLetters] = useState(
    initializeAlphabet(randomWord)
  )

  const handleNewGameClick = (): void => {
    const newRandomWord = generate({ exactly: 1, join: "" })
    setGameMessage("")
    setLanguagesState(initialLanguages)
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

    if (randomWord.includes(alphabetLetter.letter)) {
      setGameMessage("")
    } else {
      const newSnappedLanguages = snappedLanguages + 1
      setGameMessage(languagesState[snappedLanguages].language)
      setSnappedLanguages(newSnappedLanguages)
      setLanguagesState(prevLanguagesState =>
        prevLanguagesState.map((language, index) =>
          index === snappedLanguages ? { ...language, snapped: true } : language
        )
      )
    }
  }

  return (
    <>
      <header>
        <GameTitle />
        <GameMessage gameMessage={gameMessage} />
      </header>
      <main>
        <Languages languagesState={languagesState} />
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
