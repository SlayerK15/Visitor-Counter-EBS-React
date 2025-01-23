import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [lastVisit, setLastVisit] = useState(null);

  useEffect(() => {
    // Get current count or initialize to 0
    const currentCount = parseInt(localStorage.getItem('visitorCount') || '0');
    
    // Increment count
    const newCount = currentCount + 1;
    
    // Save new count
    localStorage.setItem('visitorCount', newCount.toString());
    
    // Update timestamp
    const currentTime = new Date().toLocaleString();
    localStorage.setItem('lastVisit', currentTime);
    
    // Update state
    setVisitorCount(newCount);
    setLastVisit(currentTime);
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 m-4 max-w-sm w-full">
        <div className="flex items-center justify-center mb-6">
          <Users className="w-12 h-12 text-blue-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Visitor Counter
        </h1>
        
        <div className="text-center">
          <div className="text-6xl font-bold text-blue-500 mb-4">
            {visitorCount}
          </div>
          <p className="text-gray-600 mb-2">
            Total Visitors
          </p>
          {lastVisit && (
            <p className="text-sm text-gray-500">
              Last visit: {lastVisit}
            </p>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Thank you for visiting our website!
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;