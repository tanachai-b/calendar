"use client";

import { useState } from "react";

import { Icon, IconButton, NavBar } from "../components";
import { initialInput } from "./initialInput";
import { Editor } from "./Editor";

export default function Sticky() {
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle>();
  const [writable, setWritable] = useState<FileSystemWritableFileStream>();
  const [saveTimer, setSaveTimer] = useState<NodeJS.Timeout>();

  const [inputText, setInputText] = useState(initialInput);

  async function handleOpenClicked() {
    const [fileHandle] = await window.showOpenFilePicker();
    setFileHandle(fileHandle);
    // setWritable(await fileHandle.createWritable());

    const file = await fileHandle.getFile();
    const text = await file.text();
    setInputText(text);
  }

  return (
    <div className="flex flex-col h-screen">
      <NavBar />

      <div className="flex flex-wrap px-2.5 border-b border-highlight_yellow">
        <IconButton
          icon={<Icon className="text-base" icon="folder_open" />}
          text="Open"
          onClick={handleOpenClicked}
        />

        <IconButton
          icon={<Icon className="text-base" icon="edit" />}
          text="Edit"
          onClick={() => {}}
        />

        <IconButton
          icon={<Icon className="text-base" icon="save" />}
          text="Save"
          onClick={() => {}}
        />
      </div>

      <Editor inputText={inputText} onChange={setInputText} />
    </div>
  );
}
