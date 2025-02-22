export default function Languages() {
  const languages = [
    "HTML",
    "CSS",
    "Javascript",
    "React",
    "Typescript",
    "Node.js",
    "Python",
    "Ruby",
    "Assembly",
  ]

  const languagesElements = languages.map(lang => (
    <span key={lang} className={lang.toLowerCase()}>
      {lang}
    </span>
  ))

  return <div className="languagesContainer">{languagesElements}</div>
}
