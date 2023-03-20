import React from 'react';

export default function FormattedTime({ seconds, mode }) {

  function formatTime(seconds) {    
    const Modes = {
      d : {1 : ":", 2: ":", 3 : ""},
      h : {1 : "h ", 2: "m ", 3 : "s "}
    }
    var ParsedSeconds = parseInt(seconds);
    const hours = Math.floor(ParsedSeconds / 3600);
    const remainingSeconds = ParsedSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const remainingSecondsFinal = remainingSeconds % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSecondsFinal).padStart(2, '0');
    const ToReturn = formattedHours > 0 ? `${formattedHours}${Modes[mode][1]}${formattedMinutes}${Modes[mode][2]}${formattedSeconds}${Modes[mode][3]}` : `${formattedMinutes}${Modes[mode][2]}${formattedSeconds}${Modes[mode][3]}`
    return ToReturn;
  }

  const formattedTime = formatTime(seconds);
  return <span>{formattedTime}</span>;
}

