import { useState, useEffect } from "react";

const NotesPanel = ({ range, currentDate ,setNotesMap }) => {
  const monthKey = `${currentDate.year}-${currentDate.month}`;
  const rangeKey =
    range.start && range.end
      ? `${range.start}_${range.end}`
      : null;

  const storageKey = rangeKey || monthKey;

  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
  const allNotes = JSON.parse(localStorage.getItem("notes-map") || "{}");
  setDraft(allNotes[storageKey] || "");
  }, [storageKey]);

  const handleSave = () => {
  const allNotes = JSON.parse(localStorage.getItem("notes-map") || "{}");

  allNotes[storageKey] = draft;

  localStorage.setItem("notes-map", JSON.stringify(allNotes));
  setNotesMap({...allNotes})
  setSaved(true);
  setTimeout(() => setSaved(false), 1200);
};

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold text-sm">Notes</h3>

      <p className="text-xs text-gray-500">
        {rangeKey
          ? "Notes for selected range"
          : "Notes for this month"}
      </p>

      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        className="w-full h-28 p-2 border rounded-lg text-sm"
        placeholder="Write notes..."
      />

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="flex-1 bg-[var(--primary)] text-white py-1 rounded"
        >
          Save
        </button>

        <button
          onClick={() => setDraft("")}
          className="flex-1 bg-gray-200 py-1 rounded"
        >
          Clear
        </button>
      </div>

      {saved && (
        <span className="text-green-500 text-xs">
          Saved ✓
        </span>
      )}
    </div>
  );
};

export default NotesPanel;