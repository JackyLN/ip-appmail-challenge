import { format } from "date-fns";

interface Props {
  month: Date;
  setMonth: (date: Date) => void;
}

export default function MonthNavigator({ month, setMonth }: Props) {
  const prevMonth = () => {
    const newMonth = new Date(month);
    newMonth.setMonth(month.getMonth() - 1);
    setMonth(newMonth);
  };

  const nextMonth = () => {
    const newMonth = new Date(month);
    newMonth.setMonth(month.getMonth() + 1);
    setMonth(newMonth);
  };

  return (
    <div className="month-navigator text-gray-800 text-lg font-medium flex items-center gap-4">
      <button onClick={prevMonth} className="month-button">
        &lt;
      </button>

      <span>{format(month, "MMMM yyyy")}</span>

      <button onClick={nextMonth} className="month-button">
        &gt;
      </button>
    </div>
  );
}
