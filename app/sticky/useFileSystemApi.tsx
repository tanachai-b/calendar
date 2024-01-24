import { useMemo, useState } from "react";

import { NoteData } from "./Board/Board";

export function useFileSystemApi({
  notes,
  setNotes,
}: {
  notes: NoteData[];
  setNotes: (notes: NoteData[]) => void;
}) {
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle>();
  const [writeTimer, setWriteTimer] = useState<NodeJS.Timeout>();
  const isSaving = useMemo(() => writeTimer != null, [writeTimer]);

  const haveUnsavedChanges = isSaving || (!fileHandle && notes.length > 0);

  function confirmUnsavedChanges() {
    return confirm("There's some unsaved changes!");
  }

  async function handleNew() {
    if (haveUnsavedChanges && !confirmUnsavedChanges()) return;

    setFileHandle(undefined);
    clearTimeout(writeTimer);
    setNotes([]);
  }

  async function handleOpen() {
    if (haveUnsavedChanges && !confirmUnsavedChanges) return;

    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        { description: "JSON", accept: { "application/json": [".json"] } },
      ],
    });
    await fileHandle?.createWritable();
    setFileHandle(fileHandle);

    const file = await fileHandle.getFile();
    const text = await file.text();
    setNotes(JSON.parse(text));
  }

  async function handleSaveAs() {
    if (haveUnsavedChanges && !confirmUnsavedChanges) return;

    const fileHandle = await window.showSaveFilePicker({
      types: [
        { description: "JSON", accept: { "application/json": [".json"] } },
      ],
    });
    await fileHandle?.createWritable();
    setFileHandle(fileHandle);

    const writable = await fileHandle?.createWritable();
    await writable?.write(JSON.stringify(notes, undefined, 4));
    await writable?.close();
  }

  function resetWriteTimer(notes: NoteData[]) {
    clearTimeout(writeTimer);

    if (!fileHandle) return;

    setWriteTimer(
      setTimeout(async () => {
        const writable = await fileHandle.createWritable();
        await writable.write(JSON.stringify(notes, undefined, 4));
        await writable.close();
        setWriteTimer(undefined);
      }, 1000)
    );
  }

  return {
    fileHandle,
    isSaving,
    handleNew,
    handleOpen,
    handleSaveAs,
    resetWriteTimer,
  };
}
