/**
 * CalendarGrid Component - Interactive Date Grid
 *
 * Renders the calendar days for a given month and handles user interaction
 * including range selection, hover preview, and note visualization.
 *
 * Features:
 * - Dynamic grid generation based on month/year
 * - Range selection highlighting (start, end, in-between)
 * - Hover preview for range selection
 * - Notes integration (date, range, and monthly notes)
 * - Tooltip preview for notes (desktop)
 * - Mobile fallback interaction (tap → alert)
 *
 * Props:
 * @param {Object} currentDate - { month, year }
 * @param {Function} onSelectDate - Callback when date is selected
 * @param {Object} range - Selected range { start, end }
 * @param {string|null} hoverDate - Hovered date
 * @param {Function} setHoverDate - Updates hover state
 * @param {Object} notesMap - Stored notes keyed by date/range/month
 *
 * State:
 * @state {Object|null} hoveredNote - Tooltip note { date, text }
 *
 * Methods:
 * @function isInRange - Checks if date lies within selected range
 * @function isPreview - Handles hover-based preview range
 * @function getNoteForDate - Resolves note for a given date
 *
 * UX Behavior:
 * - Hover shows tooltip (desktop)
 * - Click shows alert (mobile fallback)
 * - Notes visually highlighted with indicator
 */

import { useState } from "react";
import { getDaysInMonth, getFirstDayOfMonth } from "../utils/dateUtils";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarGrid = ({
  currentDate,
  onSelectDate,
  range,
  hoverDate,
  setHoverDate,
  notesMap = {},
}) => {
  const { month, year } = currentDate;
  const totalDays = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();

  const [hoveredNote, setHoveredNote] = useState(null);

  const cells = [];

  // Empty cells
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} />);
  }

  const parseDate = (str) => {
    const [y, m, d] = str.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  // Helpers
  const isInRange = (date) => {
    if (!range.start || !range.end) return false;

    const d = parseDate(date);
    const s = parseDate(range.start);
    const e = parseDate(range.end);

    return d > s && d < e;
  };

  const isPreview = (date) => {
    if (!range.start || range.end || !hoverDate) return false;
    const d = parseDate(date);
    const s = parseDate(range.start);
    const hd = parseDate(hoverDate);
    return d > s && d < hd;
  };

  // Get note for date
  const getNoteForDate = (date) => {
    const d = parseDate(date);

    for (let key in notesMap) {
      // RANGE NOTE
      if (key.includes("_")) {
        const [start, end] = key.split("_");

        const s = parseDate(start);
        const e = parseDate(end);

        if (d >= s && d <= e) {
          return notesMap[key];
        }
      }

      // MONTH NOTE
      else {
        const [y, m] = key.split("-").map(Number);

        if (y === year && m === month + 1) {
          return notesMap[key];
        }
      }
    }

    return null;
  };
  // Days
  for (let day = 1; day <= totalDays; day++) {
    const dateKey = `${year}-${month + 1}-${day}`;

    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    const note = getNoteForDate(dateKey);
    const hasNote = !!note;

    cells.push(
      <div
        key={dateKey}
        onClick={() => {
          onSelectDate(dateKey);

          //  Mobile fallback
          if (note) {
            alert(note);
          }
        }}
        onMouseEnter={() => {
          setHoverDate(dateKey);
          if (note) setHoveredNote({ date: dateKey, text: note });
        }}
        onMouseLeave={() => {
          setHoverDate(null);
          setHoveredNote(null);
        }}
        className={`
            relative h-10 flex items-center justify-center text-sm rounded-xl cursor-pointer
            transition-all duration-200 ease-out
            ${isToday ? "border border-[var(--primary)] font-semibold" : ""}
            ${range.start === dateKey ? "bg-[var(--primary)] text-white rounded-full scale-105" : ""}
            ${range.end === dateKey ? "bg-[var(--primary)] text-white rounded-full scale-105" : ""}
            ${isInRange(dateKey) ? "bg-blue-200/70" : ""}
            ${isPreview(dateKey) ? "bg-blue-100" : ""}
            ${hasNote ? "bg-red-50 border border-red-300" : ""}
            hover:bg-gray-100 hover:scale-110 hover:shadow-sm
            `}
      >
        {day}

        {/* Tooltip */}
        {hoveredNote?.date === dateKey && (
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {hoveredNote.text}
          </div>
        )}
      </div>,
    );
  }

  return (
    <div className="grid grid-cols-7 gap-2 text-sm">
      {days.map((d) => (
        <div key={d} className="text-center font-semibold">
          {d}
        </div>
      ))}
      {cells}
    </div>
  );
};

export default CalendarGrid;
