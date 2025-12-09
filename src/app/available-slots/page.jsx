"use client";

import React, { useEffect, useMemo, useState } from "react";

/**
 Final Available Slots Page (Dark theme, Premium, Centered)
 - All 3 phases: Day / Night / Midnight (slots from image)
 - Weekday: Sun,Mon,Tue,Wed  | Weekend: Thu,Fri,Sat
 - Date picker on top (blocks past dates)
 - If selected date is today, past slot start times are disabled/greyed
 - Prices auto-update based on weekday/weekend
 - Everything centered, larger & bolder typography, big date bar
 - Deterministic date formatting (no locale-sensitive functions) to avoid hydration mismatch
*/

export default function AvailableSlotsPage() {
  // ---- date helpers (deterministic) ----
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const WEEKDAY_LONG = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  function formatNiceDet(dateISO) {
    if (!dateISO) return "";
    const d = new Date(dateISO + "T00:00:00");
    const day = String(d.getDate()).padStart(2, "0");
    const month = MONTHS[d.getMonth()];
    const year = d.getFullYear();
    const short = WEEKDAY_SHORT[d.getDay()];
    return `${short}, ${day} ${month} ${year}`; // e.g. Tue, 09 Dec 2025
  }

  function getDayNameDet(dateISO) {
    if (!dateISO) return "";
    const d = new Date(dateISO + "T00:00:00");
    return WEEKDAY_LONG[d.getDay()];
  }

  // ---- phases & slots ----
  const phases = useMemo(
    () => [
      {
        key: "day",
        title: "Day (06:00 AM - 03:50 PM)",
        weekdayPrice: 2800,
        weekendPrice: 3300,
        slots: [
          "06:00 AM - 07:30 AM",
          "07:40 AM - 09:10 AM",
          "09:20 AM - 10:50 AM",
          "11:00 AM - 12:30 PM",
          "12:40 PM - 02:10 PM",
          "02:20 PM - 03:50 PM",
        ],
      },
      {
        key: "night",
        title: "Night (04:00 PM - 12:10 AM)",
        weekdayPrice: 4000,
        weekendPrice: 4500,
        slots: [
          "04:00 PM - 05:30 PM",
          "05:40 PM - 07:10 PM",
          "07:20 PM - 08:50 PM",
          "09:00 PM - 10:30 PM",
          "10:40 PM - 12:10 AM",
        ],
      },
      {
        key: "midnight",
        title: "Midnight (12:20 AM - 05:10 AM)",
        weekdayPrice: 3500,
        weekendPrice: 4000,
        slots: [
          "12:20 AM - 01:50 AM",
          "02:00 AM - 03:30 AM",
          "03:40 AM - 05:10 AM",
        ],
      },
    ],
    []
  );

  // ---- state ----
  const [selectedDate, setSelectedDate] = useState(() => todayISO());
  const [isWeekendForDate, setIsWeekendForDate] = useState(false);

  useEffect(() => {
    const d = new Date(selectedDate + "T00:00:00");
    const dow = d.getDay(); // 0=Sun ... 6=Sat
    setIsWeekendForDate(dow === 4 || dow === 5 || dow === 6); // Thu(4), Fri(5), Sat(6)
  }, [selectedDate]);

  // ---- time parsing (convert "06:00 AM" to 24h numbers) ----
  function parseTimePart(timeStr) {
    // e.g. "06:00 AM" or "12:20 AM" or "04:00 PM"
    const [time, meridian] = timeStr.trim().split(" ");
    const [hh, mm] = time.split(":").map(Number);
    let hours = hh % 12; // 12 -> 0 for AM/PM logic
    if (meridian && meridian.toUpperCase() === "PM") hours += 12;
    return { hours, minutes: mm };
  }

  // ---- determine if a slot start is past when selected date is today ----
  function slotIsPast(selectedDateISO, slotStr) {
    // slotStr example: "06:00 AM - 07:30 AM"
    const startPart = slotStr.split("-")[0].trim(); // "06:00 AM"
    const { hours, minutes } = parseTimePart(startPart);

    // Build slot start Date on selectedDate
    // Note: For times after midnight (00:xx) this is still the same calendar day early morning.
    const slotDate = new Date(selectedDateISO + "T00:00:00");
    slotDate.setHours(hours, minutes, 0, 0);

    const now = new Date();
    const todayIso = todayISO();

    // Only mark as past if selected date is today
    if (selectedDateISO !== todayIso) return false;

    // If slotDate <= now, it's past/unavailable
    return slotDate <= now;
  }

  // ---- booking placeholder ----
  function handleBook(slotStr, phase) {
    const price = isWeekendForDate ? phase.weekendPrice : phase.weekdayPrice;
    // Replace this with real booking flow later
    alert(
      `Booking placeholder\nDate: ${formatNiceDet(
        selectedDate
      )} (${getDayNameDet(selectedDate)})\nSlot: ${slotStr}\nPhase: ${
        phase.title
      }\nPrice: ${price} TAKA`
    );
  }

  // ---- styles + rendering ----
  return (
    <>
      <style>{`
        :root{
          --bg1: #06120b;
          --bg2: #071a0f;
          --panel: rgba(255,255,255,0.03);
          --accent: #12d37f;
          --muted: rgba(255,255,255,0.85);
        }

        * { box-sizing: border-box; }
        html,body { margin:0; padding:0; }

        .page {
            background: linear-gradient(180deg, var(--bg1) 0%, var(--bg2) 100%);
            color: white;
            display: flex;
            justify-content: center;
            padding: 30px 18px 10px;    /* ⬅️ Reduced bottom padding */
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          
            /* REMOVE the minimum height so no forced empty space */
            min-height: 0;              /* ⬅️ Important fix */
          }

        .wrap {
          width: 100%;
          max-width: 1100px;
          display:flex;
          flex-direction:column;
          align-items:center;
        }

        /* BIG DATE BAR */
        .date-bar {
          width: 100%;
          max-width: 820px;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.04);
          padding: 22px 28px;
          border-radius: 14px;
          display:flex;
          align-items:center;
          justify-content: space-between;
          gap: 16px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
          margin-bottom:18px;
        }

        .date-left {
          display:flex;
          flex-direction:column;
          gap:2px;
        }

        .date-day {
          font-size: 1.05rem;
          color: #bfe7cf;
          font-weight: 700;
        }

        .date-full {
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: 0.6px;
          text-shadow: 2px 2px 12px rgba(0,0,0,0.6);
        }

        .date-right { display:flex; align-items:center; gap:12px; }

        .date-input {
            appearance: none;
            width: 275px;
            border: 1px solid rgba(255,255,255,0.18);
            background: rgba(255,255,255,0.12);
            color: white;
            padding: 14px 16px;
            border-radius: 10px;
            font-weight: 700;
            font-size: 1.25rem;
            text-align: center;               /* ⬅️ DATE TEXT CENTERED */
            backdrop-filter: blur(4px);
            box-shadow: 0 0 10px rgba(255,255,255,0.08);
          }

          

        .info-row {
          margin-top:10px;
          color:#cfeedd;
          font-weight:600;
          font-size:0.95rem;
        }

        /* main title */
        .title {
          text-align:center;
          margin: 20px 0 8px;
        }
        .title h1 {
          font-size: 2rem;
          margin:0;
          font-weight:900;
          text-shadow: 2px 2px 12px rgba(0,0,0,0.6);
        }
        .title p { margin:8px 0 0; color:#bfe7cf; font-weight:600; }

        /* sections */
        .sections {
          width:100%;
          margin-top:20px;
          display:flex;
          flex-direction:column;
          gap:28px;
          align-items:center;
        }

        .phase {
          width:100%;
          max-width: 980px;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border-radius:12px;
          padding:18px;
          border: 1px solid rgba(255,255,255,0.04);
        }

        .phase-head {
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:12px;
          margin-bottom:14px;
        }

        .phase-title {
          font-size: 1.1rem;
          font-weight:900;
          letter-spacing:0.6px;
        }

        .phase-price {
          background: rgba(31,138,42,0.10);
          color: var(--accent);
          padding:8px 12px;
          border-radius:10px;
          font-weight:800;
        }

        .slots-grid {
          display:grid;
          grid-template-columns: repeat(2, 1fr);
          gap:12px;
        }

        .slot {
          background: rgba(255,255,255,0.03);
          padding:14px;
          border-radius:10px;
          display:flex;
          flex-direction:column;
          gap:8px;
          border: 1px solid rgba(255,255,255,0.03);
          transition: transform 0.12s ease, box-shadow 0.12s ease;
        }

        .slot:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        }

        .slot.unavailable {
          background: rgba(120,120,120,0.12);
          color: #d0d0d0;
          border: 1px solid rgba(255,255,255,0.02);
        }

        .slot-time {
          font-weight:800;
          font-size:1rem;
        }

        .slot-row {
          display:flex;
          justify-content:space-between;
          align-items:center;
        }

        .slot-price {
          font-weight:900;
          color:#e6ffe9;
          font-size:0.98rem;
        }

        .slot-available {
          font-size:0.87rem;
          color:#cfeedd;
          font-weight:700;
        }

        .book-btn {
          margin-top:8px;
          padding:10px 12px;
          border-radius:8px;
          border:none;
          font-weight:900;
          cursor:pointer;
          background: linear-gradient(180deg,#ffd84d,#f6c42d);
          color:#000;
        }

        .book-btn[disabled] {
          background: rgba(200,200,200,0.6);
          cursor:not-allowed;
          color:#444;
        }

        .note {
          margin-top:18px;
          color:#bcdcc7;
          font-size:13px;
          text-align:center;
        }

        @media (max-width:920px) {
          .slots-grid { grid-template-columns: 1fr; }
          .date-bar { padding:18px; flex-direction:column; align-items:flex-start; gap:10px; }
          .date-right { width:100%; justify-content:flex-end; }
          .date-input { width: 100%; max-width:220px; }
        }
      `}</style>

      <main className="page" aria-live="polite">
        <div className="wrap">
          {/* Big date bar */}
          <div className="date-bar" role="region" aria-label="date selector">
            <div className="date-left" aria-hidden="false">
              <div className="date-day">{getDayNameDet(selectedDate)}</div>
              <div className="date-full">{formatNiceDet(selectedDate)}</div>
              <div className="info-row">Pick a date (today onward)</div>
            </div>

            <div className="date-right">
              <input
                aria-label="Choose booking date"
                className="date-input"
                type="date"
                value={selectedDate}
                min={todayISO()}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          {/* Page title */}
          <div className="title" role="heading" aria-level={1}>
            <h1>Available Slots</h1>
            <p>
              Pricing mode:{" "}
              <strong style={{ color: "#fff" }}>
                {isWeekendForDate ? "Weekend" : "Weekday"}
              </strong>{" "}
              — (Weekend = Thu/Fri/Sat)
            </p>
          </div>

          {/* Sections */}
          <div className="sections" role="main">
            {phases.map((phase) => {
              const phasePrice = isWeekendForDate
                ? phase.weekendPrice
                : phase.weekdayPrice;
              return (
                <section
                  className="phase"
                  key={phase.key}
                  aria-labelledby={`phase-${phase.key}`}
                >
                  <div className="phase-head">
                    <div id={`phase-${phase.key}`} className="phase-title">
                      {phase.title}
                    </div>
                    <div className="phase-price">{phasePrice} TAKA</div>
                  </div>

                  <div className="slots-grid" role="list">
                    {phase.slots.map((slotStr, idx) => {
                      const past = slotIsPast(selectedDate, slotStr);
                      return (
                        <div
                          className={`slot ${past ? "unavailable" : ""}`}
                          key={idx}
                          role="listitem"
                          aria-disabled={past}
                        >
                          <div className="slot-time">{slotStr}</div>

                          <div className="slot-row">
                            <div className="slot-price">{phasePrice} TAKA</div>
                            <div className="slot-available">
                              {past ? "Unavailable" : "Available"}
                            </div>
                          </div>

                          <button
                            className="book-btn"
                            disabled={past}
                            onClick={() => handleBook(slotStr, phase)}
                          >
                            {past ? "Unavailable" : "Book Now"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          <div className="note">
            Past times (for today) are automatically blocked. Choose a future
            date to book any slot.
          </div>
        </div>
      </main>
    </>
  );
}

/* ---------- helper functions (deterministic) ---------- */

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
function parseTimePart(timeStr) {
  const [time, meridian] = timeStr.trim().split(" ");
  const [hh, mm] = time.split(":").map(Number);
  let hours = hh % 12;
  if (meridian && meridian.toUpperCase() === "PM") hours += 12;
  return { hours, minutes: mm };
}
function slotIsPast(selectedDateISO, slotStr) {
  const startPart = slotStr.split("-")[0].trim();
  const { hours, minutes } = parseTimePart(startPart);
  const slotDate = new Date(selectedDateISO + "T00:00:00");
  slotDate.setHours(hours, minutes, 0, 0);

  const now = new Date();
  const todayIso = todayISO();
  if (selectedDateISO !== todayIso) return false;
  return slotDate <= now;
}
function formatNiceDet(dateISO) {
  try {
    const MONTHS = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const d = new Date(dateISO + "T00:00:00");
    const day = String(d.getDate()).padStart(2, "0");
    const month = MONTHS[d.getMonth()];
    const year = d.getFullYear();
    const short = WEEKDAY_SHORT[d.getDay()];
    return `${short}, ${day} ${month} ${year}`;
  } catch {
    return dateISO;
  }
}
function getDayNameDet(dateISO) {
  try {
    const WEEKDAY_LONG = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const d = new Date(dateISO + "T00:00:00");
    return WEEKDAY_LONG[d.getDay()];
  } catch {
    return "";
  }
}
