const alphabetLetters: Array<string> = [
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
]

export type Language = {
  name: string
  snapped: boolean
  styles: {
    backgroundColor: string
    color: string
  }
}

const languages: Array<Language> = [
  {
    name: "HTML",
    styles: {
      backgroundColor: "#E2680F",
      color: "#F9F4DA",
    },
    snapped: false,
  },
  {
    name: "CSS",
    styles: {
      backgroundColor: "#328AF1",
      color: "#F9F4DA",
    },
    snapped: false,
  },
  {
    name: "JavaScript",
    styles: {
      backgroundColor: "#F4EB13",
      color: "#1E1E1E",
    },
    snapped: false,
  },
  {
    name: "React",
    styles: {
      backgroundColor: "#2ED3E9",
      color: "#1E1E1E",
    },
    snapped: false,
  },
  {
    name: "TypeScript",
    styles: {
      backgroundColor: "#298EC6",
      color: "#F9F4DA",
    },
    snapped: false,
  },
  {
    name: "Node.js",
    styles: {
      backgroundColor: "#599137",
      color: "#F9F4DA",
    },
    snapped: false,
  },
  {
    name: "Python",
    styles: {
      backgroundColor: "#FFD742",
      color: "#1E1E1E",
    },
    snapped: false,
  },
  {
    name: "Ruby",
    styles: {
      backgroundColor: "#D02B2B",
      color: "#F9F4DA",
    },
    snapped: false,
  },
  {
    name: "Assembly",
    styles: {
      backgroundColor: "#2D519F",
      color: "#F9F4DA",
    },
    snapped: false,
  },
]

export { alphabetLetters, languages }
