import React from "react";

enum Size {
  small = "small",
  large = "large",
}

export const Icons = {
  diary: materialSymbol("partly_cloudy_day"),
  habits: materialSymbol("directions_bike"),
  settings: materialSymbol("settings"),

  diary_large: materialSymbol("partly_cloudy_day", Size.large),
  habits_large: materialSymbol("directions_bike", Size.large),
  settings_large: materialSymbol("settings", Size.large),

  today: materialSymbol("today"),
  edit: materialSymbol("edit"),
  download: materialSymbol("download"),

  search_large: materialSymbol("search", Size.large),
  clear_large: materialSymbol("close", Size.large),
};

function materialSymbol(iconName: string, size: Size = Size.small) {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0"
      />
      <span
        className={`material-symbols-rounded align-middle !leading-none ${
          size === Size.large ? "!text-xl" : "!text-base"
        }`}
      >
        {iconName}
      </span>
    </div>
  );
}
