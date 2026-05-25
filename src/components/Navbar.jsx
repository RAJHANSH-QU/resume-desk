import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
          Resume<span className="text-blue-600">Desk</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a href="#build" className="text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium">Build</a>
        <a href="#preview" className="text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium">Preview</a>
      </div>
      <a href="#build" className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg">
        Get Started →
      </a>
    </nav>
  );
};

export default Navbar;