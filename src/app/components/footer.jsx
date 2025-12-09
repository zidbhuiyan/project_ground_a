import React from "react";

export default function Footer() {
  return (
    <>
      <style>{`
        .footer {
          width: 100%;
          background: #0b2815;
          color: #e5e5e5;
          padding: 10px 10px;
          gap: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          bottom: 0;
          left: 0;
          z-index: 999;
        }

        .social-section a {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.2rem;
          font-weight: 600;
          color: #e5e5e5;
          text-decoration: none;
          transition: 0.3s ease;
        }

        .social-section a:hover {
          color: #9effb8;
          transform: scale(1.08);
        }

        svg {
          width: 30px;
          height: 30px;
          transition: 0.3s ease;
        }

        .phone-icon {
          width: 22px;
          height: 22px;
          fill: #b4ffcc;
        }

        .booking-text {
          font-size: 1.25rem;
          font-weight: bold;
          color: #b4ffcc;
          margin-top: -5px;
        }

        .numbers-row {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px 20px;
          margin-top: -4px;
        }

        .number-box {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 1.15rem;
          font-weight: 500;
        }

        @media (max-width: 600px) {
          .number-box {
            font-size: 1.05rem;
          }
          .phone-icon {
            width: 20px;
            height: 20px;
          }
        }

        .footer-bottom {
          font-size: 0.8rem;
          opacity: 0.6;
        }
      `}</style>

      <footer className="footer">
        {/* FACEBOOK LINK */}
        <div className="social-section">
          <a
            href="https://www.facebook.com/share/17YNZwEpZw/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg fill="#e5e5e5" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.6l-.4 3h-2.2v7A10 10 0 0 0 22 12" />
            </svg>
            Facebook
          </a>
        </div>

        {/* BOOKING TEXT */}
        <div className="booking-text">Call us for booking</div>

        {/* NUMBERS WITH PHONE ICONS */}
        <div className="numbers-row">
          {[
            "01323342284",
            "01322062118",
            "01631627230",
            "01639569410",
            "01764825638",
            "01813383640",
          ].map((num) => (
            <div key={num} className="number-box">
              <svg className="phone-icon" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 .96-.26c1.05.28 2.18.43 3.34.43a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.16.15 2.29.43 3.34a1 1 0 0 1-.26.96l-2.05 2.49z" />
              </svg>
              {num}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Ground Alpha. All rights reserved.
        </div>
      </footer>
    </>
  );
}
