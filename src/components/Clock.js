import React, { memo } from 'react';
import '../styles/Clock.css';

const FlipUnit = memo(function FlipUnit({ label, value, prevValue }) {
  const hasChanged = value !== prevValue;
  return (
    <div className="flip-unit">
      <div className={`flip-card ${hasChanged ? 'flip-animate' : ''}`} key={value}>
        <span className="flip-text">{value}</span>
      </div>
      {label && <span className="flip-label">{label}</span>}
    </div>
  );
});

const Separator = memo(function Separator() {
  return <span className="separator">:</span>;
});

function Clock({ time, prevTime }) {
  if (!time) {
    return (
      <div className="clock-container">
        <div className="clock-loading">Loading…</div>
      </div>
    );
  }

  return (
    <div className="clock-container">
      <div className="clock-display">
        <FlipUnit label="HRS" value={time.hours} prevValue={prevTime?.hours} />
        <Separator />
        <FlipUnit label="MIN" value={time.minutes} prevValue={prevTime?.minutes} />
        <Separator />
        <FlipUnit label="SEC" value={time.seconds} prevValue={prevTime?.seconds} />
      </div>
      <div className="clock-ampm">{time.ampm}</div>
    </div>
  );
}

export default Clock;
