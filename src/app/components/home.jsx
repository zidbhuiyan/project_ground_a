"use client";

import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const currentEvents = [
    { id: 1, title: "Weekend Tournament", img: "/event1.jpg" },
    { id: 2, title: "Night Football Fiesta", img: "/event2.jpg" },
  ];

  const upcomingEvents = [
    { id: 1, title: "Summer Cup 2025", img: "/upcoming1.jpg" },
    { id: 2, title: "Alpha Championship", img: "/upcoming2.jpg" },
  ];

  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);

  useEffect(() => {
    document.querySelector(".home-container").classList.add("fade-in");
  }, []);

  const slide = (setter, array, direction) => {
    setter((prev) =>
      direction === "left"
        ? prev === 0
          ? array.length - 1
          : prev - 1
        : prev === array.length - 1
        ? 0
        : prev + 1
    );
  };

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Poppins:wght@300;400;600;700;900&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .home-container {
            width: 100%;
            padding: 90px 20px 20px;  /* remove bottom padding */
            color: white;
            text-align: center;
            background-image: url('https://www.shutterstock.com/image-illustration/dynamic-stadium-large-modern-filled-600nw-2472452971.jpg');
            background-size: cover;
            background-position: center;
            min-height: fit-content; /* FIX: shrink to actual content */
            margin-bottom: 0;        /* FIX: no gap before footer */
            opacity: 0;
            transition: opacity 1.2s ease;
            font-family: 'Poppins', sans-serif;
          }

        .fade-in { opacity: 1; }

        .welcome-text {
          font-family: 'Dancing Script', cursive;
          font-size: 2.2rem;
          font-weight: 700;
          text-shadow: 2px 2px 10px black;
          margin: 0;
          margin-bottom: -5px;
        }

        .ground-alpha {
          font-family: 'Poppins', sans-serif;
          font-size: 3.4rem;
          font-weight: 900;
          text-shadow: 3px 3px 12px black;
          line-height: 1.15;
        }

        .subtitle {
          margin-top: 15px;
          font-size: 1.4rem;
          font-weight: 900;
          color: white;
          text-shadow: 2px 2px 10px black;
        }

        .section-title {
          margin-top: 55px;
          margin-bottom: 8px;
          font-size: 2rem;
          font-weight: 800;
          text-shadow: 2px 2px 12px black;
        }

        .info-boxes {
          margin-top: 25px;
          display: flex;
          justify-content: center;
          gap: 18px;
        }

        .info-box {
          background: rgba(0,0,0,0.55);
          padding: 14px 20px;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          text-shadow: 1px 1px 6px black;
        }

        .available-btn {
          margin-top: 15px;
          background: #ffd84d;
          padding: 14px 32px;
          border-radius: 12px;
          font-size: 1.2rem;
          font-weight: bold;
          color: #000;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .location-highlight {
          background: rgba(0, 60, 30, 0.55);
          padding: 18px;
          border-left: 4px solid #00ff88;
          border-radius: 6px;
          margin-top: 10px;
          font-size: 1.25rem;
          font-weight: 700;
          text-shadow: 2px 2px 10px black;
        }

        .location-highlight h2 {
          font-size: 2.3rem;
          font-weight: 900;
          text-shadow: 3px 3px 12px black;
          margin-bottom: 6px;
        }

        .map-link {
          color: #00ff9d;
          text-decoration: underline;
          font-weight: bold;
          display: block;
          margin-top: 6px;
        }

        .discount-box {
          background: rgba(0,0,0,0.55);
          padding: 50px 20px;
          border-radius: 12px;
          margin-top: 10px;
          min-height: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-shadow: 2px 2px 10px black;
        }

        .slider-box {
          position: relative;
          width: 100%;
          max-width: 780px;
          margin: 20px auto 20px;
          padding: 12px;
          background: rgba(0,0,0,0.55);
          border-radius: 12px;
        }

        .slider-box:last-of-type {
          margin-bottom: 50px;
        }

        .slider-img {
          width: 100%;
          height: 320px;
          border-radius: 12px;
          object-fit: cover;
        }

        .slider-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.35);
          padding: 10px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.4rem;
          color: black;
        }

        .left-btn { left: -12px; }
        .right-btn { right: -12px; }

        .event-title {
          margin-top: 12px;
          font-size: 1.3rem;
          font-weight: 700;
          text-shadow: 2px 2px 10px black;
        }
      `}</style>

      <div className="home-container">
        <h1 className="welcome-text">Welcome To</h1>
        <h1 className="ground-alpha">Ground Alpha</h1>

        <p className="subtitle">Come. Play. Conquer.</p>

        <div className="info-boxes">
          <div className="info-box">90 minutes per slot</div>
          <div className="info-box">Available every day</div>
        </div>

        <h2 className="section-title">Choose the time you’d like to book</h2>
        <button
          className="available-btn"
          onClick={() => router.push("/available-slots")}
        >
          Available Slots
        </button>

        <div className="location-highlight">
          <h2>Location</h2>
          Hashem Road, Matuail, Jatrabari, Dhaka
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            Click here to see it on Google Maps
          </a>
        </div>

        <h2 className="section-title">Seasonal Discount</h2>
        <div className="discount-box">
          No seasonal discount available at this moment.
        </div>

        <h2 className="section-title">Current Events</h2>
        <div className="slider-box">
          <img src={currentEvents[currentIndex1].img} className="slider-img" />
          <div
            className="slider-btn left-btn"
            onClick={() => slide(setCurrentIndex1, currentEvents, "left")}
          >
            <FiChevronLeft />
          </div>
          <div
            className="slider-btn right-btn"
            onClick={() => slide(setCurrentIndex1, currentEvents, "right")}
          >
            <FiChevronRight />
          </div>
          <div className="event-title">
            {currentEvents[currentIndex1].title}
          </div>
        </div>

        <h2 className="section-title">Upcoming Events</h2>
        <div className="slider-box">
          <img src={upcomingEvents[currentIndex2].img} className="slider-img" />
          <div
            className="slider-btn left-btn"
            onClick={() => slide(setCurrentIndex2, upcomingEvents, "left")}
          >
            <FiChevronLeft />
          </div>
          <div
            className="slider-btn right-btn"
            onClick={() => slide(setCurrentIndex2, upcomingEvents, "right")}
          >
            <FiChevronRight />
          </div>
          <div className="event-title">
            {upcomingEvents[currentIndex2].title}
          </div>
        </div>
      </div>
    </>
  );
}
