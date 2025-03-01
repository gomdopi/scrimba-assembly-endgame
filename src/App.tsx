import clsx from "clsx"
import { generate } from "random-words"
import { RefObject, useEffect, useRef, useState } from "react"
import ReactConfetti from "react-confetti"
import * as data from "./assets/data"
import AlphabetComponent from "./components/AlphabetComponent"
import CurrentWord from "./components/CurrentWord"
import GameMessage from "./components/GameMessage"
import GameTitle from "./components/GameTitle"
import Languages from "./components/Languages"

export class AlphabetLetter {
  letter: string
  inCurrentWord: boolean
  selected: boolean

  constructor(letter: string, inCurrentWord: boolean) {
    this.letter = letter
    this.inCurrentWord = inCurrentWord
    this.selected = false
  }
}

export class Alphabet {
  static alphabetLetters: Array<string> = data.alphabetLetters

  letters: Array<AlphabetLetter>

  constructor(currentWord: string) {
    this.letters = Alphabet.alphabetLetters.map(
      letter => new AlphabetLetter(letter, currentWord.includes(letter))
    )
  }
}

const initialLanguages: Array<data.Language> = data.languages

const timeLimit = 30
const intervalStart = 0

function initializeAlphabet(currentWord: string): Array<AlphabetLetter> {
  return new Alphabet(currentWord).letters
}

export default function App() {
  // State
  const [gameMessage, setGameMessage] = useState("")
  const [snappedLanguages, setSnappedLanguages] = useState(0)
  const [languagesState, setLanguagesState] = useState(initialLanguages)
  const [currentWord, setCurrentWord] = useState(() =>
    generate({ exactly: 1, join: "" }).toUpperCase()
  )
  const [alphabetLetters, setAlphabetLetters] = useState(() =>
    initializeAlphabet(currentWord)
  )
  const [time, setTime] = useState(timeLimit)

  // Derived
  const endgameReached = alphabetLetters.every(
    alphabetLetter =>
      !alphabetLetter.inCurrentWord ||
      (alphabetLetter.inCurrentWord && alphabetLetter.selected)
  )
    ? "victory"
    : snappedLanguages >= data.languages.length - 1
    ? "loss"
    : null
  const startedGame = alphabetLetters.some(letter => letter.selected)

  const newGameButtonRef: RefObject<HTMLButtonElement | null> = useRef(null)

  useEffect(() => {
    if (time === 0) {
      setSnappedLanguages(8)
      setLanguagesState(prevLanguagesState =>
        prevLanguagesState.map(language =>
          language.name.toLowerCase() === "assembly"
            ? language
            : { ...language, snapped: true }
        )
      )
    }
  }, [time])

  useEffect(() => {
    if (endgameReached) {
      clearInterval(interval.current)
      setGameMessage(endgameReached)
      newGameButtonRef.current!.focus()
    }
  }, [endgameReached])

  const interval = useRef(0)
  useEffect(() => {
    if (startedGame && interval.current === intervalStart) {
      interval.current = setInterval(
        () => setTime(prevTime => prevTime - 1),
        1000
      )
    }

    return () => clearInterval(interval.current)
  }, [startedGame])

  const handleNewGameClick = (): void => {
    const newWord = generate({ exactly: 1, join: "" }).toUpperCase()
    setGameMessage("")
    setSnappedLanguages(0)
    setLanguagesState(initialLanguages)
    setCurrentWord(newWord)
    setAlphabetLetters(initializeAlphabet(newWord))
    setTime(timeLimit)
    interval.current = intervalStart
  }

  const handleAlphabetLetterClick = (alphabetLetter: AlphabetLetter): void => {
    setAlphabetLetters(prevAlphabetLetters =>
      prevAlphabetLetters.map(currAlphabetLetter =>
        currAlphabetLetter.letter === alphabetLetter.letter
          ? { ...currAlphabetLetter, selected: true }
          : currAlphabetLetter
      )
    )

    if (currentWord.includes(alphabetLetter.letter)) {
      setGameMessage("")
    } else {
      const newSnappedLanguages = snappedLanguages + 1
      setGameMessage(languagesState[snappedLanguages].name)
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
      {endgameReached === "victory" && (
        <ReactConfetti recycle={false} numberOfPieces={1000} />
      )}
      <header>
        <GameTitle />
        <GameMessage gameMessage={gameMessage} />
      </header>
      <main>
        <Languages languagesState={languagesState} />
        <CurrentWord
          currentWord={currentWord}
          alphabetLetters={alphabetLetters}
          endgameReached={endgameReached}
        />
        <AlphabetComponent
          alphabetLetters={alphabetLetters}
          fade={endgameReached}
          onClick={handleAlphabetLetterClick}
        />
      </main>
      <footer>
        <div className="remaining-guesses">
          <p>Remaining guesses:</p>
          <span>{initialLanguages.length - snappedLanguages - 1}</span>
        </div>
        <button
          ref={newGameButtonRef}
          className={clsx("newGameButton", endgameReached && "show")}
          onClick={handleNewGameClick}
        >
          New Game
        </button>
        <div className="timer">
          <p>Timer:</p>
          <span>{time}</span>
        </div>
      </footer>
    </>
  )
}
