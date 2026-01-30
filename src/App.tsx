import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming you put the CSS below in App.css

// --- Types ---
type RecurrenceType = 'Daily' | 'Weekly' | 'Monthly';

interface CronFields {
  seconds: string;
  minutes: string;
  hours: string;
  days: string;
  month: string;
  dayOfWeek: string;
}

const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const App: React.FC = () => {
  // --- Task 1 State: Cron Visualizer ---
  const [cronInput, setCronInput] = useState<string>('');
  const [parsedFields, setParsedFields] = useState<CronFields>({
    seconds: '*', minutes: '*', hours: '*', days: '*', month: '*', dayOfWeek: '*'
  });

  // --- Task 2 State: Recurrence Generator ---
  const [recurrencePattern, setRecurrencePattern] = useState<RecurrenceType>('Daily');
  const [time, setTime] = useState<string>('08:00'); // Default time
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [dayOfMonth, setDayOfMonth] = useState<string>('1');
  const [description, setDescription] = useState<string>('');

  // --- Task 1 Logic: Parse Cron Expression ---
  useEffect(() => {
    // Requirement: Tolerate extra spaces
    const parts = cronInput.trim().split(/\s+/);

    if (parts.length === 6) {
      setParsedFields({
        seconds: parts[0],
        minutes: parts[1],
        hours: parts[2],
        days: parts[3],
        month: parts[4],
        dayOfWeek: parts[5],
      });
    } else {
      // Requirement: Reset to defaults if invalid
      setParsedFields({
        seconds: '*', minutes: '*', hours: '*', days: '*', month: '*', dayOfWeek: '*'
      });
    }
  }, [cronInput]);

  const renderField = (label: string, value: string) => {
    // Requirement: Mark explicit values as (active)
    const isActive = value !== '*' && value !== '?';
    return (
      <div className="parsed-field">
        <strong>{label}: </strong>
        <span>{value} {isActive ? <span className="active-tag">(active)</span> : ''}</span>
      </div>
    );
  };

  // --- Task 2 Logic: Generate Description ---
  useEffect(() => {
    let desc = '';
    const [hours, minutes] = time.split(':');
    const timeString = `${hours}:${minutes}`; // Simple formatting, can be enhanced to AM/PM

    if (recurrencePattern === 'Daily') {
      desc = `Runs every day at ${timeString}.`;
    } else if (recurrencePattern === 'Weekly') {
      if (selectedDays.length === 0) {
        desc = `Runs every week on... (please select a day) at ${timeString}.`;
      } else {
        // Format days list nicely
        const dayStr = selectedDays.join(' and '); 
        desc = `Runs every week on ${dayStr} at ${timeString}.`;
      }
    } else if (recurrencePattern === 'Monthly') {
      desc = `Runs every month on the ${dayOfMonth}${getOrdinal(dayOfMonth)} day at ${timeString}.`;
    }

    setDescription(desc);
  }, [recurrencePattern, time, selectedDays, dayOfMonth]);

  // Helper for date ordinals (1st, 2nd, 3rd...)
  const getOrdinal = (n: string) => {
    const s = ["th", "st", "nd", "rd"];
    const v = parseInt(n) % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  const handleDayToggle = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Cron Expression Visualizer</h1>
      </header>

      <main>
        {/* --- Part 1: Visualizer --- */}
        <section className="card">
          <h2>Part 1: Cron Expression Evaluator</h2>
          
          <div className="form-group">
            <label>Cron Expression</label>
            <input 
              type="text" 
              placeholder="e.g. 0 15 12 1 JAN MON" 
              value={cronInput}
              onChange={(e) => setCronInput(e.target.value)}
              className="text-input"
            />
          </div>

          <div className="parsed-results">
            <h3>Parsed Fields</h3>
            {renderField("Seconds", parsedFields.seconds)}
            {renderField("Minutes", parsedFields.minutes)}
            {renderField("Hours", parsedFields.hours)}
            {renderField("Days", parsedFields.days)}
            {renderField("Month", parsedFields.month)}
            {renderField("Day of Week", parsedFields.dayOfWeek)}
          </div>
        </section>

        {/* --- Part 2: Generator --- */}
        <section className="card">
          <h2>Part 2: Recurrence Pattern Generator</h2>

          <div className="form-group">
            <label>Recurrence Pattern</label>
            <select 
              value={recurrencePattern} 
              onChange={(e) => setRecurrencePattern(e.target.value as RecurrenceType)}
              className="select-input"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <div className="form-group">
            <label>Time</label>
            <input 
              type="time" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="text-input"
            />
          </div>

          {/* Dynamic Inputs based on Pattern */}
          {recurrencePattern === 'Weekly' && (
            <div className="form-group">
              <label>Days of Week</label>
              <div className="checkbox-group">
                {DAYS_OF_WEEK.map(day => (
                  <label key={day} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={selectedDays.includes(day)}
                      onChange={() => handleDayToggle(day)}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>
          )}

          {recurrencePattern === 'Monthly' && (
            <div className="form-group">
              <label>Day of Month</label>
              <select 
                value={dayOfMonth} 
                onChange={(e) => setDayOfMonth(e.target.value)}
                className="select-input"
              >
                {Array.from({length: 31}, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          )}

          <div className="generated-description">
            <strong>Generated Description:</strong>
            <p>{description}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
