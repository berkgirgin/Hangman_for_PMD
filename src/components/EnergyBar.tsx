import React from "react";
import styles from "../styles/EnergyBar.module.css";

type EnergyBarProps = {
  wrongGuesses: number; // from 0 to 5
};

const EnergyBar: React.FC<EnergyBarProps> = ({ wrongGuesses }) => {
  const clampedGuesses = Math.min(Math.max(wrongGuesses, 0), 10);
  const percentage = 100 - clampedGuesses * 10;

  const getFillColor = (percent: number): string => {
    if (percent > 90) return "#00ff5e"; // 100% - Neon Green
    if (percent > 80) return "#33ff57"; // 90%
    if (percent > 70) return "#a8ff00"; // 80%
    if (percent > 60) return "#ccff00"; // 70%
    if (percent > 50) return "#ffd000"; // 60%
    if (percent > 40) return "#ff9900"; // 50%
    if (percent > 30) return "#ff6a00"; // 40%
    if (percent > 20) return "#ff3300"; // 30%
    if (percent > 10) return "#ff0033"; // 20%
    return "#990022"; // 10% or less
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
