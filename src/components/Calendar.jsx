/**
 * Calendar Component - Wall Calendar Dashboard
 *
 * Core container component that manages calendar state, date navigation,
 * and integrates all sub-components (Banner, Grid, Notes).
 *
 * Features:
 * - Month navigation (prev/next)
 * - Date range selection (start → end)
 * - Hover preview for range selection
 * - Centralized notes state via custom hook
 * - Responsive wall calendar layout
 *
 * State:
 * @state {Object} currentDate - Current visible month/year
 * @state {Object} range - Selected date range { start, end }
 * @state {string|null} hoverDate - Hovered date for preview range
 *
 * Methods:
 * @function handleSelectDate - Handles range selection logic
 * @function setCurrentDate - Updates month/year navigation
 *
 */

import {  useState } from "react";
import ImageBanner from "./ImageBanner";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import { useNotes } from "../hooks/useNotes";

const Calendar = () => {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState({
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  const [range, setRange] = useState({ start: null, end: null });
  const [hoverDate, setHoverDate] = useState(null);
  const {notesMap, saveNote } = useNotes();


  const handleSelectDate = (date) => {
    if (!range.start || (range.start && range.end)) {
      setRange({ start: date, end: null });
    } else {
      if (new Date(date) < new Date(range.start)) {
        setRange({ start: date, end: range.start });
      } else {
        setRange({ ...range, end: date });
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-xl bg-white/90 backdrop-blur rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">

        {/* TOP IMAGE */}
        <ImageBanner currentDate={currentDate} />

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">

          {/* LEFT NOTES */}
          <NotesPanel range={range} currentDate={currentDate} notesMap={notesMap} saveNote={saveNote}/>

          {/* RIGHT CALENDAR */}
          <div>
            <CalendarHeader
              currentDate={currentDate}
              onPrev={() =>
                setCurrentDate((p) =>
                  p.month === 0
                    ? { month: 11, year: p.year - 1 }
                    : { ...p, month: p.month - 1 }
                )
              }
              onNext={() =>
                setCurrentDate((p) =>
                  p.month === 11
                    ? { month: 0, year: p.year + 1 }
                    : { ...p, month: p.month + 1 }
                )
              }
            />

            <CalendarGrid
              currentDate={currentDate}
              onSelectDate={handleSelectDate}
              range={range}
              hoverDate={hoverDate}
              setHoverDate={setHoverDate}
              notesMap={notesMap}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;