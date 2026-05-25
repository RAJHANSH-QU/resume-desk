import React, { useState } from 'react';
import { generateSummary, suggestSkills, improveDescription } from '../groq';

const ResumeForm = ({ resumeData, setResumeData, onPreview }) => {
  const [activeSection, setActiveSection] = useState('personal');

  const sections = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'experience', label: 'Work Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'interests', label: 'Interests' },
  ];

  const updatePersonal = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const updateArrayItem = (section, index, field, value) => {
    setResumeData(prev => {
      const updated = [...prev[section]];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [section]: updated };
    });
  };

  const addItem = (section, template) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...template }]
    }));
  };

  const removeItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const updateSkills = (value) => {
    setResumeData(prev => ({ ...prev, skills: { list: value } }));
  };

  const updateInterests = (value) => {
    setResumeData(prev => ({ ...prev, interests: { list: value } }));
  };

  return (
    <section className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Build Your Resume
          </h2>
          <p className="text-gray-400 mt-1 text-sm">Fill in your details section by section</p>
        </div>
        {onPreview && (
          <button
            onClick={onPreview}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl hover:bg-gray-700 transition-all duration-300 text-sm font-medium flex-shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="hidden sm:block">Preview</span>
          </button>
        )}
      </div>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeSection === section.id
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Form Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        {activeSection === 'personal' && (
          <PersonalInfo data={resumeData.personal} update={updatePersonal} />
        )}
        {activeSection === 'experience' && (
          <ExperienceSection
            items={resumeData.experience}
            update={(i, f, v) => updateArrayItem('experience', i, f, v)}
            add={() => addItem('experience', { include: true, jobTitle: '', company: '', startDate: '', endDate: '', description: '' })}
            remove={(i) => removeItem('experience', i)}
          />
        )}
        {activeSection === 'education' && (
          <EducationSection
            items={resumeData.education}
            update={(i, f, v) => updateArrayItem('education', i, f, v)}
            add={() => addItem('education', { degree: '', institution: '', startYear: '', endYear: '', grade: '' })}
            remove={(i) => removeItem('education', i)}
          />
        )}
        {activeSection === 'skills' && (
          <Skills data={resumeData.skills} update={updateSkills} />
        )}
        {activeSection === 'projects' && (
          <ProjectsSection
            items={resumeData.projects}
            update={(i, f, v) => updateArrayItem('projects', i, f, v)}
            add={() => addItem('projects', { name: '', technologies: '', description: '', link: '' })}
            remove={(i) => removeItem('projects', i)}
          />
        )}
        {activeSection === 'certifications' && (
          <CertificationsSection
            items={resumeData.certifications}
            update={(i, f, v) => updateArrayItem('certifications', i, f, v)}
            add={() => addItem('certifications', { include: true, name: '', organization: '', date: '', url: '' })}
            remove={(i) => removeItem('certifications', i)}
          />
        )}
        {activeSection === 'interests' && (
          <Interests data={resumeData.interests} update={updateInterests} />
        )}
      </div>
    </section>
  );
};

const inputClass = "border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 w-full transition-all duration-200 text-sm";

const AIButton = ({ onClick, loading, icon, label, loadingLabel }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="flex items-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-xl font-medium hover:bg-gray-700 transition-all duration-300 disabled:opacity-50 text-sm w-full justify-center"
  >
    {loading ? (
      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {icon}
      </svg>
    )}
    {loading ? loadingLabel : label}
  </button>
);

