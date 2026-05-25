import React from 'react';

const Hero = () => {
  return (
    <section className="w-full bg-white py-24 px-8 text-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      
      <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-8">
        <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
        AI-Powered Resume Builder
      </div>
      
      <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
        Build Your Dream<br /><span className="text-blue-600">Resume</span> in Minutes
      </h1>
      
      <p className="text-xl text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
        Create a stunning, professional resume with AI assistance. Stand out and land your dream job.
      </p>
      
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <a href="#build" className="bg-gray-900 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl">
          Build My Resume →
        </a>
        <a href="#preview" className="border border-gray-200 text-gray-600 px-8 py-4 rounded-full text-base font-medium hover:border-gray-400 transition-all duration-300">
          See Example
        </a>
      </div>

      <div className="flex items-center justify-center gap-8 mt-16 text-sm text-gray-400">
        <span>✓ Free to use</span>
        <span>✓ AI powered</span>
        <span>✓ PDF export</span>
        <span>✓ No signup needed</span>
      </div>
    </section>
  );
};

export default Hero;