import React from 'react';

const FloatingAddButton = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 md:top-8 md:right-8 md:bottom-auto z-50 group">
      <button
        onClick={onClick}
        className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center md:w-14 md:h-14 sm:w-16 sm:h-16 focus:outline-none focus:ring-2 focus:ring-blue-400"
        style={{ minWidth: 56, minHeight: 56 }}
      >
        <svg className="w-6 h-6 md:w-6 md:h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
      {/* Tooltip */}
      <div className="absolute right-0 md:right-auto md:left-full top-full mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none md:left-auto md:right-0 md:top-auto md:bottom-full md:mb-2">
        Add a transaction
        {/* Arrow */}
        <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800 md:bottom-auto md:top-full md:left-4 md:border-b-0 md:border-t-4 md:border-t-gray-800"></div>
      </div>
    </div>
  );
};

export default FloatingAddButton; 