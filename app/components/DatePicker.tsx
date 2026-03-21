"use client";

import { useState, useRef, useEffect } from "react";

const DatePicker = ({
  value,
  onChange,
}: {
  value?: Date;
  onChange?: (date: Date) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const handleSelect = (day: number) => {
    const selected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    onChange?.(selected); 
    setOpen(false);
  };

  const formatDate = (date?: Date) => {
  if (!date) return "Select date";

  return date.toLocaleDateString("en-GB");
};

  return (
    <div className="relative w-full" ref={ref}>
      {/* Input */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full border border-zinc-700 bg-zinc-900 text-white rounded-lg px-4 py-3 text-left hover:border-zinc-500"
      >
        {formatDate(value)}
      </button>

      {/* Calendar */}
      {open && (
        <div className="absolute my-2 w-72 bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg p-4 z-50 text-white">
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1
                  )
                )
              }
              className="hover:text-gray-400"
            >
              ←
            </button>

            <span className="font-medium">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>

            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1
                  )
                )
              }
              className="hover:text-gray-400"
            >
              →
            </button>
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="text-gray-500">
                {d}
              </div>
            ))}

            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={i}></div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              return (
                <button
                  key={day}
                  onClick={() => handleSelect(day)}
                  className="py-1 rounded hover:bg-zinc-700 transition"
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;