import { useEffect, useState } from "react";
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
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* TOP IMAGE */}
        <ImageBanner currentDate={currentDate} />

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">

          {/* LEFT NOTES */}
          <NotesPanel range={range} currentDate={currentDate} saveNote={saveNote}/>

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
              saveNote={saveNote}
              notesMap={notesMap}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;