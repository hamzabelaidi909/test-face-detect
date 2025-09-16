import React, { useEffect, useState, useRef } from "react";
import "./timer.css";
import sound  from "../assets/sucess.mp3"
// === Animated Card ===
const AnimatedCard = ({ animation, digit }) => (
  <div className={`flipCard ${animation}`}>
    <span>{digit}</span>
  </div>
);

// === Static Card ===
const StaticCard = ({ position, digit }) => (
  <div className={position}>
    <span>{digit}</span>
  </div>
);

// === Flip Unit Container ===
const FlipUnitContainer = ({ digit, shuffle, unit }) => {
  let current = digit;
  let next = unit === "hours" ? digit + 1 : (digit + 1) % 60;

  if (current < 10) current = `0${current}`;
  if (next < 10) next = `0${next}`;

  const digit1 = shuffle ? next : current;
  const digit2 = !shuffle ? next : current;

  const animation1 = shuffle ? "fold" : "unfold";
  const animation2 = !shuffle ? "fold" : "unfold";

  return (
    <div className="flipUnitContainer">
      <StaticCard position="upperCard" digit={current} />
      <StaticCard position="lowerCard" digit={next} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
    </div>
  );
};

// === Countdown FlipClock with playSound control ===
export default function FlipClock({ hh , mm , ss ,setPlaySound, playSound }) {
  const [time, setTime] = useState({ h: hh, m: mm, s: ss });
  const [shuffle, setShuffle] = useState({ h: true, m: true, s: true });
   const audioRef = useRef(new Audio(sound));
  const timeRef = useRef(time);
  const shuffleRef = useRef(shuffle);

  useEffect(() => {
    timeRef.current = time;
    shuffleRef.current = shuffle;
  }, [time, shuffle]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!playSound) tick();
    }, 1000);

    return () => clearInterval(timer);
  }, [playSound]);

  const tick = () => {
    let { h, m, s } = timeRef.current;
    let newShuffle = { ...shuffleRef.current };

    if (h === 0 && m === 0 && s === 0){
      setPlaySound()
      audioRef.current.play(); 
      return
    };

    if (s > 0) {
      s--;
      newShuffle.s = !newShuffle.s;
    } else {
      s = 59;
      newShuffle.s = !newShuffle.s;

      if (m > 0) {
        m--;
        newShuffle.m = !newShuffle.m;
      } else {
        m = 59;
        newShuffle.m = !newShuffle.m;

        if (h > 0) {
          h--;
          newShuffle.h = !newShuffle.h;
        }
      }
    }

    setTime({ h, m, s });
    setShuffle(newShuffle);
  };

  return (
    <div className="flipClock">
      <FlipUnitContainer unit="hours" digit={time.h} shuffle={shuffle.h} />
      <FlipUnitContainer unit="minutes" digit={time.m} shuffle={shuffle.m} />
      <FlipUnitContainer unit="seconds" digit={time.s} shuffle={shuffle.s} />
    </div>
  );
}
