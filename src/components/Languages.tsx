import clsx from "clsx"
import { Language } from "../assets/data"

export default function Languages(props: { languagesState: Array<Language> }) {
  const languagesElements = props.languagesState.map(language => (
    <span
      key={language.name}
      className={clsx(language.snapped && "snapped")}
      style={language.styles}
    >
      {language.name}
    </span>
  ))

  return <div className="languagesContainer">{languagesElements}</div>
}
