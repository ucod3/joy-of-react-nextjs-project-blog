'use client';
import React from 'react';
import clsx from 'clsx';
import { Play, Pause, RotateCcw } from 'react-feather';
import { motion } from 'framer-motion';
import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const id = React.useId();
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer); // cleanup on unmount
  }, [isRunning]);

  function getColor(timeElapsed) {
    const colorIndex = timeElapsed % COLORS.length;
    return COLORS[colorIndex];
  }

  const selectedColor = getColor(timeElapsed);

  const handlePlayPauseClick = () => {
    setIsRunning(!isRunning);
    setTimeElapsed(timeElapsed + 1);
  };

  const handleResetClick = () => {
    setIsRunning(false);
    setTimeElapsed(0);
  };

  return (
    <Card as='section' className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={`${id}-selected-color-outline}`}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox,
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={handlePlayPauseClick}>
            {!isRunning ? <Play /> : <Pause />}
            <VisuallyHidden> {!isRunning ? 'Pause' : 'Play'}</VisuallyHidden>
          </button>
          <button onClick={handleResetClick}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
