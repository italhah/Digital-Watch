import React, { useState, useEffect, useRef } from 'react';
import NavBar from './components/NavBar';
import Clock from './components/Clock';
import { locations, defaultLocationIndex } from './data/locations';
import './styles/global.css';

const TZINFO_API_URL = process.env.REACT_APP_TZINFO_API_URL || process.env.TZINFO_API_URL || '';

if (TZINFO_API_URL) {
  // TZInfo.org URL is configured for future use; the clock currently uses
  // the browser's native Intl.DateTimeFormat API and does not call this URL.
  console.info('Timeon: Using native Intl.DateTimeFormat for timezone data.');
}

function getInitialTheme() {
  const saved = localStorage.getItem('timeon-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return 'dark';
}

function getTimeForTimezone(timezone) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const parts = formatter.formatToParts(new Date());
  const hour = parts.find((p) => p.type === 'hour').value;
  const minute = parts.find((p) => p.type === 'minute').value;
  const second = parts.find((p) => p.type === 'second').value;

  let hours24 = parseInt(hour, 10);
  const ampm = hours24 >= 12 ? 'PM' : 'AM';
  let displayHours = hours24 % 12 || 12;

  return {
    hours: displayHours < 10 ? `0${displayHours}` : String(displayHours),
    minutes: minute,
    seconds: second,
    ampm,
  };
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [selectedIndex, setSelectedIndex] = useState(defaultLocationIndex);
  const [time, setTime] = useState(null);

  const prevTimeRef = useRef(null);
  const timezoneRef = useRef(locations[defaultLocationIndex].timezone);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('timeon-theme', theme);
  }, [theme]);

  useEffect(() => {
    timezoneRef.current = locations[selectedIndex].timezone;
    const formatted = getTimeForTimezone(timezoneRef.current);
    prevTimeRef.current = null;
    setTime(formatted);
  }, [selectedIndex]);

  useEffect(() => {
    if (!time) return;

    const interval = setInterval(() => {
      const formatted = getTimeForTimezone(timezoneRef.current);
      prevTimeRef.current = time;
      setTime(formatted);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLocationChange = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="app">
      <NavBar
        selectedIndex={selectedIndex}
        onLocationChange={handleLocationChange}
        isDark={theme === 'dark'}
        onThemeToggle={toggleTheme}
      />
      <main className="app-main">
        <Clock time={time} prevTime={prevTimeRef.current} />
      </main>
      <footer className="app-footer">
        Developed by <span className="footer-name">Talha Rahman</span>
      </footer>
    </div>
  );
}

export default App;
