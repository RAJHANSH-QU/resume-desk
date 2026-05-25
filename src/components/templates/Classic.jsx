import React from "react";

const sampleData = {
  personal: {
    firstName: "Alexandra",
    lastName: "Chen",
    email: "alexandra.chen@email.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexandrachen",
    portfolio: "alexandrachen.dev",
    photo: "",
    summary:
      "Senior software engineer with 8+ years building scalable web applications. Passionate about clean architecture, developer experience, and mentoring teams to ship great products.",
  },
  experience: [
    {
      include: true,
      jobTitle: "Senior Software Engineer",
      company: "Stripe",
      startDate: "Jan 2021",
      endDate: "Present",
      description:
        "Led migration of core billing infrastructure to microservices, reducing latency by 40%. Mentored 6 junior engineers and established code review standards adopted org-wide.",
    },
    {
      include: true,
      jobTitle: "Software Engineer",
      company: "Airbnb",
      startDate: "Mar 2018",
      endDate: "Dec 2020",
      description:
        "Built real-time search ranking system processing 2M+ queries/day. Collaborated with product and design to ship guest checkout flow that increased conversion by 12%.",
    },
  ],
  education: [
    {
      degree: "B.S. Computer Science",
      institution: "UC Berkeley",
      startYear: "2013",
      endYear: "2017",
      grade: "3.9 GPA",
    },
  ],
  skills: { list: "React\nTypeScript\nNode.js\nPython\nPostgreSQL\nAWS\nDocker\nKubernetes" },
  projects: [
    {
      name: "OpenGraph Studio",
      technologies: "Next.js, Vercel, Puppeteer",
      description: "Open-source tool for generating and previewing OG images with 3k+ GitHub stars.",
      link: "github.com/achen/opengraph-studio",
    },
  ],
  certifications: [
    {
      include: true,
      name: "AWS Solutions Architect",
      organization: "Amazon Web Services",
      date: "2022",
      url: "",
    },
  ],
  interests: { list: "Open source\nRock climbing\nCoffee brewing" },
};

