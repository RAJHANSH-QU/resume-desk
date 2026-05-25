import React from "react";

const sampleData = {
  personal: {
    firstName: "Nadia",
    lastName: "Okonkwo",
    email: "nadia@okonkwo.com",
    phone: "+1 (555) 102-3040",
    location: "Chicago, IL",
    linkedin: "linkedin.com/in/nadiaokonkwo",
    portfolio: "nadiaokonkwo.com",
    summary:
      "Data scientist specializing in NLP and recommendation systems. Former researcher turned industry practitioner, with a strong record in translating complex models into measurable business value.",
  },
  experience: [
    {
      include: true,
      jobTitle: "Staff Data Scientist",
      company: "Netflix",
      startDate: "Jun 2020",
      endDate: "Present",
      description:
        "Developed content recommendation model that increased watch hours by 8%. Built and maintained ML pipelines serving 200M+ users globally.",
    },
    {
      include: true,
      jobTitle: "Data Scientist",
      company: "Twitter",
      startDate: "Sep 2017",
      endDate: "May 2020",
      description:
        "Built timeline ranking features using gradient boosted trees. Reduced harmful content surfacing by 22% using NLP classifiers.",
    },
  ],
  education: [
    {
      degree: "M.S. Statistics",
      institution: "University of Chicago",
      startYear: "2015",
      endYear: "2017",
      grade: "",
    },
    {
      degree: "B.A. Mathematics",
      institution: "Northwestern University",
      startYear: "2011",
      endYear: "2015",
      grade: "summa cum laude",
    },
  ],
  skills: {
    list: "Python\nR\nSpark\nSQL\nTensorFlow\nPyTorch\nAirflow\nDatabricks",
  },
  projects: [
    {
      name: "NLPBench",
      technologies: "Python, HuggingFace",
      description: "Public NLP benchmarking suite used in 40+ academic papers.",
      link: "nlpbench.org",
    },
  ],
  certifications: [],
  interests: { list: "Piano\nMarathon running\nMathematical puzzles" },
};

export default function MinimalTemplate({ data = sampleData }) {
  const { personal, experience, education, skills, projects, certifications, interests } = data;

  const skillList = skills?.list ? skills.list.split("\n").filter(Boolean) : [];
  const interestList = interests?.list ? interests.list.split("\n").filter(Boolean) : [];

  return (
    <div
      style={{
        fontFamily: "'Garamond', 'EB Garamond', Georgia, serif",
        maxWidth: 760,
        margin: "0 auto",
        background: "#fff",
        color: "#111",
        padding: "56px 60px",
        fontSize: 14,
        lineHeight: 1.65,
      }}
    >
      {/* Header */}
      <div style={{ borderBottom: "2px solid #111", paddingBottom: 20, marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: 42, fontWeight: 400, letterSpacing: "-1px", lineHeight: 1 }}>
              {personal.firstName} {personal.lastName}
            </div>
          </div>
          <div style={{ textAlign: "right", fontSize: 12.5, color: "#444", lineHeight: 1.8 }}>
            {[personal.email, personal.phone, personal.location, personal.linkedin, personal.portfolio]
              .filter(Boolean)
              .map((item, i) => (
                <div key={i}>{item}</div>
              ))}
          </div>
        </div>
        {personal.summary && (
          <div style={{ marginTop: 16, fontSize: 14, color: "#333", fontStyle: "italic", maxWidth: 560 }}>
            {personal.summary}
          </div>
        )}
      </div>

      {/* Experience */}
      {experience?.filter((e) => e.include !== false).length > 0 && (
        <MinSection title="Experience">
          {experience
            .filter((e) => e.include !== false)
            .map((job, i) => (
              <div key={i} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontWeight: 700 }}>{job.jobTitle}</span>
                    <span style={{ color: "#555", marginLeft: 8, fontStyle: "italic" }}>{job.company}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: "#666" }}>
                    {job.startDate} – {job.endDate || "Present"}
                  </div>
                </div>
                {job.description && (
                  <div style={{ marginTop: 4, color: "#333", fontSize: 13.5 }}>{job.description}</div>
                )}
              </div>
            ))}
        </MinSection>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <MinSection title="Education">
          {education.map((edu, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div>
                <span style={{ fontWeight: 700 }}>{edu.degree}</span>
                <span style={{ color: "#555", marginLeft: 8, fontStyle: "italic" }}>{edu.institution}</span>
                {edu.grade && <span style={{ fontSize: 12.5, color: "#888", marginLeft: 8 }}>{edu.grade}</span>}
              </div>
              <div style={{ fontSize: 12.5, color: "#666" }}>{edu.startYear} – {edu.endYear}</div>
            </div>
          ))}
        </MinSection>
      )}

      {/* Skills */}
      {skillList.length > 0 && (
        <MinSection title="Skills">
          <div style={{ color: "#333", fontSize: 13.5 }}>{skillList.join("  ·  ")}</div>
        </MinSection>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <MinSection title="Projects">
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700 }}>{p.name}</span>
                {p.link && <span style={{ fontSize: 12.5, color: "#555" }}>{p.link}</span>}
              </div>
              {p.technologies && <div style={{ fontSize: 12.5, color: "#777", fontStyle: "italic" }}>{p.technologies}</div>}
              {p.description && <div style={{ fontSize: 13.5, color: "#333", marginTop: 3 }}>{p.description}</div>}
            </div>
          ))}
        </MinSection>
      )}

      {/* Certifications */}
      {certifications?.filter((c) => c.include !== false).length > 0 && (
        <MinSection title="Certifications">
          {certifications
            .filter((c) => c.include !== false)
            .map((cert, i) => (
              <div key={i} style={{ marginBottom: 6, fontSize: 13.5, color: "#333" }}>
                <span style={{ fontWeight: 600 }}>{cert.name}</span>
                {cert.organization && <span style={{ color: "#666" }}> — {cert.organization}</span>}
                {cert.date && <span style={{ color: "#888" }}>, {cert.date}</span>}
              </div>
            ))}
        </MinSection>
      )}

      {/* Interests */}
      {interestList.length > 0 && (
        <MinSection title="Interests">
          <div style={{ color: "#555", fontStyle: "italic", fontSize: 13.5 }}>{interestList.join("  ·  ")}</div>
        </MinSection>
      )}
    </div>
  );
}

function MinSection({ title, children }) {
  return (
    <div style={{ marginTop: 24 }}>
      <div
        style={{
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          color: "#111",
          fontFamily: "Arial, sans-serif",
          marginBottom: 10,
          paddingBottom: 4,
          borderBottom: "0.75px solid #ccc",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}