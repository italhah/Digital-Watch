import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import Clock from './components/Clock';
import { locations, defaultLocationIndex } from './data/locations';
import './styles/global.css';

function getInitialTheme() {
  const saved = localStorage.getItem('fliqlo-theme');
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
  const prevTimeRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fliqlo-theme', theme);
  }, [theme]);

  useEffect(() => {
    let cancelled = false;
    const selectedLocation = locations[selectedIndex];

    const fetchTime = async () => {
      try {
        const response = await axios.get(
          `https://api.ipgeolocation.io/timezone?apiKey=6a09f7031bd943e0933f027fec367014&tz=${selectedLocation.timezone}`
        );
        if (cancelled) return;
        const localTime = new Date(response.data.date_time_txt);
        const formatted = getFormattedTime(localTime);
        prevTimeRef.current = time;
        setTime(formatted);
      } catch (error) {
        console.error('Error fetching time data:', error);
      }
    };

    fetchTime();
    const interval = setInterval(fetchTime, 1000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

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
