"use client";

import { useState } from "react";
import { NavBar } from "../components";

export default function FileSystem() {
  const [text, setText] = useState("");
  const [writable, setWritable] = useState<FileSystemWritableFileStream>();
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle>();
  const [saveTimer, setSaveTimer] = useState<NodeJS.Timeout>();

  async function getFile() {
    const [fileHandle] = await window.showOpenFilePicker();
    setFileHandle(fileHandle);
    setWritable(await fileHandle.createWritable());

    const file = await fileHandle.getFile();
    const contents = await file.text();
    setText(contents);
  }

  async function handleTextChanged(text: string) {
    setText(text);

    clearTimeout(saveTimer);
    setSaveTimer(
      setTimeout(async () => {
        if (!writable || !fileHandle) return;

        await writable.write(text);
        await writable.close();
        setWritable(await fileHandle.createWritable());
      }, 200)
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <NavBar className="border-b border-highlight_yellow" />

      <button onClick={() => getFile()}>hello</button>

      <textarea
        className="flex-1 w-full h-full outline-none px-2.5 text-text_grey active:text-text_white bg-transparent placeholder:text-text_grey focus:text-text_white focus:bg-bg_hover resize-none"
        value={text}
        onChange={(e) => handleTextChanged(e.target.value)}
      />
    </div>
  );
}
