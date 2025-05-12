interface Props {
  month: string;
  setMonth: (month: string) => void;
}

export default function MonthNavigator({ month, setMonth }: Props) {
  return (
    <div className="flex justify-center items-center mb-4 font-semibold">
      <button className="mr-4 text-xl">&lt;</button>
      {month}
      <button className="ml-4 text-xl">&gt;</button>
    </div>
  );
}
