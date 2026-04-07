import { useState, useEffect } from "react";

export const useNotes = () => {
  const [notesMap, setNotesMap] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("notes-map") || "{}");
    setNotesMap(stored);
  }, []);

  const saveNote = (key, value) => {
    const updated = { ...notesMap, [key]: value };

    setNotesMap(updated); 
    localStorage.setItem("notes-map", JSON.stringify(updated)); 
  };

  return { notesMap, saveNote };
};