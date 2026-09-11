import { useState, useEffect } from "react";
import "../css/Calendar.css";

function Calendar() {

    const [width, setWidth] = useState(window.innerWidth);
    const isMobile = width <= 360;

    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1).getDay();

    // Number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Month name
    const monthName = currentDate.toLocaleString("default", {
        month: "long"
    });

    // Today's date
    const today = new Date();

    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    // Create empty spaces before the first day
    const blanks = Array.from({ length: firstDay });

    // Create the days
    const days = Array.from(
        { length: daysInMonth },
        (_, index) => index + 1
    );

    // Combine blanks and days
    const calendarDays = [...blanks.map(() => null), ...days];

    return (
        <div className="calendar">

            {/* Calendar Header */}
            <div className="calendar-header">

                <button onClick={previousMonth}>
                   <img
                                src="arrow.png"
                                style={{ transform: "rotate(180deg)" }}
                                className="workspace-month-arrows calendar-arrows"
                                alt="Previous month"
                            />
                </button>

                <h2>
                    {monthName} {year}
                </h2>

                <button onClick={nextMonth}>
                    <img
                                src="arrow.png"
                                className="workspace-month-arrows calendar-arrows"
                                alt="Previous month"
                            />
                </button>

            </div>


            {/* Calendar Table */}
            <table className="calendar-table">

                <thead>
                    <tr>

                        {isMobile ? (
                            <>
                                <th>Su</th>
                                <th>M</th>
                                <th>T</th>
                                <th>W</th>
                                <th>T</th>
                                <th>F</th>
                                <th>Sa</th>
                            </>
                        ) : (
                            <>
                                <th>Sun</th>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                            </>
                        )}

                    </tr>
                </thead>


                <tbody>

                    {Array.from(
                        { length: Math.ceil(calendarDays.length / 7) },
                        (_, weekIndex) => {

                            const week = calendarDays.slice(
                                weekIndex * 7,
                                weekIndex * 7 + 7
                            );

                            return (
                                <tr key={weekIndex}>

                                    {week.map((day, index) => {

                                        const isToday =
                                            day !== null &&
                                            day === today.getDate() &&
                                            month === today.getMonth() &&
                                            year === today.getFullYear();

                                        return (
                                            <td
                                                key={index}
                                                className={
                                                    isToday
                                                        ? "calendar-day today"
                                                        : "calendar-day"
                                                }
                                            >
                                                {day}
                                            </td>
                                        );

                                    })}

                                </tr>
                            );
                        }
                    )}

                </tbody>

            </table>

        </div>
    );
}

export default Calendar;