import { useState, useEffect } from 'react';

type OnHoldCallback = (holdTime: number) => void;

const useHoldClick = (onHold: OnHoldCallback, holdInterval: number = 1000) => {
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [holdTime, setHoldTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isHolding) {
      interval = setInterval(() => {
        setHoldTime((prevTime) => prevTime + 1);
        onHold(holdTime + 1); 
      }, holdInterval);
    }

    return () => {
      if (interval) clearInterval(interval); 
    };
  }, [isHolding, holdTime, onHold, holdInterval]);

  const startHold = () => {
    setIsHolding(true);
    setHoldTime(0); 
  };

  const endHold = () => {
    setIsHolding(false);
  };

  return { startHold, endHold, isHolding, holdTime };
};

export default useHoldClick;