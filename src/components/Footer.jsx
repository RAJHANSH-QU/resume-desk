import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-10 px-8 text-center">
      <div className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
        Resume<span className="text-blue-400">Desk</span>
      </div>
      <p className="text-gray-400 text-sm">
        © 2025 ResumDesk. Built with ❤️ to help you land your dream job.
      </p>
    </footer>
  );
};

export default Footer;