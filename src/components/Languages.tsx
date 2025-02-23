import { Language } from "../App"

export default function Languages(props: { languagesState: Array<Language> }) {
  const languagesElements = props.languagesState.map(language => (
    <div key={language.language}>
      <span
        className={
          language.language.toLowerCase() + (language.snapped ? " snapped" : "")
        }
      >
        {language.language}
      </span>
      <span className={"snappedIcon" + (language.snapped ? " show" : "")}>
        💀
      </span>
    </div>
  ))

  return <div className="languagesContainer">{languagesElements}</div>
}
