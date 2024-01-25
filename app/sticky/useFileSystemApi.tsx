import { useEffect, useMemo, useState } from "react";

import { NoteData } from "./Board/Board";
import { sampleData } from "./sampleData";

export function useFileSystemApi({
  notes,
  setNotes,
}: {
  notes: NoteData[];
  setNotes: (notes: NoteData[]) => void;
}) {
  const filePickerOptions: OpenFilePickerOptions = {
    types: [{ description: "JSON", accept: { "application/json": [".json"] } }],
  };

  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle>();
  const [writeTimer, setWriteTimer] = useState<NodeJS.Timeout>();
  const isSaving = useMemo(() => writeTimer != null, [writeTimer]);

  // const [db, setDb] = useState<IDBDatabase>();

  // useEffect(() => {
  //   const request = indexedDB.open("StickyNotes");
  //   request.onerror = (event) => {
  //     console.error("Unable to open indexedDB!");
  //   };
  //   request.onupgradeneeded = (event) => {
  //     const db = (event.target as IDBRequest).result as IDBDatabase;
  //     db.createObjectStore("fileHandle", { keyPath: "key" });
  //   };
  //   request.onsuccess = (event) => {
  //     const db = (event.target as IDBRequest).result as IDBDatabase;
  //     setDb(db);

  //     const transaction = db.transaction("fileHandle");
  //     const objectStore = transaction.objectStore("fileHandle");
  //     const request = objectStore.get("fileHandle");
  //     request.onerror = (event) => {};
  //     request.onsuccess = async (event) => {
  //       const fileHandle = request.result.fileHandle as FileSystemFileHandle;
  //       confirm("xx");
  //       await fileHandle.requestPermission({ mode: "readwrite" });
  //       await fileHandle.createWritable();
  //       setFileHandle(fileHandle);

  //       const file = await fileHandle.getFile();
  //       const text = await file.text();
  //       setNotes(JSON.parse(text));
  //     };
  //   };
  // }, []);

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
    if (haveUnsavedChanges && !confirmUnsavedChanges()) return;

    try {
      const [fileHandle] = await window.showOpenFilePicker(filePickerOptions);
      await fileHandle?.createWritable();
      setFileHandle(fileHandle);

      const file = await fileHandle.getFile();
      const text = await file.text();
      setNotes(JSON.parse(text));

      // if (!db) return;
      // const transaction = db.transaction("fileHandle", "readwrite");

      // transaction.oncomplete = (event) => {
      //   console.log("All done!");
      // };
      // transaction.onerror = (event) => {
      //   console.log("Error!");
      // };

      // const objectStore = transaction.objectStore("fileHandle");
      // const request = objectStore.add({
      //   key: "fileHandle",
      //   fileHandle: fileHandle,
      // });
    } catch (e) {
      return;
    }
  }

  async function handleSaveAs() {
    if (haveUnsavedChanges && !confirmUnsavedChanges()) return;

    try {
      const fileHandle = await window.showSaveFilePicker(filePickerOptions);
      await fileHandle?.createWritable();
      setFileHandle(fileHandle);

      const writable = await fileHandle?.createWritable();
      await writable.write(JSON.stringify(notes, undefined, 4));
      await writable.close();
    } catch (e) {
      return;
    }
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
