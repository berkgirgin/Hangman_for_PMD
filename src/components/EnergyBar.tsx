import React from "react";
import styles from "../styles/EnergyBar.module.css";

type EnergyBarProps = {
  wrongGuesses: number; // from 0 to 5
};

const EnergyBar: React.FC<EnergyBarProps> = ({ wrongGuesses }) => {
  const clampedGuesses = Math.min(Math.max(wrongGuesses, 0), 5);
  const percentage = 100 - clampedGuesses * 20;

  const getFillColor = (percent: number): string => {
    if (percent > 80) return "#00ff5e"; // Green
    if (percent > 60) return "#a8ff00"; // Lime-Yellow
    if (percent > 40) return "#ffd000"; // Yellow
    if (percent > 20) return "#ff6a00"; // Orange
    return "#ff0033"; // Red
  };

  const fillColor = getFillColor(percentage);

  return (
    <div className={styles.barContainer}>
      <div
        className={styles.energyFillWrapper}
        style={{ width: `${percentage}%` }}
      >
        <div
          className={styles.energyFill}
          style={{ backgroundColor: fillColor }}
        />
        <div className={styles.neonLine} />
      </div>
    </div>
  );
};

export { EnergyBar };
