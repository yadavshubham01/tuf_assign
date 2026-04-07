import { useEffect, useState } from "react";
import { getDaysInMonth, getFirstDayOfMonth } from "../utils/dateUtils";

const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const CalendarGrid = ({
  currentDate,
  onSelectDate,
  range,
  hoverDate,
  setHoverDate,
  notesMap = {}
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
     const hd= parseDate(hoverDate);
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
          relative h-10 flex items-center justify-center text-sm rounded-lg cursor-pointer transition-all

          ${isToday ? "border border-[var(--primary)]" : ""}

          ${range.start === dateKey ? "bg-[var(--primary)] text-white rounded-full" : ""}
          ${range.end === dateKey ? "bg-[var(--primary)] text-white rounded-full" : ""}

          ${isInRange(dateKey) ? "bg-blue-200" : ""}
          ${isPreview(dateKey) ? "bg-blue-100" : ""}

          ${hasNote ? "bg-blue-200 border border-blue-300" : ""}

          hover:scale-105 hover:text-[var(--primary)]
        `}
      >
        {day}


        {/* Tooltip */}
        {hoveredNote?.date === dateKey && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-36 bg-black text-white text-xs p-2 rounded shadow-lg z-50 animate-fadeIn">
            {hoveredNote.text}
          </div>
        )}
      </div>
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