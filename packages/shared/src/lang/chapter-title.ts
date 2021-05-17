type Props = {
  chapter: any;
  f: (props: any) => string;
  lang: string;
};

export function chapterTitle({ chapter, f, lang }: Props) {
  const language = lang ? `_${lang}` : "";
  const subchapter = chapter.subchapter !== 0 ? "." + chapter.subchapter : "";
  const volumeTxt = f({
    id: "volume" + language,
    defaultMessage: "Volume",
  });
  const chapterTxt = f({
    id: "chapter" + language,
    defaultMessage: "Chapter",
  });
  const languageTxt = lang
    ? f({
        id: `${lang}_full`,
        defaultMessage: "",
      })
    : "";
  const volume = chapter.volume > 0 ? `${volumeTxt} ${chapter.volume} ` : "";
  return `${volume}${chapterTxt} ${chapter.chapter}${subchapter}${
    chapter.name !== "" ? `: ${chapter.name}` : ""
  } ${languageTxt}`;
}