const Toggle = ({ value, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <span className="text-sm text-gray-500">Include</span>
    <div onClick={() => onChange(!value)} className={`w-11 h-6 rounded-full transition-colors duration-300 ${value ? 'bg-gray-900' : 'bg-gray-200'} relative`}>
      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all duration-300 ${value ? 'left-5' : 'left-0.5'}`} />
    </div>
  </label>
);

const AddButton = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 text-gray-400 py-3 rounded-xl hover:border-gray-400 hover:text-gray-600 transition-all duration-200 text-sm font-medium mt-4"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
    {label}
  </button>
);

const RemoveButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1 text-red-400 hover:text-red-600 transition-colors text-xs font-medium"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
    Remove
  </button>
);

const PersonalInfo = ({ data, update }) => {
  const [loading, setLoading] = useState(false);

  const handleSummary = async () => {
    if (!data.firstName) return;
    setLoading(true);
    try {
      const summary = await generateSummary(
        `${data.firstName} ${data.lastName}`,
        'Professional', '', ''
      );
      update('summary', summary);
    } catch (e) {
      alert('AI error, try again!');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-5">Personal Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input value={data.firstName} onChange={e => update('firstName', e.target.value)} type="text" placeholder="First Name" className={inputClass} />
        <input value={data.lastName} onChange={e => update('lastName', e.target.value)} type="text" placeholder="Last Name (optional)" className={inputClass} />
      </div>
      <input value={data.email} onChange={e => update('email', e.target.value)} type="email" placeholder="Email Address" className={inputClass} />
      <input value={data.phone} onChange={e => update('phone', e.target.value.replace(/[^0-9+\-\s()]/g, ''))} type="text" placeholder="Phone Number" className={inputClass} />
      <input value={data.location} onChange={e => update('location', e.target.value)} type="text" placeholder="Location (City, Country)" className={inputClass} />
      <input value={data.linkedin} onChange={e => update('linkedin', e.target.value)} type="text" placeholder="LinkedIn URL" className={inputClass} />
      <input value={data.portfolio} onChange={e => update('portfolio', e.target.value)} type="text" placeholder="Portfolio / Website URL" className={inputClass} />
      <div className="space-y-2">
  <label className="text-xs text-gray-400 font-medium">Profile Photo (optional — for Modern & Creative templates)</label>
  <input
    type="file"
    accept="image/*"
    onChange={e => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => update('photo', reader.result);
        reader.readAsDataURL(file);
      }
    }}
    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-gray-900 file:text-white file:font-medium hover:file:bg-gray-700 transition-all"
  />
  {data.photo && (
    <div className="flex items-center gap-3 mt-2">
      <img src={data.photo} alt="Preview" className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" />
      <button onClick={() => update('photo', '')} className="text-xs text-red-400 hover:text-red-600">Remove photo</button>
    </div>
  )}
</div>
      <textarea value={data.summary || ''} onChange={e => update('summary', e.target.value)} placeholder="Professional summary (or let AI generate it)..." rows={3} className={`${inputClass} resize-none`} />
      <AIButton
        onClick={handleSummary}
        loading={loading}
        label="AI Generate Summary"
        loadingLabel="Generating..."
        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />}
      />
    </div>
  );
};

const ExperienceSection = ({ items, update, add, remove }) => {
  const [loadingIndex, setLoadingIndex] = useState(null);

  const handleImprove = async (index, description) => {
    if (!description) return;
    setLoadingIndex(index);
    try {
      const improved = await improveDescription(description);
      update(index, 'description', improved);
    } catch (e) {
      alert('AI error, try again!');
    }
    setLoadingIndex(null);
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-5">Work Experience</h3>
      {items.map((item, i) => (
        <div key={i} className="mb-6 pb-6 border-b border-gray-100 last:border-0 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-500">Experience {i + 1}</span>
            <div className="flex items-center gap-3">
              <Toggle value={item.include} onChange={v => update(i, 'include', v)} />
              {items.length > 1 && <RemoveButton onClick={() => remove(i)} />}
            </div>
          </div>
          {item.include ? (
            <>
              <input value={item.jobTitle} onChange={e => update(i, 'jobTitle', e.target.value)} type="text" placeholder="Job Title" className={inputClass} />
              <input value={item.company} onChange={e => update(i, 'company', e.target.value)} type="text" placeholder="Company Name" className={inputClass} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input value={item.startDate} onChange={e => update(i, 'startDate', e.target.value)} type="text" placeholder="Start Date (e.g. Jan 2022)" className={inputClass} />
                <input value={item.endDate} onChange={e => update(i, 'endDate', e.target.value)} type="text" placeholder="End Date (or Present)" className={inputClass} />
              </div>
              <textarea value={item.description} onChange={e => update(i, 'description', e.target.value)} placeholder="Describe your responsibilities..." rows={3} className={`${inputClass} resize-none`} />
              <AIButton
                onClick={() => handleImprove(i, item.description)}
                loading={loadingIndex === i}
                label="AI Improve Description"
                loadingLabel="Improving..."
                icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />}
              />
            </>
          ) : (
            <div className="text-center py-6 text-gray-300 text-sm">Section excluded from resume</div>
          )}
        </div>
      ))}
      <AddButton onClick={add} label="Add Another Experience" />
    </div>
  );
};

const EducationSection = ({ items, update, add, remove }) => (
  <div>
    <h3 className="text-xl font-bold text-gray-800 mb-5">Education</h3>
    {items.map((item, i) => (
      <div key={i} className="mb-6 pb-6 border-b border-gray-100 last:border-0 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-500">Education {i + 1}</span>
          {items.length > 1 && <RemoveButton onClick={() => remove(i)} />}
        </div>
        <input value={item.degree} onChange={e => update(i, 'degree', e.target.value)} type="text" placeholder="Degree (e.g. Bachelor of Science)" className={inputClass} />
        <input value={item.institution} onChange={e => update(i, 'institution', e.target.value)} type="text" placeholder="Institution Name" className={inputClass} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input value={item.startYear} onChange={e => update(i, 'startYear', e.target.value)} type="text" placeholder="Start Year" className={inputClass} />
          <input value={item.endYear} onChange={e => update(i, 'endYear', e.target.value)} type="text" placeholder="End Year" className={inputClass} />
        </div>
        <input value={item.grade} onChange={e => update(i, 'grade', e.target.value)} type="text" placeholder="Grade / GPA (optional)" className={inputClass} />
      </div>
    ))}
    <AddButton onClick={add} label="Add Another Education" />
  </div>
);

const Skills = ({ data, update }) => {
  const [loading, setLoading] = useState(false);

  const handleSuggest = async () => {
    setLoading(true);
    try {
      const suggested = await suggestSkills('professional');
      update(suggested);
    } catch (e) {
      alert('AI error, try again!');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-5">Skills</h3>
      <p className="text-xs text-gray-400">Enter each skill on a new line</p>
      <textarea value={data.list} onChange={e => update(e.target.value)} placeholder={"JavaScript\nReact\nNode.js\nPython"} rows={6} className={`${inputClass} resize-none`} />
      <AIButton
        onClick={handleSuggest}
        loading={loading}
        label="AI Suggest Skills"
        loadingLabel="Suggesting..."
        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
      />
    </div>
  );
};

const ProjectsSection = ({ items, update, add, remove }) => (
  <div>
    <h3 className="text-xl font-bold text-gray-800 mb-5">Projects</h3>
    {items.map((item, i) => (
      <div key={i} className="mb-6 pb-6 border-b border-gray-100 last:border-0 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-500">Project {i + 1}</span>
          {items.length > 1 && <RemoveButton onClick={() => remove(i)} />}
        </div>
        <input value={item.name} onChange={e => update(i, 'name', e.target.value)} type="text" placeholder="Project Name" className={inputClass} />
        <input value={item.technologies} onChange={e => update(i, 'technologies', e.target.value)} type="text" placeholder="Technologies Used" className={inputClass} />
        <textarea value={item.description} onChange={e => update(i, 'description', e.target.value)} placeholder="Describe the project and your role..." rows={3} className={`${inputClass} resize-none`} />
        <input value={item.link} onChange={e => update(i, 'link', e.target.value)} type="text" placeholder="Project Link (optional)" className={inputClass} />
      </div>
    ))}
    <AddButton onClick={add} label="Add Another Project" />
  </div>
);

const CertificationsSection = ({ items, update, add, remove }) => (
  <div>
    <h3 className="text-xl font-bold text-gray-800 mb-5">Certifications</h3>
    {items.map((item, i) => (
      <div key={i} className="mb-6 pb-6 border-b border-gray-100 last:border-0 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-500">Certification {i + 1}</span>
          <div className="flex items-center gap-3">
            <Toggle value={item.include} onChange={v => update(i, 'include', v)} />
            {items.length > 1 && <RemoveButton onClick={() => remove(i)} />}
          </div>
        </div>
        {item.include ? (
          <>
            <input value={item.name} onChange={e => update(i, 'name', e.target.value)} type="text" placeholder="Certification Name" className={inputClass} />
            <input value={item.organization} onChange={e => update(i, 'organization', e.target.value)} type="text" placeholder="Issuing Organization" className={inputClass} />
            <input value={item.date} onChange={e => update(i, 'date', e.target.value)} type="text" placeholder="Date Issued" className={inputClass} />
            <input value={item.url} onChange={e => update(i, 'url', e.target.value)} type="text" placeholder="Certificate URL (optional)" className={inputClass} />
          </>
        ) : (
          <div className="text-center py-6 text-gray-300 text-sm">Section excluded from resume</div>
        )}
      </div>
    ))}
    <AddButton onClick={add} label="Add Another Certification" />
  </div>
);

const Interests = ({ data, update }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold text-gray-800 mb-5">Interests</h3>
    <p className="text-xs text-gray-400">Enter each interest on a new line</p>
    <textarea value={data.list} onChange={e => update(e.target.value)} placeholder={"Photography\nTravelling\nOpen Source"} rows={6} className={`${inputClass} resize-none`} />
  </div>
);

export default ResumeForm;