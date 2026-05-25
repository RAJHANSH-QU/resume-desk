import React from "react";

const sampleData = {
  personal: {
    firstName: "Marcus",
    lastName: "Webb",
    email: "marcus.webb@email.com",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    linkedin: "linkedin.com/in/marcuswebb",
    portfolio: "marcuswebb.io",
    photo: "",
    summary:
      "Product designer bridging the gap between user insight and engineering constraints. 6 years crafting digital experiences for fintech and consumer apps used by millions.",
  },
  experience: [
    {
      include: true,
      jobTitle: "Lead Product Designer",
      company: "Robinhood",
      startDate: "Feb 2022",
      endDate: "Present",
      description:
        "Redesigned the options trading interface, reducing task completion time by 35%. Led a team of 4 designers across mobile and web platforms.",
    },
    {
      include: true,
      jobTitle: "Senior UX Designer",
      company: "Cash App",
      startDate: "Aug 2019",
      endDate: "Jan 2022",
      description:
        "Owned the peer-to-peer payment flow from concept to launch. Ran 20+ usability studies and shipped designs to 40M+ users.",
    },
  ],
  education: [
    {
      degree: "BFA Interaction Design",
      institution: "Rhode Island School of Design",
      startYear: "2013",
      endYear: "2017",
      grade: "Magna Cum Laude",
    },
  ],
  skills: {
    list: "Figma\nPrototyping\nUser Research\nDesign Systems\nSwift UI\nFramer\nSQL\nA/B Testing",
  },
  projects: [
    {
      name: "Designkit OS",
      technologies: "Figma, Storybook",
      description: "Open-source design system with 200+ components adopted by 80+ teams.",
      link: "designkitos.com",
    },
  ],
  certifications: [
    {
      include: true,
      name: "Google UX Design Certificate",
      organization: "Google / Coursera",
      date: "2021",
      url: "",
    },
  ],
  interests: { list: "Typography\nFilm photography\nUrban sketching" },
};

