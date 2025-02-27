import clsx from "clsx"
import { Language } from "../assets/data"

export default function Languages(props: { languagesState: Array<Language> }) {
  const languagesElements = props.languagesState.map(language => (
    <div key={language.name}>
      <span
        className={clsx(language.snapped && "snapped")}
        style={language.styles}
      >
        {language.name}
      </span>
      <span className={clsx("snappedIcon", language.snapped && "show")}>
        💀
      </span>
    </div>
  ))

  return <div className="languagesContainer">{languagesElements}</div>
}
