import React, { useState, useEffect, useRef, useCallback } from 'react';
import NavBar from './components/NavBar';
import Clock from './components/Clock';
import { locations, defaultLocationIndex } from './data/locations';
import './styles/global.css';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

function getInitialTheme() {
  const saved = localStorage.getItem('timeon-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return 'dark';
}

function padZero(num) {
  return num < 10 ? `0${num}` : String(num);
}

function getFormattedTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  return {
    hours: padZero(hours),
    minutes: padZero(minutes),
    seconds: padZero(seconds),
    ampm,
  };
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [selectedIndex, setSelectedIndex] = useState(defaultLocationIndex);
  const [time, setTime] = useState(null);
  const [error, setError] = useState(null);

  const prevTimeRef = useRef(null);
  const offsetRef = useRef(null);
  const selectedLocationRef = useRef(locations[defaultLocationIndex]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('timeon-theme', theme);
  }, [theme]);

  const fetchTimezone = useCallback(async (timezone) => {
    try {
      const url = `${SUPABASE_URL}/functions/v1/timezone-proxy?tz=${encodeURIComponent(timezone)}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      const data = await response.json();
      if (!data.date_time_txt) {
        throw new Error('Invalid response from server');
      }

      const serverTime = new Date(data.date_time_txt);
      const offset = serverTime.getTime() - Date.now();

      return offset;
    } catch (err) {
      throw err;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const location = locations[selectedIndex];
    selectedLocationRef.current = location;
    setError(null);

    fetchTimezone(location.timezone)
      .then((offset) => {
        if (cancelled) return;
        offsetRef.current = offset;
        const formatted = getFormattedTime(new Date(Date.now() + offset));
        prevTimeRef.current = time;
        setTime(formatted);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Error fetching timezone data:', err);
        setError('Unable to load time for this location. Please try again.');
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, fetchTimezone]);

  useEffect(() => {
    if (offsetRef.current === null) return;

    const interval = setInterval(() => {
      const formatted = getFormattedTime(new Date(Date.now() + offsetRef.current));
      prevTimeRef.current = time;
      setTime(formatted);
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time === null, offsetRef.current]);

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
        {error ? (
          <div className="clock-container">
            <div className="clock-error">{error}</div>
          </div>
        ) : (
          <Clock time={time} prevTime={prevTimeRef.current} />
        )}
      </main>
      <footer className="app-footer">
        Developed by <span className="footer-name">Talha Rahman</span>
      </footer>
    </div>
  );
}

export default App;
