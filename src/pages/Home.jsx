import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import Footer from '../components/Footer';

const Home = () => {
  const [resumeData, setResumeData] = useState({
    personal: { firstName: '', lastName: '', email: '', phone: '', location: '', linkedin: '', portfolio: '', summary: '' },
    experience: { include: true, jobTitle: '', company: '', startDate: '', endDate: '', description: '' },
    education: { degree: '', institution: '', startYear: '', endYear: '', grade: '' },
    skills: { list: '' },
    projects: { name: '', technologies: '', description: '', link: '' },
    certifications: { include: true, name: '', organization: '', date: '', url: '' },
    interests: { list: '' },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <div id="build" className="flex flex-col lg:flex-row gap-8 px-8 py-16 max-w-screen-xl mx-auto">
        <div className="w-full lg:w-1/2">
          <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        </div>
        <div className="w-full lg:w-1/2">
          <ResumePreview resumeData={resumeData} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;