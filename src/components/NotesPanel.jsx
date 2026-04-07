/**
 * NotesPanel Component - Notes Management Interface
 *
 * Allows users to create and manage notes associated with:
 * - Entire month
 * - Selected date range
 *
 * Features:
 * - Context-aware notes (month vs range)
 * - Local persistence via custom hook
 * - Save and clear actions
 * - Instant UI update without reload
 *
 * Props:
 * @param {Object} range - Selected date range
 * @param {Object} currentDate - Current month/year
 * @param {Function} saveNote - Function to persist notes
 *
 * State:
 * @state {string} draft - Current note input
 * @state {boolean} saved - Save confirmation indicator
 *
 * Methods:
 * @function handleSave - Saves note to global state + localStorage
 *
 * Storage Strategy:
 * - Month key: "YYYY-M"
 * - Range key: "startDate_endDate"
 */

import { useState, useEffect } from "react";

const NotesPanel = ({ range, currentDate, notesMap,saveNote }) => {
  const monthKey = `${currentDate.year}-${currentDate.month}`;
  const rangeKey =
    range.start && range.end ? `${range.start}_${range.end}` : null;

  const storageKey = rangeKey || monthKey;

  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(notesMap[storageKey] || "");
  }, [storageKey, notesMap]);

  const handleSave = () => {
    saveNote(storageKey, draft);

    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  return (
    <div className="flex flex-col gap-2 bg-gray-50 rounded-xl p-3 shadow-inner">
      <h3 className="font-semibold text-sm">Notes</h3>

      <p className="text-xs text-gray-500">
        {rangeKey ? "Notes for selected range" : "Notes for this month"}
      </p>

      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        className="w-full h-28 p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
        placeholder="Write notes..."
      />

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="flex-1 bg-[var(--primary)] text-white py-1.5 rounded-lg hover:opacity-90 transition"
        >
          Save
        </button>

        <button
          onClick={() => setDraft("")}
          className="flex-1 bg-gray-200 py-1.5 rounded-lg hover:bg-gray-300 transition"
        >
          Clear
        </button>
      </div>

      {saved && <span className="text-green-500 text-xs">Saved</span>}
    </div>
  );
};

export default NotesPanel;
