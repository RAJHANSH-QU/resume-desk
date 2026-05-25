import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumeForm from '../components/ResumeForm';
import ClassicTemplate from '../components/templates/Classic';
import ModernTemplate from '../components/templates/Modern';
import MinimalTemplate from '../components/templates/Minimal';
import ExecutiveTemplate from '../components/templates/Executive';
import CreativeTemplate from '../components/templates/Creative';
import ClassicATS from '../components/templates/ats/ClassicATS';

const Builder = () => {
  const navigate = useNavigate();
  const photoInputRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('Classic');
  const [showTemplates, setShowTemplates] = useState(false);
  const [atsMode, setAtsMode] = useState(false);

  const [resumeData, setResumeData] = useState({
    personal: { firstName: '', lastName: '', email: '', phone: '', location: '', linkedin: '', portfolio: '', summary: '', photo: '' },
    experience: [{ include: true, jobTitle: '', company: '', startDate: '', endDate: '', description: '' }],
    education: [{ degree: '', institution: '', startYear: '', endYear: '', grade: '' }],
    skills: { list: '' },
    projects: [{ name: '', technologies: '', description: '', link: '' }],
    certifications: [{ include: true, name: '', organization: '', date: '', url: '' }],
    interests: { list: '' },
  });

  const templateMap = { Classic: ClassicTemplate, Modern: ModernTemplate, Minimal: MinimalTemplate, Executive: ExecutiveTemplate, Creative: CreativeTemplate };
  const atsTemplateMap = { Classic: ClassicATS, Modern: ClassicATS, Minimal: ClassicATS, Executive: ClassicATS, Creative: ClassicATS };

  const SelectedTemplate = templateMap[selectedTemplate];
  const SelectedATS = atsTemplateMap[selectedTemplate];
  const templates = ['Classic', 'Modern', 'Minimal', 'Executive', 'Creative'];

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setResumeData(prev => ({ ...prev, personal: { ...prev.personal, photo: reader.result } }));
    reader.readAsDataURL(file);
  };

  const downloadBeautifulPDF = () => {
    import('html2pdf.js').then(html2pdf => {
      html2pdf.default().set({
        margin: 0.5,
        filename: 'resume-desk.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }).from(document.getElementById('resume-template')).save();
    });
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />

      {/* Navbar */}
      <nav className="w-full px-4 md:px-8 py-4 flex items-center justify-between bg-white border-b border-gray-100 sticky top-0 z-40">
        <button onClick={() => navigate('/')} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900 hidden sm:block" style={{ fontFamily: 'Playfair Display, serif' }}>
            Resume<span className="text-blue-600">Desk</span>
          </span>
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowTemplates(!showTemplates)} className="flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-400 transition-all md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {selectedTemplate}
          </button>
          <span className="hidden md:block text-sm text-gray-400">Template: <span className="text-gray-900 font-medium">{selectedTemplate}</span></span>
        </div>
      </nav>

      {/* Mobile Template Dropdown */}
      {showTemplates && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3 flex gap-2 overflow-x-auto">
          {templates.map((t) => (
            <button key={t} onClick={() => { setSelectedTemplate(t); setShowTemplates(false); }}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTemplate === t ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'}`}>
              {t}
            </button>
          ))}
        </div>
      )}

      <div className="flex">
        {/* Left — Template Selector */}
        <div className="hidden md:block w-56 bg-white border-r border-gray-100 overflow-y-auto p-4 flex-shrink-0 min-h-screen">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Templates</p>
          {templates.map((template) => (
            <div key={template} onClick={() => setSelectedTemplate(template)}
              className={`mb-3 rounded-2xl border-2 cursor-pointer transition-all duration-200 overflow-hidden ${selectedTemplate === template ? 'border-blue-500 shadow-md' : 'border-gray-100 hover:border-gray-300'}`}>
              <div className="bg-gray-50 h-28 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="p-3">
                <p className={`text-sm font-semibold ${selectedTemplate === template ? 'text-blue-600' : 'text-gray-700'}`}>{template}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right — Form */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <ResumeForm resumeData={resumeData} setResumeData={setResumeData} onPreview={() => setShowPreview(true)} />
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm" onClick={() => setShowPreview(false)}>
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-screen flex flex-col" onClick={e => e.stopPropagation()}>

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 rounded-t-3xl flex-shrink-0">
              <div>
                <h2 className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Preview — {selectedTemplate}</h2>
                {selectedTemplate === 'Creative' && !atsMode && (
                  <p className="text-xs text-gray-400 mt-0.5">Tap the photo circle to upload your picture</p>
                )}
              </div>
              <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ATS Toggle Bar */}
            <div style={{ padding: '14px 24px', borderBottom: '1px solid #f0f0f0', background: '#fafafa', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {atsMode ? (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#111', margin: 0, fontFamily: 'Arial, sans-serif' }}>
                      {atsMode ? 'ATS Mode' : 'Beautiful Mode'}
                    </p>
                    <p style={{ fontSize: 11, color: '#999', margin: 0, fontFamily: 'Arial, sans-serif' }}>
                      {atsMode ? 'Text-based PDF — passes all ATS scanners' : 'Styled PDF — perfect for human reviewers'}
                    </p>
                  </div>
                </div>
                {/* B&W Toggle */}
                <button onClick={() => setAtsMode(!atsMode)}
                  style={{ position: 'relative', width: 52, height: 28, borderRadius: 999, background: atsMode ? '#111' : '#d1d5db', border: 'none', cursor: 'pointer', transition: 'background 0.3s', flexShrink: 0 }}>
                  <span style={{ position: 'absolute', top: 3, left: atsMode ? 27 : 3, width: 22, height: 22, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.25)', transition: 'left 0.3s', display: 'block' }} />
                </button>
              </div>
              {/* Pills */}
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: atsMode ? '#111' : '#f3f4f6', color: atsMode ? '#fff' : '#555', fontWeight: 600, fontFamily: 'Arial, sans-serif' }}>
                  {atsMode ? '✓ ATS Scannable' : '✦ Designed'}
                </span>
                <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: '#f3f4f6', color: '#888', fontFamily: 'Arial, sans-serif' }}>
                  {atsMode ? 'react-pdf engine' : 'html2pdf engine'}
                </span>
              </div>
            </div>

            {/* Template Preview */}
            <div id="resume-template" className="overflow-y-auto flex-1">
              {atsMode ? (
                <div style={{ padding: '40px 52px', fontFamily: 'Georgia, serif', background: '#fff', minHeight: 400 }}>
                  {/* ATS notice */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, padding: '10px 16px', background: '#f9f9f9', border: '1px solid #e5e5e5', borderLeft: '3px solid #111', borderRadius: 6 }}>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#111" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span style={{ fontSize: 11.5, color: '#333', fontFamily: 'Arial, sans-serif', fontWeight: 600 }}>ATS-Friendly — downloads as real text-based PDF</span>
                  </div>

                  {/* Name */}
                  <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111', marginBottom: 6, paddingBottom: 10, borderBottom: '2px solid #111', fontFamily: 'Georgia, serif' }}>
                    {resumeData.personal.firstName || 'First'} {resumeData.personal.lastName || 'Last'}
                  </h1>

                  {/* Contact */}
                  <p style={{ fontSize: 11, color: '#555', marginBottom: 22, fontFamily: 'Arial, sans-serif', lineHeight: 1.9 }}>
                    {[resumeData.personal.email, resumeData.personal.phone, resumeData.personal.location, resumeData.personal.linkedin, resumeData.personal.portfolio].filter(Boolean).join('  ·  ')}
                  </p>

                  {/* Summary */}
                  {resumeData.personal.summary && (
                    <div style={{ marginBottom: 22 }}>
                      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: '#111', borderBottom: '1px solid #ddd', paddingBottom: 5, marginBottom: 10, fontFamily: 'Arial, sans-serif' }}>Summary</p>
                      <p style={{ fontSize: 13, color: '#444', lineHeight: 1.8, fontStyle: 'italic' }}>{resumeData.personal.summary}</p>
                    </div>
                  )}

                  {/* Experience */}
                  {resumeData.experience?.filter(e => e.jobTitle).length > 0 && (
                    <div style={{ marginBottom: 22 }}>
                      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: '#111', borderBottom: '1px solid #ddd', paddingBottom: 5, marginBottom: 12, fontFamily: 'Arial, sans-serif' }}>Experience</p>
                      {resumeData.experience.filter(e => e.jobTitle).map((job, i) => (
                        <div key={i} style={{ marginBottom: 14 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <p style={{ fontWeight: 700, fontSize: 13, color: '#111', margin: 0 }}>{job.jobTitle}</p>
                              <p style={{ fontSize: 12, color: '#555', fontFamily: 'Arial, sans-serif', margin: '2px 0 0' }}>{job.company}</p>
                            </div>
                            <p style={{ fontSize: 11, color: '#999', fontFamily: 'Arial, sans-serif', margin: 0, whiteSpace: 'nowrap' }}>{job.startDate} — {job.endDate || 'Present'}</p>
                          </div>
                          {job.description && <p style={{ fontSize: 12, color: '#555', marginTop: 5, lineHeight: 1.7 }}>{job.description}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  <p style={{ fontSize: 11, color: '#bbb', fontStyle: 'italic', fontFamily: 'Arial, sans-serif', borderTop: '1px dashed #eee', paddingTop: 12 }}>
                    + Skills, Education, Certifications, Projects & Interests included in the downloaded PDF
                  </p>
                </div>
              ) : (
                <SelectedTemplate
                  data={resumeData}
                  {...(selectedTemplate === 'Creative' ? { onPhotoClick: () => photoInputRef.current?.click() } : {})}
                />
              )}
            </div>

            {/* Download Button */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #f0f0f0', borderRadius: '0 0 24px 24px', background: '#fff', flexShrink: 0 }}>
              {atsMode ? (
                <PDFDownloadLink
                  document={<SelectedATS data={resumeData} />}
                  fileName={`resume-${selectedTemplate.toLowerCase()}-ats.pdf`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  {({ loading }) => (
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      background: loading ? '#555' : '#111', color: '#fff',
                      padding: '14px 0', borderRadius: 12, fontWeight: 700, fontSize: 14,
                      cursor: 'pointer', fontFamily: 'Arial, sans-serif', letterSpacing: '0.3px',
                    }}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                      </svg>
                      {loading ? 'Preparing PDF...' : 'Download ATS-Friendly PDF'}
                      {!loading && (
                        <span style={{ background: '#fff', color: '#111', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 999, letterSpacing: 0.5 }}>
                          ATS SAFE
                        </span>
                      )}
                    </div>
                  )}
                </PDFDownloadLink>
              ) : (
                <button onClick={downloadBeautifulPDF}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#111', color: '#fff', padding: '14px 0', borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: 'pointer', border: 'none', fontFamily: 'Arial, sans-serif', letterSpacing: '0.3px' }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                  </svg>
                  Download PDF
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Builder;