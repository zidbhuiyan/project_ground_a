"use client";

// Navbar.jsx (Single File Version with Embedded CSS)
import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .navbar {
          width: 100%;
          background: linear-gradient(90deg, #0b2815, #111);
          padding: 15px 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(6px);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.4rem;
          font-weight: bold;
          text-transform: uppercase;
          color: #d5ffd9;
        }

        .logo img {
          width: 45px;
          height: 45px;
          filter: drop-shadow(0 0 6px rgba(0, 255, 0, 0.3));
        }

        .nav-links {
          display: flex;
          gap: 28px;
        }

        /* UPDATED: Bigger + Bolder */
        .nav-links a {
          text-decoration: none;
          color: #e5e5e5;
          font-size: 1.18rem;
          font-weight: 700;
          padding: 12px 18px;
          border-radius: 10px;
          transition: all 0.35s ease;
        }

        .nav-links a:hover {
          background: #1b4727;
          color: #b4ffcc;
          box-shadow: 0 0 10px rgba(0, 255, 90, 0.3);
          transform: translateY(-2px);
        }

        .menu-btn {
          display: none;
          font-size: 1.8rem;
          cursor: pointer;
          color: #d5ffd9;
          transition: 0.3s ease;
        }

        .menu-btn:hover {
          transform: scale(1.15);
          color: #9effb8;
        }

        @media (max-width: 768px) {
          .nav-links {
            position: absolute;
            top: 70px;
            right: 0;
            width: 250px;
            background: #0f1a12;
            flex-direction: column;
            text-align: right;
            padding: 20px;
            border-left: 1px solid rgba(255, 255, 255, 0.1);
            transform: translateX(100%);
            transition: transform 0.35s ease;
          }

          .nav-links.show {
            transform: translateX(0);
          }

          .nav-links a {
            padding: 14px 10px;
          }

          .menu-btn {
            display: block;
          }
        }
      `}</style>

      <nav className="navbar">
        <a href="/">
          <div className="logo">
            <img src="YOUR_LOGO.png" alt="Ground Alpha Logo" />
            <span>Ground Alpha</span>
          </div>
        </a>

        <div className="menu-btn" onClick={() => setOpen(!open)}>
          &#9776;
        </div>

        <div className={`nav-links ${open ? "show" : ""}`}>
          <a href="/">Home</a>
          <a href="#about">About the Turf</a>
          <a href="/available-slots">Available Slots</a>
          <a href="#event">Events</a>
        </div>
      </nav>
    </>
  );
}
