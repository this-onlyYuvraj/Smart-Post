import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

interface PersonTrackerProps {
  addPerson: (name: string) => void;
}

const PersonTracker: React.FC<PersonTrackerProps> = ({ addPerson }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addPerson(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter person's name"
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <UserPlus className="w-5 h-5" />
      </button>
    </form>
  );
};

export default PersonTracker;