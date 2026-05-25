import React, { useRef } from 'react';

const ResumePreview = ({ resumeData }) => {
  const resumeRef = useRef();

  const downloadPDF = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 0.5,
      filename: 'resume-desk.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    import('html2pdf.js').then(html2pdf => {
      html2pdf.default().set(opt).from(element).save();
    });
  };

  const { personal, experience, education, skills, projects, certifications, interests } = resumeData;
  const skillList = skills.list ? skills.list.split('\n').map(s => s.trim()).filter(Boolean) : [];
  const interestList = interests.list ? interests.list.split('\n').map(s => s.trim()).filter(Boolean) : [];
  const hasContent = personal.firstName || personal.email;

  return (
    <div className="flex flex-col h-full">

      {/* Preview Header */}
      <div className="flex items-center justify-between px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Live Preview
          </h2>
          <p className="text-gray-400 text-xs mt-0.5">Updates as you type</p>
        </div>
      </div>

      {/* Resume Paper */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
        <div
          ref={resumeRef}
          className="bg-white shadow-lg mx-auto p-8 md:p-10"
          style={{ fontFamily: 'Inter, sans-serif', maxWidth: '700px' }}
        >
          {hasContent ? (
            <>
              {/* Header */}
              <div className="mb-8 pb-6 border-b-2 border-gray-900">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                  {personal.firstName}{personal.lastName ? ` ${personal.lastName}` : ''}
                </h1>
                <div className="flex flex-wrap gap-3 mt-3">
                  {personal.email && (
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {personal.email}
                    </span>
                  )}
                  {personal.phone && (
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {personal.phone}
                    </span>
                  )}
                  {personal.location && (
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {personal.location}
                    </span>
                  )}
                  {personal.linkedin && (
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn
                    </span>
                  )}
                  {personal.portfolio && (
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      Portfolio
                    </span>
                  )}
                </div>
              </div>

              {/* Summary */}
              {personal.summary && (
                <div className="mb-6">
                  <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-gray-900 inline-block"></span>
                    Professional Summary
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">{personal.summary}</p>
                </div>
              )}

              {/* Work Experience */}
              {experience.include && (experience.jobTitle || experience.company) && (
                <div className="mb-6">
                  <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-gray-900 inline-block"></span>
                    Work Experience
                  </h2>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{experience.jobTitle}</h3>
                      <p className="text-gray-500 text-sm">{experience.company}</p>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md flex-shrink-0 ml-2">
                      {experience.startDate}{experience.endDate ? ` — ${experience.endDate}` : ''}
                    </span>
                  </div>
                  {experience.description && <p className="text-gray-600 mt-2 text-sm leading-relaxed">{experience.description}</p>}
                </div>
              )}

              {/* Education */}
              {(education.degree || education.institution) && (
                <div className="mb-6">
                  <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-gray-900 inline-block"></span>
                    Education
                  </h2>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{education.degree}</h3>
                      <p className="text-gray-500 text-sm">{education.institution}</p>
                      {education.grade && <p className="text-xs text-gray-400 mt-0.5">Grade: {education.grade}</p>}
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md flex-shrink-0 ml-2">
                      {education.startYear}{education.endYear ? ` — ${education.endYear}` : ''}
                    </span>
                  </div>
                </div>
              )}

              {skillList.length > 0 && (
  <div className="mb-6">
    <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
      <span className="w-4 h-px bg-gray-900 inline-block"></span>
      Skills
    </h2>
    <div className="flex flex-col gap-1.5">
      {skillList.map((skill, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0"></span>
          <span className="text-gray-700 text-sm">{skill}</span>
        </div>
      ))}
    </div>
  </div>
)}
              {/* Projects */}
              {(projects.name || projects.description) && (
                <div className="mb-6">
                  <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-gray-900 inline-block"></span>
                    Projects
                  </h2>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 text-sm">{projects.name}</h3>
                    {projects.technologies && <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md flex-shrink-0 ml-2">{projects.technologies}</span>}
                  </div>
                  {projects.description && <p className="text-gray-600 mt-1 text-sm leading-relaxed">{projects.description}</p>}
                  {projects.link && <a href={projects.link} className="text-gray-900 text-xs mt-1 block underline">{projects.link}</a>}
                </div>
              )}

              {/* Certifications */}
              {certifications.include && certifications.name && (
                <div className="mb-6">
                  <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-gray-900 inline-block"></span>
                    Certifications
                  </h2>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{certifications.name}</h3>
                      <p className="text-gray-500 text-sm">{certifications.organization}</p>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md flex-shrink-0 ml-2">{certifications.date}</span>
                  </div>
                </div>
              )}

              {/* Interests */}
                {interestList.length > 0 && (
  <div className="mb-6">
    <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
      <span className="w-4 h-px bg-gray-900 inline-block"></span>
      Interests
    </h2>
    <div className="flex flex-col gap-1.5">
      {interestList.map((interest, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
          <span className="text-gray-600 text-sm">{interest}</span>
        </div>
      ))}
    </div>
  </div>
)}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg font-medium">Start filling the form</p>
              <p className="text-sm mt-1">Your resume will appear here live</p>
            </div>
          )}
        </div>
      </div>

      {/* Download Button */}
      <div className="px-6 md:px-8 py-4 border-t border-gray-100 bg-white">
        <button
          onClick={downloadPDF}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3.5 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
          </svg>
          Download PDF
        </button>
      </div>

    </div>
  );
};

export default ResumePreview;