export default function ClassicTemplate({ data = sampleData }) {
  const { personal, experience, education, skills, projects, certifications, interests } = data;

  const skillList = skills?.list ? skills.list.split("\n").filter(Boolean) : [];
  const interestList = interests?.list ? interests.list.split("\n").filter(Boolean) : [];

  const navy = "#1a1a2e";
  const gold = "#c9a84c";
  const blue = "#0f3460";
  const textDark = "#1a1a2e";
  const textMid = "#4a5568";
  const textMuted = "#718096";
  const rule = "#e8e8e8";

  return (
    <div
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        maxWidth: 820,
        margin: "0 auto",
        background: "#fff",
        color: textDark,
        lineHeight: 1.6,
        fontSize: 14,
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background: navy,
          padding: "40px 48px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 24,
        }}
      >
        {/* Left: name only */}
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flex: 1 }}>
          <div style={{ paddingTop: 4 }}>
            <div
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.1,
                letterSpacing: "0.5px",
              }}
            >
              {personal.firstName}{" "}
              <span style={{ color: gold, fontWeight: 400 }}>{personal.lastName}</span>
            </div>
          </div>
        </div>

        {/* Right: contact */}
        <div
          style={{
            textAlign: "right",
            fontSize: 12,
            color: "rgba(255,255,255,0.75)",
            lineHeight: 2,
            flexShrink: 0,
            fontFamily: "Arial, sans-serif",
          }}
        >
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
          {personal.linkedin && <div style={{ color: gold }}>{personal.linkedin}</div>}
          {personal.portfolio && <div style={{ color: gold }}>{personal.portfolio}</div>}
        </div>
      </div>

      {/* Gold rule under header */}
      <div style={{ height: 3, background: gold }} />

      {/* ── Body ── */}
      <div style={{ padding: "8px 48px 48px" }}>

        {/* ── SUMMARY — first section ── */}
        {personal.summary && (
          <Section title="Summary" gold={gold} rule={rule}>
            <p
              style={{
                margin: 0,
                fontSize: 13.5,
                color: textMid,
                lineHeight: 1.85,
                fontStyle: "italic",
                borderLeft: `3px solid ${gold}`,
                paddingLeft: 16,
              }}
            >
              {personal.summary}
            </p>
          </Section>
        )}

        {/* ── Experience ── */}
        {experience?.filter((e) => e.include !== false).length > 0 && (
          <Section title="Experience" gold={gold} rule={rule}>
            {experience
              .filter((e) => e.include !== false)
              .map((job, i, arr) => (
                <div
                  key={i}
                  style={{
                    marginBottom: 20,
                    paddingBottom: 20,
                    borderBottom: i < arr.length - 1 ? `1px solid ${rule}` : "none",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: textDark }}>{job.jobTitle}</div>
                      <div style={{ fontSize: 13, color: blue, fontWeight: 600, marginTop: 1, fontFamily: "Arial, sans-serif" }}>
                        {job.company}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        color: "#fff",
                        background: navy,
                        padding: "2px 11px",
                        borderRadius: 20,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        marginLeft: 12,
                        fontFamily: "Arial, sans-serif",
                      }}
                    >
                      {job.startDate} — {job.endDate || "Present"}
                    </div>
                  </div>
                  {job.description && (
                    <div style={{ marginTop: 8, color: textMid, fontSize: 13.5, lineHeight: 1.75 }}>
                      {job.description}
                    </div>
                  )}
                </div>
              ))}
          </Section>
        )}

        {/* ── Education ── */}
        {education?.length > 0 && (
          <Section title="Education" gold={gold} rule={rule}>
            {education.map((edu, i) => (
              <div
                key={i}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14.5, color: textDark }}>{edu.degree}</div>
                  <div style={{ fontSize: 13, color: blue, fontStyle: "italic", marginTop: 2 }}>{edu.institution}</div>
                  {edu.grade && <div style={{ fontSize: 12.5, color: textMuted, fontFamily: "Arial, sans-serif" }}>{edu.grade}</div>}
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    color: "#fff",
                    background: navy,
                    padding: "2px 11px",
                    borderRadius: 20,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    marginLeft: 12,
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  {edu.startYear} — {edu.endYear}
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* ── Skills — plain text, one per line ── */}
        {skillList.length > 0 && (
          <Section title="Skills" gold={gold} rule={rule}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {skillList.map((s, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 13.5,
                    fontFamily: "Arial, sans-serif",
                    color: textMid,
                    lineHeight: 1.75,
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── Certifications ── */}
        {certifications?.filter((c) => c.include !== false).length > 0 && (
          <Section title="Certifications" gold={gold} rule={rule}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {certifications
                .filter((c) => c.include !== false)
                .map((cert, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "10px 16px",
                      background: "#f8f9ff",
                      borderLeft: `3px solid ${blue}`,
                      borderRadius: "0 8px 8px 0",
                      minWidth: 200,
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: 13.5, color: textDark }}>{cert.name}</div>
                    <div style={{ fontSize: 12, color: textMuted, marginTop: 2, fontFamily: "Arial, sans-serif" }}>
                      {cert.organization}{cert.date ? ` · ${cert.date}` : ""}
                    </div>
                  </div>
                ))}
            </div>
          </Section>
        )}

        {/* ── Projects ── */}
        {projects?.filter((p) => p.name).length > 0 && (
          <Section title="Projects" gold={gold} rule={rule}>
            {projects.filter((p) => p.name).map((p, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 14,
                  padding: "14px 18px",
                  background: "#f8f9ff",
                  borderRadius: 8,
                  border: "1px solid #e8ecf8",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: textDark }}>{p.name}</span>
                  {p.link && (
                    <span style={{ fontSize: 12, color: blue, fontFamily: "Arial, sans-serif" }}>{p.link}</span>
                  )}
                </div>
                {p.technologies && (
                  <div style={{ fontSize: 12, color: gold, fontWeight: 600, marginTop: 3, fontFamily: "Arial, sans-serif" }}>
                    {p.technologies}
                  </div>
                )}
                {p.description && (
                  <div style={{ fontSize: 13.5, color: textMid, marginTop: 5, lineHeight: 1.7 }}>
                    {p.description}
                  </div>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* ── Interests — plain text, one per line ── */}
        {interestList.length > 0 && (
          <Section title="Interests" gold={gold} rule={rule}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {interestList.map((item, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 13.5,
                    fontFamily: "Arial, sans-serif",
                    color: textMid,
                    lineHeight: 1.75,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </Section>
        )}

      </div>
    </div>
  );
}

function Section({ title, children, gold, rule }) {
  return (
    <div style={{ marginTop: 32 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "#1a1a2e",
            fontFamily: "Arial, sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </span>
        <div style={{ flex: 1, height: 1.5, background: gold }} />
      </div>
      {children}
    </div>
  );
}