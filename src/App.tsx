import { RefObject, useEffect, useRef, useState } from "react"
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
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
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
    generate({ exactly: 1, join: "" }).toUpperCase()
  )
  const [alphabetLetters, setAlphabetLetters] = useState(
    initializeAlphabet(randomWord)
  )

  const endgameReached =
    snappedLanguages === 8 ||
    alphabetLetters.every(
      alphabetLetter =>
        !alphabetLetter.inRandomWord ||
        (alphabetLetter.inRandomWord && alphabetLetter.selected)
    )

  const newGameButtonRef: RefObject<HTMLButtonElement | null> = useRef(null)
  useEffect(() => {
    if (endgameReached) {
      setGameMessage(snappedLanguages === 8 ? "loss" : "victory")
      newGameButtonRef.current!.focus()
    }
  }, [endgameReached])

  const handleNewGameClick = (): void => {
    const newRandomWord = generate({ exactly: 1, join: "" }).toUpperCase()
    setGameMessage("")
    setSnappedLanguages(0)
    setLanguagesState(initialLanguages)
    setRandomWord(newRandomWord)
    setAlphabetLetters(initializeAlphabet(newRandomWord))
  }

  const handleAlphabetLetterClick = (alphabetLetter: AlphabetLetter): void => {
    if (alphabetLetter.selected || endgameReached) return

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
        <RandomWord randomWord={randomWord} alphabetLetters={alphabetLetters} />
        <AlphabetComponent
          alphabetLetters={alphabetLetters}
          onClick={handleAlphabetLetterClick}
        />
      </main>
      <button
        ref={newGameButtonRef}
        className={"newGameButton" + (endgameReached ? " show" : "")}
        onClick={handleNewGameClick}
      >
        New Game
      </button>
    </>
  )
}
