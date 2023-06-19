import { DateTime } from "luxon";

export default function DateRangeDisplay({
  endDate,
  startDate,
}: {
  startDate: DateTime | null;
  endDate: DateTime | null;
}) {
  if (endDate === null && startDate === null) {
    return null;
  }

  if (endDate === null) {
    return (
      <>
        {startDate?.toLocaleString({ month: "long", year: "numeric" })} –
        Present
      </>
    );
  }

  if (startDate === null) {
    return <>{endDate.year}</>;
  }

  if (startDate.month === endDate.month && startDate.year === endDate.year) {
    return <>{startDate.toLocaleString({ month: "long", year: "numeric" })}</>;
  }

  if (startDate.year === endDate.year) {
    return (
      <>
        {startDate.toLocaleString({ month: "long" })}
        &nbsp;–&nbsp;
        {endDate.toLocaleString({ month: "long", year: "numeric" })}
      </>
    );
  }

  return (
    <>
      {startDate.year} – {endDate.year}
    </>
  );
}
