import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassicTemplate from '../components/templates/Classic';
import ModernTemplate from '../components/templates/Modern';
import MinimalTemplate from '../components/templates/Minimal';
import ExecutiveTemplate from '../components/templates/Executive';
import CreativeTemplate from '../components/templates/Creative';

const templateMap = {
  Classic: ClassicTemplate,
  Modern: ModernTemplate,
  Minimal: MinimalTemplate,
  Executive: ExecutiveTemplate,
  Creative: CreativeTemplate,
};

const Landing = () => {
  const navigate = useNavigate();
  const [showExamples, setShowExamples] = useState(false);
  const [selectedExample, setSelectedExample] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const SelectedTemplateComponent = selectedExample ? templateMap[selectedExample] : null;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Navbar */}
      <nav className="w-full px-8 py-5 flex items-center justify-between border-b border-gray-100">
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

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </nav>

      {/* Menu Dropdown */}
      {menuOpen && (
        <div className="absolute right-8 top-20 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 z-50 w-48">
          <button onClick={() => navigate('/builder')} className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium">
            Build Resume
          </button>
          <button onClick={() => { setShowExamples(true); setMenuOpen(false); }} className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium">
            See Examples
          </button>
        </div>
      )}

      {/* Hero */}
      <section className="w-full py-32 px-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60 -z-10"></div>
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-10">
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
          AI-Powered Resume Builder
        </div>
        <h1 className="text-7xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
          Build Your Dream<br /><span className="text-blue-600">Resume</span> in Minutes
        </h1>
        <p className="text-xl text-gray-400 max-w-xl mx-auto mb-12 leading-relaxed">
          Create a stunning, professional resume with AI assistance. Stand out and land your dream job.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate('/builder')}
            className="bg-gray-900 text-white px-10 py-4 rounded-full text-base font-semibold hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Build My Resume →
          </button>
          <button
            onClick={() => setShowExamples(true)}
            className="border border-gray-200 text-gray-600 px-10 py-4 rounded-full text-base font-medium hover:border-gray-400 transition-all duration-300 hover:scale-105"
          >
            See Example
          </button>
        </div>
        <div className="flex items-center justify-center gap-10 mt-20 text-sm text-gray-400">
          <span>✓ Free to use</span>
          <span>✓ AI powered</span>
          <span>✓ PDF export</span>
          <span>✓ No signup needed</span>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full py-24 px-8 bg-gray-50">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>How it works</h2>
        <p className="text-center text-gray-400 mb-16">Three simple steps to your dream resume</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { step: '01', title: 'Choose a Template', desc: 'Pick from 5 premium professionally designed resume templates.' },
            { step: '02', title: 'Fill Your Details', desc: 'Enter your information section by section with AI assistance.' },
            { step: '03', title: 'Download PDF', desc: 'Download your polished resume as a PDF instantly.' },
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl font-bold text-blue-100 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{item.step}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-10 px-8 border-t border-gray-100 text-center">
        <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
          Resume<span className="text-blue-600">Desk</span>
        </span>
        <p className="text-gray-400 text-sm mt-2">© 2025 ResumDesk. Built to help you land your dream job.</p>
      </footer>

      {/* Examples Grid Modal */}
      {showExamples && !selectedExample && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-8" onClick={() => setShowExamples(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-screen overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Template Examples</h2>
              <button onClick={() => setShowExamples(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.keys(templateMap).map((template) => (
                <div
                  key={template}
                  onClick={() => setSelectedExample(template)}
                  className="border-2 border-gray-100 rounded-2xl p-4 hover:border-blue-400 cursor-pointer transition-all hover:shadow-md"
                >
                  <div className="bg-gray-50 rounded-xl h-40 flex items-center justify-center mb-3 overflow-hidden">
                    <div style={{ transform: 'scale(0.25)', transformOrigin: 'top center', width: '400%', pointerEvents: 'none' }}>
                      {React.createElement(templateMap[template])}
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800 text-center">{template}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Single Template Preview Modal */}
      {selectedExample && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm" onClick={() => setSelectedExample(null)}>
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-screen flex flex-col" onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedExample(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {selectedExample} Template
                </h2>
              </div>
              <button
                onClick={() => { setShowExamples(false); setSelectedExample(null); navigate('/builder'); }}
                className="bg-gray-900 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-gray-700 transition-all"
              >
                Use This Template →
              </button>
            </div>

            {/* Template Preview */}
            <div className="overflow-y-auto flex-1">
              {SelectedTemplateComponent && <SelectedTemplateComponent />}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Landing;