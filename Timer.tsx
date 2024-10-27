import React, { useState, useEffect } from 'react';
import { X, User } from 'lucide-react';

interface TimerProps {
  person: {
    id: number;
    name: string;
    enterTime: number;
  };
  removePerson: (id: number) => void;
}

const Timer: React.FC<TimerProps> = ({ person, removePerson }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - person.enterTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [person.enterTime]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md mb-2">
      <div className="flex items-center">
        <User className="w-5 h-5 mr-2 text-blue-500" />
        <span className="font-semibold">{person.name}</span>
      </div>
      <div className="flex items-center space-x-4">
        <span className={`font-mono ${elapsedTime >= 600 ? 'text-red-500' : ''}`}>
          {formatTime(elapsedTime)}
        </span>
        <button
          onClick={() => removePerson(person.id)}
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Timer;