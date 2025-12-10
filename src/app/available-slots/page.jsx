"use client";

import React, { useEffect, useMemo, useState } from "react";

/**
 AvailableSlotsPage - Premium Neon Glow (one-file)
 - Design A: neon green on dark
 - Large cards, focusable, keyboard accessible
 - Date picker blocks past dates
 - Past slots disabled for today
 - Deterministic date formatting to avoid hydration issues
*/

export default function AvailableSlotsPage() {
  /* ---------- Deterministic date helpers ---------- */
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
    try {
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
      const d = new Date(dateISO + "T00:00:00");
      return WEEKDAY_LONG[d.getDay()];
    } catch {
      return "";
    }
  }

  /* ---------- Phase and slot data ---------- */
  const phases = useMemo(
    () => [
      {
        key: "day",
        title: "Day — 06:00 AM - 03:50 PM",
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
        title: "Night — 04:00 PM - 12:10 AM",
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
        title: "Midnight — 12:20 AM - 05:10 AM",
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

  /* ---------- State ---------- */
  const [selectedDate, setSelectedDate] = useState(() => todayISO());
  const [isWeekendForDate, setIsWeekendForDate] = useState(false);
  const [flashId, setFlashId] = useState(null); // for small feedback animation

  useEffect(() => {
    const d = new Date(selectedDate + "T00:00:00");
    const dow = d.getDay(); // 0=Sun ... 6=Sat
    setIsWeekendForDate(dow === 4 || dow === 5 || dow === 6); // Thu(4), Fri(5), Sat(6)
  }, [selectedDate]);

  useEffect(() => {
    // small mount animation hook
    const el = document.querySelector(".neon-wrap");
    if (el) el.classList.add("enter");
  }, []);

  /* ---------- Time helpers ---------- */
  function parseTimePart(timeStr) {
    // "06:00 AM" -> {hours:6, minutes:0}
    const [time, meridian] = timeStr.trim().split(" ");
    const [hh, mm] = time.split(":").map(Number);
    let hours = hh % 12;
    if (meridian && meridian.toUpperCase() === "PM") hours += 12;
    return { hours, minutes: mm };
  }

  function slotIsPast(dateISO, slotStr) {
    // Only mark past when selected date is today
    const todayIso = todayISO();
    if (dateISO !== todayIso) return false;
    const startPart = slotStr.split("-")[0].trim();
    const { hours, minutes } = parseTimePart(startPart);
    const slotDate = new Date(dateISO + "T00:00:00");
    slotDate.setHours(hours, minutes, 0, 0);
    const now = new Date();
    return slotDate <= now;
  }

  function handleBook(slotStr, phase) {
    const price = isWeekendForDate ? phase.weekendPrice : phase.weekdayPrice;
    // tiny visual feedback
    setFlashId(Math.random().toString(36).slice(2, 8));
    setTimeout(() => setFlashId(null), 900);
    // placeholder action (replace with real booking flow)
    alert(
      `Booking placeholder\nDate: ${formatNiceDet(
        selectedDate
      )} (${getDayNameDet(selectedDate)})\nSlot: ${slotStr}\nPhase: ${
        phase.title
      }\nPrice: ${price} TAKA`
    );
  }

  /* ---------- Render ---------- */
  return (
    <>
      {/* Google fonts for neon / headings */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700;900&family=Orbitron:wght@600;700;900&display=swap"
        rel="stylesheet"
      />

      <style>{`
        :root{
          --bg-dark: #03120a;
          --panel: rgba(255,255,255,0.03);
          --neon: #00ff84;
          --neon-2: #00ffaa;
          --muted: rgba(255,255,255,0.85);
          --glass: rgba(255,255,255,0.04);
        }
        *{box-sizing: border-box}
        html,body{margin:0;padding:0}

        /* Page wrap (centered) */
        .neon-page {
          display:flex;
          justify-content:center;
          padding: 28px 18px 20px;
          background: linear-gradient(180deg, #04130b 0%, #071a10 100%);
          color: white;
          min-height: auto; /* do not force huge min-height */
        }

        .neon-wrap {
          width:100%;
          max-width: 1100px;
          display:flex;
          flex-direction:column;
          gap:20px;
          transform: translateY(14px);
          opacity: 0;
          transition: transform 600ms cubic-bezier(.2,.9,.2,1), opacity 600ms ease;
        }
        .neon-wrap.enter { transform: translateY(0); opacity:1; }

        /* Hero / date bar */
        .hero {
          display:flex;
          gap:20px;
          align-items:center;
          justify-content:space-between;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border: 1px solid var(--glass);
          padding: 22px;
          border-radius: 14px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
        }

        .hero-left {
          display:flex;
          flex-direction:column;
          gap:4px;
        }
        .hero-title {
          font-family: "Orbitron", sans-serif;
          letter-spacing: 1px;
          color: var(--neon);
          font-size: 1.6rem;
          font-weight: 800;
          text-shadow: 0 6px 30px rgba(0,255,136,0.08), 0 0 10px rgba(0,255,136,0.06);
        }
        .hero-sub {
          color: #bfe7cf;
          font-weight:700;
          font-size:0.95rem;
        }

        .date-block {
          display:flex;
          gap:12px;
          align-items:center;
        }
        .date-big {
          font-weight:900;
          color: var(--muted);
          font-size: 1.05rem;
          text-shadow: 0 6px 20px rgba(0,0,0,0.6);
        }

        .date-input {
            appearance: none;
            background: linear-gradient(180deg, rgba(60,40,10,0.35), rgba(45,30,5,0.28));
            border: 1px solid rgba(200,140,60,0.45);
            padding: 12px 14px;
            border-radius: 10px;
            font-weight: 800;
            font-size: 1rem;
            color: #ffe9c4;
            width: 260px;
            text-align: center;
          
            /* matching bronze glow */
            box-shadow: 
              0 6px 30px rgba(45,30,5,0.6),
              0 0 14px rgba(200,140,60,0.18) inset;
          }
          
        .date-input:focus { outline: 2px solid rgba(0,255,136,0.14); box-shadow: 0 10px 40px rgba(0,255,136,0.06); }

        /* Controls / note */
        .mode-pill {
          padding:8px 12px;
          border-radius:999px;
          background: linear-gradient(90deg, rgba(0,255,136,0.06), rgba(0,255,136,0.02));
          border: 1px solid rgba(0,255,136,0.06);
          color: var(--neon);
          font-weight:900;
          letter-spacing:0.6px;
        }

        /* Sections title */
        .page-title {
          text-align:center;
          font-family: "Orbitron", sans-serif;
          color: var(--neon-2);
          font-size: 2rem;
          font-weight:900;
          text-shadow: 0 8px 30px rgba(0,255,170,0.06), 0 0 18px rgba(0,255,170,0.06);
        }
        .page-sub {
          text-align:center;
          color:#cfeedd;
          font-weight:700;
        }

        /* Phase card */
        .phase {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border-radius: 12px;
          padding: 18px;
          border: 1px solid rgba(0,0,0,0.45);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }
        .phase-head {
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:12px;
          margin-bottom:14px;
        }
        .phase-title {
          font-weight:900;
          letter-spacing:0.6px;
          color: #e6ffe9;
          font-size:1.05rem;
        }
        .phase-price {
          background: linear-gradient(180deg, rgba(0,255,136,0.06), rgba(0,255,136,0.02));
          color: var(--neon);
          padding:8px 12px;
          border-radius:10px;
          font-weight:900;
        }

        /* Slots grid - big cards */
        .slots-grid {
          display:grid;
          grid-template-columns: repeat(2, 1fr);
          gap:16px;
        }

        .slot-card {
            background: linear-gradient(180deg, rgba(60,40,10,0.9), rgba(45,30,5,0.75));
            border-radius: 12px;
            padding: 16px;
            border: 1px solid rgba(200,140,60,0.35);
            transition: transform 220ms cubic-bezier(.2,.9,.2,1),
                        box-shadow 220ms ease,
                        border-color 220ms ease;
            display: flex;
            flex-direction: column;
            gap: 10px;
            box-shadow: 0 6px 18px rgba(60,40,10,0.7);
          }
          
          .slot-card::before {
            content: "";
            width: 6px;
            border-radius: 6px;
            background: linear-gradient(180deg, #ffb55a, #d98a30);
          }
          
          
          

        .slot-info {
          display:flex;
          justify-content:space-between;
          align-items:center;
        }

        .slot-time {
          font-weight:900;
          font-size:1.08rem;
          color: #dfffe8;
          text-shadow: 0 6px 26px rgba(0,255,136,0.04);
        }
        .slot-price {
          font-weight:900;
          color: var(--neon);
          font-size:1.03rem;
          letter-spacing:0.6px;
        }

        .slot-meta {
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:12px;
        }

        .slot-state {
          padding:6px 10px;
          border-radius: 999px;
          font-weight:800;
          font-size:0.85rem;
          color:#0b2a18;
          background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85));
        }

        .slot-actions {
          display:flex;
          gap:10px;
          margin-top:6px;
          align-items:center;
        }

        .btn-book {
          background: linear-gradient(180deg,#ffd84d,#f6c42d);
          border:none;
          padding:10px 14px;
          font-weight:900;
          border-radius:8px;
          cursor:pointer;
          box-shadow: 0 8px 30px rgba(246,196,45,0.12);
          transition: transform 120ms ease;
        }
        .btn-book:active { transform: translateY(2px); }

        .slot-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 28px 70px rgba(0,0,0,0.7), 0 0 40px rgba(0,255,136,0.04);
          border-color: rgba(0,255,136,0.12);
        }

        .slot-card:focus-within {
          outline: 3px solid rgba(0,255,136,0.08);
          transform: translateY(-8px);
          box-shadow: 0 28px 70px rgba(0,0,0,0.7), 0 0 60px rgba(0,255,136,0.06);
        }

        /* unavailable */
        .slot-card.unavailable {
          filter: grayscale(0.48) contrast(0.9) brightness(0.9);
          opacity: 0.72;
        }
        .slot-card.unavailable .btn-book {
          background: linear-gradient(180deg,#bdbdbd,#9f9f9f);
          cursor:not-allowed;
        }

        /* flash feedback small ring */
        .flash {
          position:absolute;
          inset:0;
          pointer-events:none;
          border-radius:12px;
          box-shadow: 0 0 0 2px rgba(0,255,136,0.14), 0 0 40px rgba(0,255,136,0.06);
          animation: flashAnim 700ms ease-out forwards;
        }
        @keyframes flashAnim {
          from { opacity:1; transform:scale(0.98); }
          to { opacity:0; transform:scale(1.06); }
        }

        /* small note */
        .note {
          color:#a9dec2;
          text-align:center;
          font-weight:600;
          margin-top:6px;
        }

        /* responsive */
        @media (max-width:920px) {
          .slots-grid { grid-template-columns: 1fr; }
          .hero { flex-direction: column; gap:12px; align-items:flex-start; }
          .date-input { width:100%; max-width:320px; }
        }
      `}</style>

      <main className="neon-page" aria-live="polite">
        <div
          className="neon-wrap"
          role="region"
          aria-label="Available slots container"
        >
          {/* HERO / DATE PICKER */}
          <div className="hero" role="region" aria-label="Booking header">
            <div className="hero-left">
              <div className="hero-title">Ground Alpha — Book a Slot</div>
              <div className="hero-sub">
                Pick a date and time — tap a card to book
              </div>
            </div>

            <div className="date-block" aria-hidden="false">
              <div className="date-big">{formatNiceDet(selectedDate)}</div>
              <input
                className="date-input"
                type="date"
                aria-label="Choose booking date"
                value={selectedDate}
                min={todayISO()}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          {/* TITLE */}
          <div>
            <div className="page-title">Available Slots</div>
            <div className="page-sub">
              Mode:{" "}
              <strong style={{ color: "#fff" }}>
                {isWeekendForDate ? "Weekend" : "Weekday"}
              </strong>{" "}
              — (Weekend = Thu/Fri/Sat)
            </div>
          </div>

          {/* SECTIONS */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {phases.map((phase) => {
              const price = isWeekendForDate
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
                    <div className="phase-price">{price} TAKA</div>
                  </div>

                  <div className="slots-grid" role="list">
                    {phase.slots.map((slotStr, idx) => {
                      const past = slotIsPast(selectedDate, slotStr);
                      const keyId = `${phase.key}-${idx}`;
                      return (
                        <div
                          className={`slot-card ${past ? "unavailable" : ""}`}
                          key={keyId}
                          role="listitem"
                          aria-disabled={past}
                        >
                          <div className="slot-info">
                            <div
                              className="slot-time"
                              aria-label={`Time ${slotStr}`}
                            >
                              {slotStr}
                            </div>
                            <div
                              className="slot-price"
                              aria-label={`Price ${price} TAKA`}
                            >
                              {price} TAKA
                            </div>
                          </div>

                          <div className="slot-meta">
                            <div className="slot-state">
                              {past ? "Unavailable" : "Available"}
                            </div>

                            <div className="slot-actions">
                              <button
                                className="btn-book"
                                onClick={() =>
                                  !past && handleBook(slotStr, phase)
                                }
                                disabled={past}
                                aria-disabled={past}
                                aria-label={
                                  past
                                    ? `Unavailable ${slotStr}`
                                    : `Book ${slotStr}`
                                }
                              >
                                {past ? "Unavailable" : "Book Now"}
                              </button>
                            </div>
                          </div>

                          {/* flash feedback overlay when booking triggered */}
                          {flashId && (
                            <div className="flash" aria-hidden="true"></div>
                          )}
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
            date to open more slots.
          </div>
        </div>
      </main>
    </>
  );
}
