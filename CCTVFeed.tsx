import React, { useState, useEffect, useRef } from 'react';
import { User, Camera, RefreshCw } from 'lucide-react';

interface CCTVFeedProps {
  addPerson: (name: string) => void;
}

const CCTVFeed: React.FC<CCTVFeedProps> = ({ addPerson }) => {
  const [detectedPeople, setDetectedPeople] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" } // This ensures we use the front camera
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setError(null);
      }
    } catch (err) {
      console.error("Error accessing the camera:", err);
      setError("Failed to access the camera. Please make sure you've granted permission.");
      setCameraActive(false);
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!cameraActive) return;

    const interval = setInterval(() => {
      const shouldDetectPerson = Math.random() < 0.3; // 30% chance to detect a new person
      if (shouldDetectPerson) {
        const newPerson = `Person ${Math.floor(Math.random() * 1000)}`;
        setDetectedPeople((prev) => [...prev, newPerson]);
        addPerson(newPerson);
      }
    }, 5000); // Check for new people every 5 seconds

    return () => clearInterval(interval);
  }, [addPerson, cameraActive]);

  const handleRetry = () => {
    startCamera();
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg relative">
      <div className="aspect-video bg-black rounded-md flex items-center justify-center overflow-hidden">
        {cameraActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-white">
            <Camera className="w-16 h-16 mb-4" />
            <p>{error || "Initializing camera..."}</p>
            {error && (
              <button
                onClick={handleRetry}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Retry
              </button>
            )}
          </div>
        )}
        {detectedPeople.map((person, index) => (
          <div
            key={index}
            className="absolute bg-green-500 bg-opacity-50 p-2 rounded-md"
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
            }}
          >
            <User className="w-6 h-6 text-white" />
          </div>
        ))}
      </div>
      <div className="mt-4 text-white">
        <h3 className="font-semibold mb-2">AI Detection Log:</h3>
        <ul className="text-sm">
          {detectedPeople.slice(-5).map((person, index) => (
            <li key={index}>{person} detected</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CCTVFeed;