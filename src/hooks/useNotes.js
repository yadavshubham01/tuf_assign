/**
 * useNotes Hook - Centralized Notes State Management
 *
 * Provides a single source of truth for all notes across the application.
 * Handles synchronization between React state and localStorage.
 *
 * Features:
 * - Initializes notes from localStorage
 * - Provides save/update functionality
 * - Ensures reactive UI updates
 *
 * Returns:
 * @returns {Object} notesMap - All stored notes
 * @returns {Function} saveNote - Function to save/update a note
 *
 * Methods:
 * @function saveNote - Updates notesMap and persists to localStorage
 *
 * Architecture:
 * - React state = primary source of truth
 * - localStorage = persistence layer
 */

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