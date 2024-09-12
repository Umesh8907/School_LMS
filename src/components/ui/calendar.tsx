import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import { addYears } from "date-fns"; // Helps for date manipulations
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [month, setMonth] = React.useState<Date>(new Date());
  const currentYear = new Date().getFullYear();
  const yearsRange = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setMonth(addYears(month, newYear - month.getFullYear())); // Update the month to the selected year
  };

  return (
    <DayPicker
      month={month}
      onMonthChange={setMonth}
      selected={selectedDate}
      onSelect={setSelectedDate}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeftIcon
            className="h-4 w-4"
            onClick={() => setMonth(addYears(month, -1))} // Move to previous year
          />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRightIcon
            className="h-4 w-4"
            onClick={() => setMonth(addYears(month, 1))} // Move to next year
          />
        ),
      }}
      {...props}
      captionLayout="dropdown"
      caption={({ date }) => (
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <ChevronLeftIcon
              className="h-4 w-4 cursor-pointer"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))}
            />
            <span>{date.toLocaleDateString("default", { month: "long" })}</span>
            <ChevronRightIcon
              className="h-4 w-4 cursor-pointer"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))}
            />
          </div>
          <select
            value={month.getFullYear()}
            onChange={handleYearChange}
            className="border p-2 rounded-md"
          >
            {yearsRange.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
