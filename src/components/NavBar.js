import React, { memo } from 'react';
import { Sun, Moon, Clock3, Globe } from 'lucide-react';
import { locations } from '../data/locations';
import '../styles/NavBar.css';

const ThemeToggle = memo(function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
});

function NavBar({ selectedIndex, onLocationChange, isDark, onThemeToggle }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Clock3 size={28} className="navbar-logo-icon" strokeWidth={2} />
        <span className="navbar-title">Fliqlo</span>
      </div>

      <div className="navbar-controls">
        <div className="location-wrapper">
          <Globe size={16} className="location-globe-icon" />
          <select
            className="location-select"
            value={selectedIndex}
            onChange={(e) => onLocationChange(Number(e.target.value))}
            aria-label="Select country or timezone"
          >
            {locations.map((location, index) => (
              <option key={index} value={index}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
      </div>
    </nav>
  );
}

export default NavBar;