export default function ModernTemplate({ data = sampleData }) {
  const { personal, experience, education, skills, projects, certifications, interests } = data;

  const skillList = skills?.list ? skills.list.split("\n").filter(Boolean) : [];
  const interestList = interests?.list ? interests.list.split("\n").filter(Boolean) : [];

  const dark = "#1c1f26";
  const accentGreen = "#4ade80";
  const textOnDark = "#e2e8f0";
  const textDimmed = "#94a3b8";
  const mainText = "#1e293b";
  const mainMuted = "#475569";
  const ruleLine = "#e2e8f0";

  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        maxWidth: 840,
        margin: "0 auto",
        background: "#fff",
        display: "flex",
        minHeight: 1000,
        fontSize: 13.5,
        lineHeight: 1.6,
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: 260,
          flexShrink: 0,
          background: dark,
          color: textOnDark,
          padding: "40px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {/* Avatar / Name */}
        <div>
          {/* Photo or Initials */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: accentGreen,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
              color: dark,
              marginBottom: 16,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {personal.photo ? (
              <img
                src={personal.photo}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span>{personal.firstName?.[0]}{personal.lastName?.[0]}</span>
            )}
          </div>

          <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, color: "#fff" }}>
            {personal.firstName}
          </div>
          <div style={{ fontSize: 22, fontWeight: 300, lineHeight: 1.2, color: textDimmed }}>
            {personal.lastName}
          </div>
        </div>

        {/* Contact */}
        <SideSection title="Contact" accentGreen={accentGreen}>
          {personal.email && <SideItem label="Email" value={personal.email} textDimmed={textDimmed} textOnDark={textOnDark} />}
          {personal.phone && <SideItem label="Phone" value={personal.phone} textDimmed={textDimmed} textOnDark={textOnDark} />}
          {personal.location && <SideItem label="Location" value={personal.location} textDimmed={textDimmed} textOnDark={textOnDark} />}
          {personal.linkedin && <SideItem label="LinkedIn" value={personal.linkedin} textDimmed={textDimmed} textOnDark={textOnDark} />}
          {personal.portfolio && <SideItem label="Portfolio" value={personal.portfolio} textDimmed={textDimmed} textOnDark={textOnDark} />}
        </SideSection>

        {/* Skills */}
        {skillList.length > 0 && (
          <SideSection title="Skills" accentGreen={accentGreen}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {skillList.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: accentGreen, flexShrink: 0 }} />
                  <span style={{ color: textOnDark, fontSize: 13 }}>{s}</span>
                </div>
              ))}
            </div>
          </SideSection>
        )}

        {/* Interests */}
        {interestList.length > 0 && (
          <SideSection title="Interests" accentGreen={accentGreen}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {interestList.map((item, i) => (
                <div key={i} style={{ color: textDimmed, fontSize: 13 }}>{item}</div>
              ))}
            </div>
          </SideSection>
        )}
      </div>

      {/* Right Main Content */}
      <div style={{ flex: 1, padding: "40px 36px" }}>

        {/* Summary */}
        {personal.summary && (
          <div style={{ marginBottom: 32, paddingBottom: 28, borderBottom: `1px solid ${ruleLine}` }}>
            <div style={{ fontSize: 13, color: mainMuted, lineHeight: 1.7 }}>{personal.summary}</div>
          </div>
        )}

        {/* Experience */}
        {experience?.filter(e => e.include !== false).length > 0 && (
          <MainSection title="Experience" ruleLine={ruleLine} mainText={mainText}>
            {experience.filter(e => e.include !== false).map((job, i) => (
              <div key={i} style={{ marginBottom: 22, paddingLeft: 16, borderLeft: `3px solid ${accentGreen}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ fontWeight: 700, fontSize: 14.5, color: mainText }}>{job.jobTitle}</div>
                  <div style={{ fontSize: 12, color: mainMuted, whiteSpace: "nowrap" }}>
                    {job.startDate} – {job.endDate || "Present"}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#64748b", marginBottom: 5, fontWeight: 500 }}>{job.company}</div>
                {job.description && <div style={{ fontSize: 13, color: mainMuted, lineHeight: 1.65 }}>{job.description}</div>}
              </div>
            ))}
          </MainSection>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <MainSection title="Education" ruleLine={ruleLine} mainText={mainText}>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: mainText }}>{edu.degree}</div>
                  <div style={{ fontSize: 12, color: mainMuted }}>{edu.startYear} – {edu.endYear}</div>
                </div>
                <div style={{ fontSize: 13, color: "#64748b" }}>{edu.institution}</div>
                {edu.grade && <div style={{ fontSize: 12, color: mainMuted, marginTop: 2 }}>{edu.grade}</div>}
              </div>
            ))}
          </MainSection>
        )}

        {/* Projects */}
        {projects?.filter(p => p.name).length > 0 && (
          <MainSection title="Projects" ruleLine={ruleLine} mainText={mainText}>
            {projects.filter(p => p.name).map((p, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: mainText }}>{p.name}</span>
                  {p.link && <span style={{ fontSize: 12, color: "#0ea5e9" }}>{p.link}</span>}
                </div>
                {p.technologies && <div style={{ fontSize: 12, color: mainMuted, marginTop: 1 }}>{p.technologies}</div>}
                {p.description && <div style={{ fontSize: 13, color: mainMuted, marginTop: 4 }}>{p.description}</div>}
              </div>
            ))}
          </MainSection>
        )}

        {/* Certifications */}
        {certifications?.filter(c => c.include !== false).length > 0 && (
          <MainSection title="Certifications" ruleLine={ruleLine} mainText={mainText}>
            {certifications.filter(c => c.include !== false).map((cert, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 13.5, color: mainText }}>{cert.name}</span>
                <span style={{ color: mainMuted, fontSize: 12.5 }}>
                  {" — "}{cert.organization}{cert.date ? `, ${cert.date}` : ""}
                </span>
              </div>
            ))}
          </MainSection>
        )}

      </div>
    </div>
  );
}

function SideSection({ title, children, accentGreen }) {
  return (
    <div>
      <div style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: accentGreen,
        marginBottom: 10,
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function SideItem({ label, value, textDimmed, textOnDark }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ fontSize: 10, color: textDimmed, letterSpacing: "0.5px", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 12.5, color: textOnDark, wordBreak: "break-word" }}>{value}</div>
    </div>
  );
}

function MainSection({ title, children, ruleLine, mainText }) {
  return (
    <div style={{ marginBottom: 30 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "1.8px",
          textTransform: "uppercase",
          color: mainText,
        }}>
          {title}
        </span>
        <div style={{ flex: 1, height: 1, background: ruleLine }} />
      </div>
      {children}
    </div>
  );
}