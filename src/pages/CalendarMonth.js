import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Popover, Button } from "@mui/material";
import Eventsdata from "./Eventsdata.json";

const CalendarMonth = ({ selectedMonth }) => {
  const [data, setData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setData(Eventsdata.data.getEvents);
  }, []);

  const eventsInSelectedMonth = data.filter((event) => {
    const eventDate = new Date(event.date_event);
    return (
      eventDate.getMonth() === selectedMonth.getMonth() &&
      eventDate.getFullYear() === selectedMonth.getFullYear()
    );
  });

  const eventCounts = {};
  eventsInSelectedMonth.forEach((event) => {
    const eventDate = new Date(event.date_event).getDate();
    eventCounts[eventDate] = (eventCounts[eventDate] || 0) + 1;
  });
  const getEventCountForDate = (date) => eventCounts[date] || 0;

  const handleDayClick = (event, day) => {
    const filteredEvents = eventsInSelectedMonth.filter((event) => {
      const eventDate = new Date(event.date_event).getDate();
      return eventDate === day;
    });
    setSelectedEvent(filteredEvents);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setSelectedEvent(null);
    setAnchorEl(null);
  };

  const daysInMonth = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayIndex = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth()
  ).getDay();
  console.log(firstDayIndex);
  const monthName = selectedMonth.toLocaleString("default", { month: "long" });
  const year = selectedMonth.getFullYear();

  const getDaysArray = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  };
  const daysArray = getDaysArray(1, daysInMonth);
  const open = Boolean(anchorEl);

  return (
    <>
      <h2
        style={{
          textAlign: "center",
          paddingLeft: "20px",
          paddingRight: "20px",
          fontWeight: 700,
          marginBottom: "16px",
        }}
      >{`${monthName} ${year}`}</h2>
      <div
        style={{
          width: "1250px",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
        >
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <div
              key={day}
              style={{
                fontWeight: 700,
                paddingLeft: "12px",
                paddingRight: "12px",
                width: "180px",
                textAlign: "center",
                borderLeftWidth: "1px",
                borderRightWidth: "1px",
                borderBottomWidth: "1px",
                fontSize: "20px",
                lineHeight: "40px",
                borderColor: "#9CA3AF",
              }}
            >
              {day}
            </div>
          ))}
          {[...Array(firstDayIndex - 1).fill(null), ...daysArray].map(
            (day, index) => (
              <div
                key={index}
              
                style={{
                  borderWidth: "1px",
                  top: "8px",
                  right: "8px",
                  borderColor: "#9CA3AF",
                  fontWeight: 700,
                    cursor: "pointer",
                  height:"100px",
                  width: "180px",
                    fontSize: "24px",
                    lineHeight: "32px",
                    position: "relative",
                    backgroundColor:
                      getEventCountForDate(day) >= 20
                        ? "#3B82F6"
                        : getEventCountForDate(day) >= 10
                        ? "#60A5FA"
                        : getEventCountForDate(day) >= 1
                        ? "#BFDBFE"
                        : "",
                 
                }}
                onClick={(event) => handleDayClick(event, day)}
              >
                {day > 0 && (
                  <div>
                    <div
                      style={{
                        paddingLeft: "20px",
                      }}
                    >
                      {day}
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        lineHeight: "28px",
                        textAlign: "center",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      ({getEventCountForDate(day)})
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
        <Popover
          open={selectedEvent && selectedEvent.length > 0 ? open : false}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            style: {
              maxHeight: "40vh",
              maxWidth: "60vh",
              overflowY: "auto",
              overflowX: "auto",
            },
          }}
        >
          {selectedEvent && selectedEvent.length > 0 ? (
            <div className="font-bold py-2 px-5">Events</div>
          ) : (
            ""
          )}

          <div>
            {selectedEvent && selectedEvent.length > 0 ? (
              <Table
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Event Time</TableCell>
                    <TableCell>Asset</TableCell>
                    <TableCell>Event Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedEvent.map((event, index) => {
                    const eventDate = new Date(event.date_event);
                    const formattedTime = eventDate.toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      }
                    );
                    return (
                      <TableRow key={index}>
                        <TableCell>{event.title.en}</TableCell>
                        <TableCell>{formattedTime}</TableCell>
                        <TableCell>
                          {event.coins.map((coin) => coin.fullname).join(", ")}
                        </TableCell>
                        <TableCell>
                          {event.categories
                            .map((category) => category.name)
                            .join(", ")}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              ""
            )}
          </div>
        </Popover>
      </div>
    </>
  );
};

export default CalendarMonth;
