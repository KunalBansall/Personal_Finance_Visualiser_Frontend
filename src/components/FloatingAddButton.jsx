import React from 'react';

const FloatingAddButton = ({ onClick }) => {
  return (
    <div className="fixed top-6 right-6 md:top-8 md:right-8 z-40 group">
      <button
        onClick={onClick}
        className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
      {/* Tooltip */}
      <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        Add a transaction
        {/* Arrow */}
        <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
      </div>
    </div>
  );
};

export default FloatingAddButton; 