import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface AlertMessageProps {
  alerts: string[];
}

const AlertMessage: React.FC<AlertMessageProps> = ({ alerts }) => {
  if (alerts.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
        Alerts
      </h2>
      <ul className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded max-h-60 overflow-y-auto">
        {alerts.map((alert, index) => (
          <li key={index} className="mb-2 last:mb-0">
            {alert}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertMessage;