import { MONTHS } from "../utils/dateUtils";
 
const CalendarHeader = ({ currentDate, onPrev, onNext }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <button onClick={onPrev} className="px-3 py-1 bg-blue-500 text-white rounded">
        ← 
      </button>

      <h2 className="font-semibold">
        {MONTHS[currentDate.month]} {currentDate.year}
      </h2>

      <button onClick={onNext} className="px-3 py-1 bg-blue-500 text-white rounded">
        →
      </button>
    </div>
  );
};

export default CalendarHeader;