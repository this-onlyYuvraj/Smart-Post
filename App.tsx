import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, Camera } from 'lucide-react';
import CCTVFeed from './components/CCTVFeed';
import Timer from './components/Timer';
import AlertMessage from './components/AlertMessage';
import PersonTracker from './components/PersonTracker';

interface Person {
  id: number;
  name: string;
  enterTime: number;
}

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const newAlerts: string[] = [];

      people.forEach((person) => {
        const waitingTime = (currentTime - person.enterTime) / 1000 / 60; // in minutes
        if (waitingTime >= 10 && !alerts.includes(person.name)) {
          newAlerts.push(`${person.name} has been waiting for over 10 minutes!`);
        }
      });

      if (newAlerts.length > 0) {
        setAlerts((prevAlerts) => [...prevAlerts, ...newAlerts]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [people, alerts]);

  const addPerson = (name: string) => {
    setPeople((prevPeople) => [
      ...prevPeople,
      { id: Date.now(), name, enterTime: Date.now() },
    ]);
  };

  const removePerson = (id: number) => {
    setPeople((prevPeople) => prevPeople.filter((person) => person.id !== id));
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => !alert.includes(people.find((p) => p.id === id)?.name || '')));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Front Laptop Camera Waiting Time Detector</h1>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <Clock className="w-8 h-8 text-blue-500" />
          <Camera className="w-8 h-8 text-green-500" />
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Front Camera Feed</h2>
            <CCTVFeed addPerson={addPerson} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">People in the Room:</h2>
            <PersonTracker addPerson={addPerson} />
            <div className="mt-4">
              {people.map((person) => (
                <Timer key={person.id} person={person} removePerson={removePerson} />
              ))}
            </div>
          </div>
        </div>
        <AlertMessage alerts={alerts} />
      </div>
    </div>
  );
}

export default App;