import React, { useMemo, useState } from "react";

import { Icons } from "./Icons";

export function SearchBox({
  onChange,
}: {
  onChange?: (value: string) => void;
}) {
  const [searchText, setSearchText] = useState<string>("");

  const showClearButton = useMemo(() => searchText.length > 0, [searchText]);

  const handleInputChange = (value: string): void => {
    setSearchText(value);
    onChange?.(value);
  };

  const handleClearButtonClick = () => {
    setSearchText("");
    onChange?.("");
  };

  return (
    <label className="relative flex flex-row">
      <input
        className="absolute w-full h-full py-2.5 px-10 outline-none text-text_white bg-transparent placeholder:text-text_grey focus:text-text_white focus:bg-bg_hover"
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => handleInputChange(e.target.value)}
      />

      <div className="flex flex-row w-full pointer-events-none z-50">
        <div className="p-2.5">{Icons.search_large}</div>
        <div className="grow" />
        {showClearButton ? (
          <div
            className="p-2.5 pointer-events-auto cursor-pointer"
            onClick={handleClearButtonClick}
          >
            {Icons.clear_large}
          </div>
        ) : (
          <></>
        )}
      </div>
    </label>
  );
}
