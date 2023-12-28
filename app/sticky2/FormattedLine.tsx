export function FormattedLine({ line }: { line: string }) {
  const isMonth =
    line.match(
      /^(January|February|March|April|May|June|July|August|September|October|November|December)/
    ) != null;
  // const isMonth = line.match(/^M\d\d/) != null;
  const isDay = line.match(/^\d.*?:/) != null;

  const isTopic = line.match(/^ *-/) != null;

  const isDetail = line.match(/^ *\^/) != null;

  if (isMonth)
    return (
      <div className="sticky top-0 bg-bg pl-10 text-3xl font-extralight">
        {line}
      </div>
    );

  if (isDay) {
    const day = line.match(/^\d.*?(?=:)/);
    const note = line.replace(/^\d.*?:/, "");

    return (
      <div>
        <div className="pl-2.5 text-2xl font-extralight tabular-nums">
          {day}
        </div>

        <div className="flex flex-row gap-1 pl-12 text-text_white text-base font-light">
          <div>-</div>
          <div>{note}</div>
        </div>
      </div>
    );
  }

  if (isTopic) {
    const note = line.replace(/^ *- */, "");
    return (
      <div className="flex flex-row gap-1 pl-12 text-text_white text-base font-light">
        <div>-</div>
        <div>{note}</div>
      </div>
    );
  }

  if (isDetail) {
    const note = line.replace(/^ *\^ */, "");
    return (
      <div className="flex flex-row gap-1 pl-16 text-sm">
        <div>-</div>
        <div>{note}</div>
      </div>
    );
  }

  return <div className="pl-2.5">{line}&nbsp;</div>;
}
