import React from "react";

const sampleData = {
  personal: {
    firstName: "Richard",
    lastName: "Harmon",
    email: "r.harmon@executivepro.com",
    phone: "+1 (212) 555-7890",
    location: "Greenwich, CT",
    linkedin: "linkedin.com/in/richardharmon",
    portfolio: "",
    summary:
      "C-suite executive with 20+ years in global financial services. Proven record of driving organizational transformation, M&A integration, and building high-performance cultures across Europe and North America.",
  },
  experience: [
    {
      include: true,
      jobTitle: "Chief Operating Officer",
      company: "Barclays Capital",
      startDate: "2018",
      endDate: "Present",
      description:
        "Oversee $4.2B operating budget and a team of 3,200. Delivered $320M in cost savings through operational restructuring. Led post-merger integration of three acquired entities.",
    },
    {
      include: true,
      jobTitle: "Managing Director, Operations",
      company: "Goldman Sachs",
      startDate: "2012",
      endDate: "2018",
      description:
        "Built and scaled equities operations division from 400 to 1,100 professionals. Spearheaded regulatory compliance overhaul ahead of Dodd-Frank implementation.",
    },
    {
      include: true,
      jobTitle: "Director, Strategic Finance",
      company: "JPMorgan Chase",
      startDate: "2007",
      endDate: "2012",
      description:
        "Managed $800M portfolio of strategic investments. Structured 11 cross-border deals totaling $2.4B in transaction value.",
    },
  ],
  education: [
    {
      degree: "MBA, Finance",
      institution: "Wharton School, University of Pennsylvania",
      startYear: "2005",
      endYear: "2007",
      grade: "Dean's List",
    },
    {
      degree: "B.A. Economics",
      institution: "Yale University",
      startYear: "2001",
      endYear: "2005",
      grade: "",
    },
  ],
  skills: {
    list: "P&L Management\nM&A Integration\nBoard Relations\nRisk Governance\nCapital Markets\nRegulatory Affairs\nChange Management\nExecutive Communication",
  },
  projects: [],
  certifications: [
    {
      include: true,
      name: "Chartered Financial Analyst (CFA)",
      organization: "CFA Institute",
      date: "2009",
      url: "",
    },
  ],
  interests: { list: "Fly fishing\nBoard governance\nSail racing" },
};

export default function ExecutiveTemplate({ data = sampleData }) {
  const { personal, experience, education, skills, projects, certifications, interests } = data;

  const skillList = skills?.list ? skills.list.split("\n").filter(Boolean) : [];
  const interestList = interests?.list ? interests.list.split("\n").filter(Boolean) : [];

  const gold = "#b8922a";
  const navy = "#1b2a4a";
  const navyLight = "#edf0f6";
  const border = "#d8cdb5";
  const textDark = "#1a1a1a";
  const textMid = "#3d3d3d";
  const textMuted = "#666";

  return (
    <div
      style={{
        fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
        maxWidth: 880,
        margin: "0 auto",
        background: "#faf9f7",
        color: textDark,
        fontSize: 13.5,
        lineHeight: 1.6,
      }}
    >
      {/* Top Header Band */}
      <div
        style={{
          background: navy,
          padding: "40px 50px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <div style={{ fontSize: 38, fontWeight: 400, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.5px" }}>
            {personal.firstName} {personal.lastName}
          </div>
          <div style={{ width: 50, height: 3, background: gold, margin: "12px 0 14px" }} />
          {personal.summary && (
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", maxWidth: 500, lineHeight: 1.65, fontStyle: "italic" }}>
              {personal.summary}
            </div>
          )}
        </div>
        <div style={{ textAlign: "right", fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 2 }}>
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
          {personal.linkedin && <div>{personal.linkedin}</div>}
        </div>
      </div>

      {/* Two Column Body */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 0 }}>
        {/* Left: Main */}
        <div style={{ padding: "36px 40px", borderRight: `1px solid ${border}` }}>
          {/* Experience */}
          {experience?.filter((e) => e.include !== false).length > 0 && (
            <ExecSection title="Professional Experience" gold={gold} border={border} navy={navy}>
              {experience
                .filter((e) => e.include !== false)
                .map((job, i) => (
                  <div key={i} style={{ marginBottom: 22 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: navy }}>{job.jobTitle}</div>
                      <div style={{ fontSize: 12, color: textMuted, whiteSpace: "nowrap", fontStyle: "italic" }}>
                        {job.startDate} – {job.endDate || "Present"}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 12.5,
                        color: gold,
                        fontWeight: 600,
                        letterSpacing: "0.3px",
                        marginBottom: 5,
                      }}
                    >
                      {job.company}
                    </div>
                    {job.description && (
                      <div style={{ fontSize: 13, color: textMid, lineHeight: 1.65 }}>{job.description}</div>
                    )}
                  </div>
                ))}
            </ExecSection>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <ExecSection title="Education" gold={gold} border={border} navy={navy}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: navy }}>{edu.degree}</span>
                    <span style={{ fontSize: 12, color: textMuted }}>
                      {edu.startYear} – {edu.endYear}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: textMid, fontStyle: "italic" }}>{edu.institution}</div>
                  {edu.grade && <div style={{ fontSize: 12, color: textMuted }}>{edu.grade}</div>}
                </div>
              ))}
            </ExecSection>
          )}
        </div>

        {/* Right: Secondary */}
        <div style={{ padding: "36px 28px", background: navyLight }}>
          {/* Core Competencies */}
          {skillList.length > 0 && (
            <SideExecSection title="Core Competencies" gold={gold} navy={navy} border={border}>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {skillList.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 4, height: 4, background: gold, flexShrink: 0 }} />
                    <span style={{ fontSize: 12.5, color: textDark }}>{s}</span>
                  </div>
                ))}
              </div>
            </SideExecSection>
          )}

          {/* Certifications */}
          {certifications?.filter((c) => c.include !== false).length > 0 && (
            <SideExecSection title="Credentials" gold={gold} navy={navy} border={border}>
              {certifications
                .filter((c) => c.include !== false)
                .map((cert, i) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: navy }}>{cert.name}</div>
                    <div style={{ fontSize: 12, color: textMuted }}>
                      {cert.organization}{cert.date ? ` · ${cert.date}` : ""}
                    </div>
                  </div>
                ))}
            </SideExecSection>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <SideExecSection title="Notable Projects" gold={gold} navy={navy} border={border}>
              {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: navy }}>{p.name}</div>
                  {p.description && <div style={{ fontSize: 12, color: textMid, marginTop: 3 }}>{p.description}</div>}
                </div>
              ))}
            </SideExecSection>
          )}

          {/* Interests */}
          {interestList.length > 0 && (
            <SideExecSection title="Personal" gold={gold} navy={navy} border={border}>
              {interestList.map((item, i) => (
                <div key={i} style={{ fontSize: 12.5, color: textMid, marginBottom: 4 }}>{item}</div>
              ))}
            </SideExecSection>
          )}
        </div>
      </div>
    </div>
  );
}

function ExecSection({ title, children, gold, border, navy }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 14,
        }}
      >
        <div style={{ width: 18, height: 2, background: gold }} />
        <span
          style={{
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: navy,
            fontFamily: "Arial, sans-serif",
          }}
        >
          {title}
        </span>
        <div style={{ flex: 1, height: "0.5px", background: border }} />
      </div>
      {children}
    </div>
  );
}

function SideExecSection({ title, children, gold, navy, border }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: gold,
          fontFamily: "Arial, sans-serif",
          paddingBottom: 8,
          borderBottom: `1px solid ${border}`,
          marginBottom: 12,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}